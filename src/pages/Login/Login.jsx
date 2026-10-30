import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Header from '../../components/Layout/Header/Header.jsx'
import Footer from '../../components/Layout/Footer/Footer.jsx'

export default function Login(){
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !senha || (!isLogin && !nome)) {
            toast.error('Preencha todos os campos obrigatórios')
            return
        }
        
        if (isLogin) {
            toast.success(`Bem-vindo(a) de volta!`, { autoClose: 2000 })
        } else {
            toast.success(`Conta criada com sucesso! Bem-vindo(a), ${nome}!`, { autoClose: 2000 })
        }

        setTimeout(() => {
            navigate('/')
        }, 1200)
    }

    return(
        <div className="login-page-container d-flex flex-column min-vh-100">
            <Header />

            <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
                <div className="auth-card p-4 p-md-5 bg-white rounded-4 shadow-lg" style={{ maxWidth: '480px', width: '100%' }}>
                    {/* Tabs Entrar / Cadastrar */}
                    <div className="d-flex mb-4 p-1 bg-light rounded-3">
                        <button
                            type="button"
                            className={`btn w-50 py-2 fw-bold rounded-2 transition-all ${isLogin ? 'bg-white shadow-sm text-dark' : 'text-muted border-0'}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Entrar
                        </button>
                        <button
                            type="button"
                            className={`btn w-50 py-2 fw-bold rounded-2 transition-all ${!isLogin ? 'bg-white shadow-sm text-dark' : 'text-muted border-0'}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Criar Conta
                        </button>
                    </div>

                    <div className="text-center mb-4">
                        <h2 className="fw-bold" style={{ color: 'var(--colorTheme)' }}>
                            {isLogin ? 'Acesse sua conta' : 'Crie sua conta grátis'}
                        </h2>
                        <p className="text-muted small">
                            {isLogin 
                                ? 'Acompanhe pedidos, favoritos e aproveite cupons exclusivos.' 
                                : 'Leva menos de 1 minuto para começar a comprar com ofertas!'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                        {!isLogin && (
                            <div>
                                <label className="form-label small fw-bold text-secondary mb-1">Nome completo</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0 text-muted">
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0 ps-0"
                                        placeholder="Seu nome completo"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="form-label small fw-bold text-secondary mb-1">E-mail</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0 text-muted">
                                    <i className="fa-solid fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control border-start-0 ps-0"
                                    placeholder="seu.email@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <label className="form-label small fw-bold text-secondary mb-0">Senha</label>
                                {isLogin && (
                                    <span 
                                        role="button" 
                                        className="small text-decoration-none"
                                        style={{ color: 'var(--colorSecondary)' }}
                                        onClick={() => toast.info('Link de recuperação enviado para seu e-mail')}
                                    >
                                        Esqueci a senha
                                    </span>
                                )}
                            </div>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0 text-muted">
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control border-start-0 ps-0"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                                <label className="form-check-label small text-muted" htmlFor="rememberMe">
                                    Lembrar meu acesso neste dispositivo
                                </label>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn py-3 mt-2 fw-bold text-white shadow-sm"
                            style={{ background: 'var(--colorPurple)', borderRadius: '10px' }}
                        >
                            {isLogin ? (
                                <>
                                    <i className="fa-solid fa-arrow-right-to-bracket me-2"></i> Entrar na Conta
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-user-plus me-2"></i> Finalizar Cadastro
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-4 pt-4 border-top text-center text-muted small">
                        <span>Precisa de ajuda? </span>
                        <a href="mailto:suporte@cartproject.com" style={{ color: 'var(--colorSecondary)' }} className="fw-bold text-decoration-none">
                            Fale com nosso suporte
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}