import './Footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
            {/* Seção de Vantagens e Confiança */}
            <div className="footer-top">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-lg-3 col-6">
                            <div className="service-item">
                                <div className="service-icon-box">
                                    <i className="fa-solid fa-truck-fast"></i>
                                </div>
                                <div className="service-text">
                                    <h5>Frete Grátis</h5>
                                    <p>Em compras selecionadas</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">
                            <div className="service-item">
                                <div className="service-icon-box">
                                    <i className="fa-solid fa-credit-card"></i>
                                </div>
                                <div className="service-text">
                                    <h5>Em até 10x Sem Juros</h5>
                                    <p>Ou 10% de desconto no PIX</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">
                            <div className="service-item">
                                <div className="service-icon-box">
                                    <i className="fa-solid fa-shield-halved"></i>
                                </div>
                                <div className="service-text">
                                    <h5>Compra 100% Segura</h5>
                                    <p>Certificado SSL e criptografia</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-6">
                            <div className="service-item">
                                <div className="service-icon-box">
                                    <i className="fa-solid fa-headset"></i>
                                </div>
                                <div className="service-text">
                                    <h5>Suporte Humanizado</h5>
                                    <p>Atendimento rápido e dedicado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção Principal do Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="row gy-4 justify-content-between">
                        {/* Sobre a Loja */}
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-brand mb-3">
                                <img src="/assets/Logo/logo1.png" alt="Cart Project" width="140" height="46" style={{ objectFit: 'contain' }} />
                            </div>
                            <p className="footer-about">
                                A sua loja online com as melhores ofertas do dia, tecnologia de ponta, 
                                moda e utilidades para o seu dia a dia. Entrega rápida e segura para todo o Brasil.
                            </p>
                            <div className="social-links">
                                <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                                <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
                                <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                                <a href="#" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
                            </div>
                        </div>

                        {/* Links Úteis */}
                        <div className="col-lg-3 col-md-6">
                            <h4 className="footer-title">Institucional</h4>
                            <ul className="footer-links">
                                <li><a href="/"><i className="fa-solid fa-chevron-right me-2 small"></i>Início</a></li>
                                <li><a href="/ofertas"><i className="fa-solid fa-chevron-right me-2 small"></i>Ofertas do Dia</a></li>
                                <li><a href="/cart"><i className="fa-solid fa-chevron-right me-2 small"></i>Meu Carrinho</a></li>
                                <li><a href="/login"><i className="fa-solid fa-chevron-right me-2 small"></i>Minha Conta</a></li>
                                <li><a href="#"><i className="fa-solid fa-chevron-right me-2 small"></i>Trocas e Devoluções</a></li>
                                <li><a href="#"><i className="fa-solid fa-chevron-right me-2 small"></i>Política de Privacidade</a></li>
                            </ul>
                        </div>

                        {/* Categorias Principais */}
                        <div className="col-lg-4 col-md-6">
                            <h4 className="footer-title">Categorias em Alta</h4>
                            <div className="d-flex flex-wrap gap-2">
                                <span className="footer-category-tag">Eletrônicos</span>
                                <span className="footer-category-tag">Smartphones</span>
                                <span className="footer-category-tag">Roupas</span>
                                <span className="footer-category-tag">Calçados</span>
                                <span className="footer-category-tag">Livros</span>
                                <span className="footer-category-tag">Eletrodomésticos</span>
                                <span className="footer-category-tag">Casa & Conforto</span>
                            </div>

                            <div className="newsletter-box mt-4">
                                <h6 className="text-white fw-bold mb-2">Receba descontos exclusivos</h6>
                                <div className="input-group">
                                    <input type="email" className="form-control form-control-sm" placeholder="Seu melhor e-mail" />
                                    <button className="btn btn-sm text-white" style={{ background: 'var(--colorPurple)' }} type="button">
                                        Assinar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagamentos e Segurança */}
            <div className="footer-payments">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            <h6 className="payment-heading mb-2">Formas de Pagamento</h6>
                            <div className="payment-badges-row d-flex gap-2 flex-wrap justify-content-center justify-content-md-start">
                                <span className="payment-badge"><i className="fa-brands fa-pix text-success me-1"></i> PIX</span>
                                <span className="payment-badge"><i className="fa-brands fa-cc-visa text-primary me-1"></i> Visa</span>
                                <span className="payment-badge"><i className="fa-brands fa-cc-mastercard text-danger me-1"></i> Mastercard</span>
                                <span className="payment-badge"><i className="fa-solid fa-barcode text-dark me-1"></i> Boleto</span>
                                <span className="payment-badge"><i className="fa-solid fa-credit-card text-info me-1"></i> Hipercard</span>
                                <span className="payment-badge"><i className="fa-solid fa-credit-card text-warning me-1"></i> Elo</span>
                            </div>
                        </div>

                        <div className="col-md-6 text-center text-md-end">
                            <h6 className="payment-heading mb-2">Segurança Garantida</h6>
                            <div className="security-badges-row d-flex gap-2 justify-content-center justify-content-md-end flex-wrap">
                                <span className="security-badge"><i className="fa-solid fa-lock text-success me-1"></i> SSL 256-bit</span>
                                <span className="security-badge"><i className="fa-solid fa-shield-virus text-primary me-1"></i> Google Safe</span>
                                <span className="security-badge"><i className="fa-solid fa-certificate text-warning me-1"></i> RA 1000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rodapé Inferior */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="mb-0">
                                &copy; {new Date().getFullYear()} Cart-Project. Todos os direitos reservados.
                            </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
                            <p className="mb-0 small text-white-50">
                                Desenvolvido com carinho para a melhor experiência de compra online.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}