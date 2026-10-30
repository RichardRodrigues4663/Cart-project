import './Header.css'

//importando hooks
import UseHeader from '../../../hooks/useHeader.js'
import useWindowWidth from '../../../hooks/useWindowWidth.js'
import useRoutes from '../../../hooks/useRoutes.js'
import { useCart } from '../../../context/CartContext.jsx'

export default function Header() {
  
  // usando hooks
  const largura = useWindowWidth()
  const headerFunctions = UseHeader()
  const routesFunctions = useRoutes()
  const { produtosCarrinho } = useCart()
  
  const totalItensCarrinho = produtosCarrinho?.reduce(
    (acc, item) => acc + (item.quantidadeCarrinho || 1), 
    0
  ) || 0

  return (
    <header className="header shadow-sm">
      <nav className="navbar p-0">
        <div className="container-fluid header-inner d-flex justify-content-between align-items-center flex-wrap">

          {/* Logo */}
          <div className="logo-container" onClick={routesFunctions.handleLogoClick} role="button" tabIndex={0}>
            <img 
              id="logo" 
              src="/assets/Logo/logo1.png" 
              alt="Logo Cart-Project" 
              width="150" 
              height="50" 
              className="logo-img"
            />
          </div>

          {/* Form de busca */}
          <form 
            className={`form-content d-flex align-items-center ${largura < 1140 ? 'w-100 order-3 mt-2' : 'flex-grow-1 mx-4'}`} 
            role="search" 
            onSubmit={headerFunctions.FormEvent}
          >
            <div className="search-bar-wrapper w-100 d-flex align-items-center">
              <input 
                className="form-control search-input" 
                type="search" 
                placeholder="Buscar produtos, marcas e muito mais..." 
                aria-label="Search"
              />
              <button className="btn-search" type="submit" aria-label="Pesquisar">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            
            <button 
              className={`btn-nav btn-bars ms-2 ${largura < 1140 ? 'd-flex align-items-center justify-content-center' : 'd-none'}`} 
              type="button"
              onClick={headerFunctions.handlePlusClick}
              aria-label="Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </form>

          {/* Botões Desktop */}
          <div className="header-actions d-flex align-items-center gap-2">
            <button 
              className="btn-nav btn-header-action" 
              id="btn-login" 
              onClick={routesFunctions.handleLoginClick}
            >
              <i className="fa-solid fa-circle-user me-2"></i>
              <span>Entrar / Cadastrar</span>
            </button>
            
            <button 
              className="btn-nav btn-header-action btn-cart-styled position-relative" 
              id="btn-cart" 
              onClick={routesFunctions.handleCartClick}
              aria-label="Carrinho de Compras"
            >
              <i className="fa-solid fa-cart-shopping me-1"></i>
              <span>Carrinho</span>
              {totalItensCarrinho > 0 && (
                <span className="cart-badge-counter badge bg-danger rounded-pill">
                  {totalItensCarrinho}
                </span>
              )}
            </button>
          </div>

          {/* Opções Mobile Dropdown */}
          <div className={`options w-100 ${headerFunctions.optionsOpen ? 'd-block' : 'd-none'}`}>
            <ul className="list-unstyled mobile-nav-list mb-0">
              <li className="item-list user-welcome-item">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <i className="fa-solid fa-circle-user fs-4"></i>
                  <h3 className="mb-0 fs-5">Bem-vindo(a)!</h3>
                </div>
                <p className="fs-6 mb-2 text-white-50">Acesse sua conta para ver suas compras, favoritos e promoções.</p>
                <button className="btn-nav w-100 btn-login-mobile" onClick={routesFunctions.handleLoginClick}>
                  Entrar / Cadastrar
                </button>
              </li>
              <li className="item-list" onClick={routesFunctions.handleLogoClick}>
                <i className="fa-solid fa-house me-2"></i>Início
              </li>
              <li className="item-list" onClick={routesFunctions.handleOffersClick}>
                <i className="fa-solid fa-tag me-2"></i>🔥 Ofertas do Dia
              </li>
              <li className="item-list" onClick={routesFunctions.handleCartClick}>
                <i className="fa-solid fa-cart-shopping me-2"></i>Meu Carrinho
                {totalItensCarrinho > 0 && (
                  <span className="badge bg-danger rounded-pill ms-2">{totalItensCarrinho}</span>
                )}
              </li>
              <li className="item-list">
                <i className="fa-solid fa-clock-rotate-left me-2"></i>Histórico
              </li>
              <li className="item-list">
                <i className="fa-solid fa-headset me-2"></i>Atendimento & Contato
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  )
}
