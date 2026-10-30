import './ItemCart.css'

//importando hooks
import { useCart } from '../../../context/CartContext.jsx'
import { useNavigate } from 'react-router'

export default function ItemCart() {
  
  const { 
    produtosCarrinho, 
    decrementQuantity, 
    incrementQuantity, 
    removeItemCart 
  } = useCart();

  const navigate = useNavigate();
  
  // Verificação de carrinho vazio
  if (produtosCarrinho.length === 0) {
    return (
      <div className="cart-items-column">
        <div className="empty-cart p-5 text-center rounded-3">
          <div className="empty-cart-icon mb-3">
            <i className="fa-solid fa-basket-shopping"></i>
          </div>
          <h4 className="fw-bold mb-2 text-dark">Seu carrinho está vazio</h4>
          <p className="text-muted mb-4">Explore nossas promoções e adicione seus produtos favoritos!</p>
          <button 
            type="button" 
            className="btn-explore-products"
            onClick={() => navigate('/')}
          >
            <i className="fa-solid fa-store me-2"></i> Explorar Produtos
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-items-column">
      <div className="cart-items-list">
        {produtosCarrinho.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image-wrapper">
              <img 
                src={item.imagem?.[0]} 
                alt={item.nome}
                className="cart-item-img"
              />
            </div>

            <div className="cart-item-info">
              <h5 className="cart-item-name" title={item.nome}>
                {item.nome}
              </h5>

              <div className="cart-item-price-block">
                {item.precoOriginal && (
                  <s className="cart-item-original-price">
                    R$ {item.precoOriginal.toFixed(2)}
                  </s>
                )}
                <div className="cart-item-current-price">
                  R$ {item.preco.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="cart-item-actions">
              <div className="btns-quantity d-flex align-items-center">
                <button 
                  type="button"
                  className="quantity-btn decrease" 
                  onClick={() => decrementQuantity(item.id)}
                  aria-label="Diminuir quantidade"
                >
                  <i className="fas fa-minus"></i>
                </button>
                
                <span className="quantity-value">{item.quantidadeCarrinho || 1}</span>
                
                <button 
                  type="button"
                  className="quantity-btn increase" 
                  onClick={() => incrementQuantity(item.id)}
                  aria-label="Aumentar quantidade"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>

              <button 
                type="button"
                className="btn-remove" 
                onClick={() => removeItemCart(item.id)}
                title="Remover produto"
                aria-label="Remover produto"
              >
                <i className="fas fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}