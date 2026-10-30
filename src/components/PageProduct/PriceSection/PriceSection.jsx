import { toast } from 'react-toastify';
import './Price-section.css'

//importando hooks
import { useState } from "react"
import useWindowWidth from "../../../hooks/useWindowWidth.js"
import { useCart } from '../../../context/CartContext.jsx'
import { useNavigate } from 'react-router'
import { buscarCEP, limparCEP, validarCEP, formatarCEP } from '../../../services/cepService.js'

export default function PriceSection({ produto }) {
    const { AddItemCart } = useCart();
    const navigate = useNavigate();
    
    const [placeholder, setPlaceholder] = useState("Inserir CEP")
    const largura = useWindowWidth();
    const [CEP, setCEP] = useState('');
    const [exibirCEP, setExibirCEP] = useState(null)
    const [erroCEP, setErroCEP] = useState('')
    const [buscando, setBuscando] = useState(false)

    async function BuscarCEP(cep) {
        setErroCEP('')
        setExibirCEP(null)
        setBuscando(true)
        
        try {
            const resultado = await buscarCEP(cep);
            if (resultado.sucesso) {
                setExibirCEP(resultado.dados);
                toast.success('Frete calculado com sucesso!');
            } else {
                setErroCEP('CEP não encontrado');
            }
        } finally {
            setBuscando(false);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const cepLimpo = limparCEP(CEP);
        
        if (validarCEP(CEP)) {
            BuscarCEP(cepLimpo)
        } else {
            toast.error('Digite um CEP válido (8 dígitos)')
        }
    }

    const formatarCepExibicao = (cep) => {
        return formatarCEP(cep)
    }

    const handleAddToCart = () => {
        if (!produto) return;
        
        const produtoParaCarrinho = {
            ...produto,
            quantidadeCarrinho: 1
        };
        
        AddItemCart(produtoParaCarrinho);
    };

    const precoNumero = Number(produto?.preco || 0);
    const precoPix = precoNumero * 0.9; // 10% de desconto no PIX

    return(
        <div className='price-section-container p-4 rounded-4 shadow-sm'>
            {/* Status de Estoque */}
            <div className="d-flex align-items-center gap-2 mb-2">
                <span className="stock-badge">
                    <i className="fa-solid fa-circle-check text-success me-1"></i>
                    {produto?.qntEstoque > 0 ? `Em estoque (${produto.qntEstoque} un.)` : 'Esgotado'}
                </span>
                <span className="shipping-badge">
                    <i className="fa-solid fa-bolt text-warning me-1"></i> Envio Rápido
                </span>
            </div>

            {/* Preços */}
            <div className="product-price-box my-3">
                {produto?.precoOriginal && (
                    <div className="original-price-line">
                        <s>R$ {produto.precoOriginal.toFixed(2)}</s>
                        {produto.desconto && (
                            <span className="discount-tag ms-2">-{produto.desconto}%</span>
                        )}
                    </div>
                )}
                
                <div className="main-price-line">
                    <span className="price-currency">R$</span>
                    <span className="price-val">{precoPix.toFixed(2)}</span>
                    <span className="pix-pill ms-2">no PIX</span>
                </div>
                
                <p className="pix-subtext mb-1">
                    <i className="fa-brands fa-pix text-success me-1"></i>
                    Economize 10% pagando à vista no PIX
                </p>

                <p className="installments-subtext text-muted mb-0">
                    ou R$ {precoNumero.toFixed(2)} em até <strong>10x de R$ {(precoNumero / 10).toFixed(2)}</strong> sem juros
                </p>
            </div>

            {/* Botões de Ação */}
            <div className="purchase-buttons-wrapper mt-4">
                <div className={`d-flex gap-2 ${largura <= 668 ? 'price-fixed-mobile' : 'flex-column'}`}>
                    <button 
                        type="button"
                        className="btn-action-buy"
                        onClick={() => {
                            handleAddToCart();
                            navigate('/cart');
                        }}
                    >
                        <i className="fa-solid fa-bolt me-2"></i> Comprar Agora
                    </button>
                    
                    <button 
                        type="button"
                        className="btn-action-cart" 
                        onClick={handleAddToCart}
                    >
                        <i className="fa-solid fa-cart-plus me-2"></i> Adicionar ao Carrinho
                    </button> 
                </div>
            </div>

            {/* Consulta de Frete */}
            <div className='shipping-calc-box mt-4 pt-3 border-top border-light-subtle'>
                <h6 className="shipping-title fw-bold text-white mb-2">
                    <i className="fa-solid fa-truck me-2"></i> Calcule o frete e prazo:
                </h6>
                <form onSubmit={handleSubmit} className='d-flex gap-2 frete-form'>
                    <input 
                        className="form-control frete-input" 
                        type="text" 
                        value={formatarCepExibicao(CEP)} 
                        onChange={(e) => setCEP(e.target.value.replace(/\D/g, ''))} 
                        onFocus={() => setPlaceholder('_____-___')} 
                        onBlur={() => setPlaceholder("Inserir CEP")} 
                        placeholder={placeholder} 
                        maxLength={9}
                    />
                    <button type="submit" className="btn-calc-frete" disabled={buscando}>
                        {buscando ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                            <i className="fa-solid fa-magnifying-glass"></i>
                        )}
                    </button>
                </form>
                
                {exibirCEP && !erroCEP && ( 
                    <div className="shipping-result-card mt-3 p-3 rounded-3">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="fw-bold text-success">
                                <i className="fa-solid fa-truck-fast me-1"></i> Frete Grátis
                            </span>
                            <span className="badge bg-success-subtle text-success">3 a 5 dias úteis</span>
                        </div>
                        <p className="shipping-address-text mb-0 text-white-50 small">
                            Entrega para: {exibirCEP.street ? `${exibirCEP.street}, ` : ''} 
                            {exibirCEP.neighborhood ? `${exibirCEP.neighborhood} - ` : ''} 
                            {exibirCEP.city}/{exibirCEP.state}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}