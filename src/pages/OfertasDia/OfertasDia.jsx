// importando componentes
import Header from '../../components/Layout/Header/Header.jsx'
import Footer from '../../components/Layout/Footer/Footer.jsx'
import Category from '../../components/UI/Category/Category.jsx'
import ProductOffersPage from '../../components/Products/ProductOffertsPage/ProductOffertsPage.jsx'

// importando dados e funções
import { ofertasDoDia } from '../../data/offersDay.js'

//importando hooks
import { useEffect } from 'react'

export default function OfertasDia() {
    useEffect(() => {
        // Rolagem para o topo ao montar o componente
        window.scrollTo(0, 0);  
    }, [])

  return (
      <div className="ofertas-page-wrapper">
        <Header />

        {/* Banner de Destaque das Ofertas */}
        <div className="container py-3">
          <div 
            className="offers-hero-banner p-4 rounded-4 shadow-sm text-white d-flex justify-content-between align-items-center flex-wrap gap-3"
            style={{ 
              background: 'linear-gradient(135deg, var(--colorThemeDark) 0%, var(--colorTheme) 50%, var(--colorSecondary) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div>
              <span className="badge bg-danger rounded-pill mb-2 px-3 py-1 fw-bold">
                <i className="fa-solid fa-clock me-1"></i> Promoção por tempo limitado
              </span>
              <h1 className="h3 fw-bold mb-1">🔥 Super Ofertas do Dia</h1>
              <p className="mb-0 text-white-50">
                Aproveite até 50% de desconto e frete grátis para todo o Brasil.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div className="text-end d-none d-md-block">
                <div className="fw-bold fs-5">Entrega Rápida</div>
                <div className="small text-white-50">Garantia e Nota Fiscal</div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 rounded-circle text-warning fs-3">
                <i className="fa-solid fa-fire-flame-curved"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <Category />
          <div className="content-sections">
            <section className="offers-section">
              <h2 className="section-title">
                <span>🔥 Produtos em Destaque</span>
                <span className="badge bg-secondary-subtle text-dark fs-6 fw-normal ms-auto">
                  {ofertasDoDia.length} ofertas ativas
                </span>
              </h2>
              <ProductOffersPage produtosOferta={ofertasDoDia} />
            </section>
          </div>
        </div>
        <Footer />
      </div>
    )
}
