// Importando componentes
import Header from './components/Layout/Header/Header.jsx'
import Footer from './components/Layout/Footer/Footer.jsx'
import Carrossel from './components/Layout/Carrossel/Carrossel.jsx'
import Products from './components/Products/ProductsScrollInfitine/Products.jsx'
import ProductShowCase from './components/Products/ProductShowCase/ProductShowCase.jsx'
import Category from './components/UI/Category/Category.jsx'

// Importando dados
import { ofertasDoDia } from './data/offersDay.js'

// Importando estilos globais
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      
      {/* Carrossel de Banners Promocionais */}
      <Carrossel 
        img1={'/assets/imgCarrosel/img1.png'} 
        img2={'/assets/imgCarrosel/img2.png'} 
        img3={'/assets/imgCarrosel/img3.png'} 
        img4={'/assets/imgCarrosel/img4.png'} 
        img5={'/assets/imgCarrosel/img5.png'} 
        img6={'/assets/imgCarrosel/img6.png'} 
        img7={'/assets/imgCarrosel/img7.png'}
      />

      {/* Faixa de Benefícios Rápidos */}
      <div className="container mt-3">
        <div className="benefits-ribbon py-2 px-3 rounded-3 d-flex justify-content-around align-items-center flex-wrap gap-2 text-white shadow-sm"
             style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
          <div className="d-flex align-items-center gap-2 small">
            <i className="fa-solid fa-truck-fast text-info"></i>
            <span><strong>Frete Grátis</strong> em milhares de produtos</span>
          </div>
          <div className="d-flex align-items-center gap-2 small">
            <i className="fa-brands fa-pix text-success"></i>
            <span><strong>10% de Desconto</strong> à vista no PIX</span>
          </div>
          <div className="d-flex align-items-center gap-2 small">
            <i className="fa-solid fa-credit-card text-warning"></i>
            <span><strong>Até 10x sem juros</strong> no cartão</span>
          </div>
          <div className="d-flex align-items-center gap-2 small">
            <i className="fa-solid fa-shield-check text-success"></i>
            <span><strong>Compra Garantida</strong> ou seu dinheiro de volta</span>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal com Barra Lateral de Categorias e Seções de Produtos */}
      <main className="wrapper">
        <Category />
        
        <div className="content-sections">
          <section className="offers-section">
            <h2 className="section-title">
              <span>🔥 Ofertas do Dia</span>
              <span className="badge bg-danger-subtle text-danger fs-6 fw-bold ms-auto">
                Descontos de até 50%
              </span>
            </h2>
            <ProductShowCase produtos={ofertasDoDia} />
          </section>

          <section className="for-you-section">
            <h2 className="section-title">
              <span>🎁 Para Você</span>
              <span className="text-muted small fw-normal ms-auto fs-6">
                Seleção recomendada
              </span>
            </h2>
            <Products />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App