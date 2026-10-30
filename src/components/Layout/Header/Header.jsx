import './Header.css'

//importando hooks
import UseHeader from '../../../hooks/useHeader.js'
import useRoutes from '../../../hooks/useRoutes.js'
import { useCart } from '../../../context/CartContext.jsx'

export default function Header() {
  
  // usando hooks
  const headerFunctions = UseHeader()
  const routesFunctions = useRoutes()
  const { produtosCarrinho } = useCart()
  
  const totalItensCarrinho = produtosCarrinho?.reduce(
    (acc, item) => acc + (item.quantidadeCarrinho || 1), 
    0
  ) || 0

  return (
    <header className="header shadow-sm">
      <div className="header-inner">
        {/* Linha Principal do Header */}
        <div className="header-main-row d-flex justify-content-between align-items-center">

          {/* Logo */}
          <div className="logo-container" onClick={routesFunctions.handleLogoClick} role="button" tabIndex={0}>
            <img 
              id="logo" 
              src="/assets/Logo/logo1.png" 
              alt="Logo Cart-Project" 
              width="135" 
              height="45" 
              className="logo-img"
            />
          </div>

          {/* Barra de Busca Desktop (exibida apenas em telas grandes) */}
          <form 
            className="form-content desktop-search d-none d-lg-flex" 
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
          </form>

          {/* Ações Desktop: Botões de texto largos (exibidos APENAS em desktop >= 992px) */}
          <div className="header-actions-desktop d-none d-lg-flex align-items-center gap-2">
            <button 
              type="button"
              className="btn-nav btn-header-action" 
              id="btn-login" 
              onClick={routesFunctions.handleLoginClick}
            >
              <i className="fa-solid fa-circle-user me-2"></i>
              <span>Entrar / Cadastrar</span>
            </button>
            
            <button 
              type="button"
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

          {/* Ações Rápidas Mobile: Ícones compactos e circulares (exibidos APENAS em telas < 992px) */}
          <div className="header-actions-mobile d-flex d-lg-none align-items-center gap-2">
            <button 
              type="button"
              className="mobile-icon-btn" 
              onClick={routesFunctions.handleLoginClick}
              aria-label="Minha Conta / Entrar"
              title="Entrar / Cadastrar"
            >
              <i className="fa-solid fa-circle-user"></i>
            </button>

            <button 
              type="button"
              className="mobile-icon-btn position-relative" 
              onClick={routesFunctions.handleCartClick}
              aria-label="Carrinho de compras"
              title="Meu Carrinho"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItensCarrinho > 0 && (
                <span className="cart-badge-counter badge bg-danger rounded-pill">
                  {totalItensCarrinho}
                </span>
              )}
            </button>
            
            <button 
              type="button"
              className={`mobile-icon-btn btn-bars ${headerFunctions.optionsOpen ? 'active' : ''}`} 
              onClick={headerFunctions.handlePlusClick}
              aria-label="Abrir Menu de Navegação"
              title="Menu"
            >
              <i className={`fa-solid ${headerFunctions.optionsOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>

        </div>

        {/* Linha de Busca Mobile (exibida apenas em telas < 992px) */}
        <div className="mobile-search-row d-block d-lg-none">
          <form 
            className="w-100" 
            role="search" 
            onSubmit={headerFunctions.FormEvent}
          >
            <div className="search-bar-wrapper w-100 d-flex align-items-center">
              <input 
                className="form-control search-input" 
                type="search" 
                placeholder="Buscar produtos, marcas e mais..." 
                aria-label="Search"
              />
              <button className="btn-search" type="submit" aria-label="Pesquisar">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Menu Mobile Dropdown */}
        <div className={`options w-100 ${headerFunctions.optionsOpen ? 'd-block' : 'd-none'}`}>
          <ul className="list-unstyled mobile-nav-list mb-0">
            <li className="item-list user-welcome-item">
              <div className="d-flex align-items-center gap-2 mb-1">
                <i className="fa-solid fa-circle-user fs-4 text-warning"></i>
                <h3 className="mb-0 fs-5">Bem-vindo(a)!</h3>
              </div>
              <p className="fs-6 mb-2 text-white-50">Acesse sua conta para ver suas compras, favoritos e promoções.</p>
              <button 
                type="button" 
                className="btn-nav w-100 btn-login-mobile" 
                onClick={() => { routesFunctions.handleLoginClick(); headerFunctions.handlePlusClick(); }}
              >
                <i className="fa-solid fa-arrow-right-to-bracket me-2"></i> Entrar / Cadastrar
              </button>
            </li>
            <li className="item-list" onClick={() => { routesFunctions.handleLogoClick(); headerFunctions.handlePlusClick(); }}>
              <i className="fa-solid fa-house me-3 text-info"></i>Início
            </li>
            <li className="item-list" onClick={() => { routesFunctions.handleOffersClick(); headerFunctions.handlePlusClick(); }}>
              <i className="fa-solid fa-fire me-3 text-danger"></i>🔥 Ofertas do Dia
            </li>
            <li className="item-list" onClick={() => { routesFunctions.handleCartClick(); headerFunctions.handlePlusClick(); }}>
              <i className="fa-solid fa-cart-shopping me-3 text-success"></i>Meu Carrinho
              {totalItensCarrinho > 0 && (
                <span className="badge bg-danger rounded-pill ms-auto">{totalItensCarrinho} {totalItensCarrinho === 1 ? 'item' : 'itens'}</span>
              )}
            </li>
            <li className="item-list" onClick={() => { routesFunctions.handleLoginClick(); headerFunctions.handlePlusClick(); }}>
              <i className="fa-solid fa-clock-rotate-left me-3 text-secondary"></i>Histórico de Compras
            </li>
            <li className="item-list" onClick={() => headerFunctions.handlePlusClick()}>
              <i className="fa-solid fa-headset me-3 text-warning"></i>Atendimento & Ajuda
            </li>
          </ul>
        </div>

      </div>
    </header>
  )
}
