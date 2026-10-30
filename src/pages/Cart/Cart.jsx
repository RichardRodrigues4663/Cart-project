import ItemCart from '../../components/Cart/ItemCart/ItemCart.jsx'
import SummaryCart from '../../components/Cart/SummaryCart/SummaryCart.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useNavigate } from 'react-router'
import './Cart.css'

//importando componentes
import Header from '../../components/Layout/Header/Header.jsx'
import Footer from '../../components/Layout/Footer/Footer.jsx'

export default function Cart(){
    const { produtosCarrinho } = useCart();
    const navigate = useNavigate();

    const totalItens = produtosCarrinho?.reduce(
        (acc, item) => acc + (item.quantidadeCarrinho || 1), 
        0
    ) || 0;

    return(
        <div className="cart-page-wrapper">
            <Header />
            <div className="container-geral">
                <div className="cart-header-row d-flex justify-content-between align-items-center mb-3">
                    <h1 className="section-title mb-0">
                        <i className="fa-solid fa-cart-shopping me-2"></i> Meu Carrinho
                        {totalItens > 0 && (
                            <span className="cart-count-pill ms-3">({totalItens} {totalItens === 1 ? 'item' : 'itens'})</span>
                        )}
                    </h1>
                    <button 
                        type="button" 
                        className="btn-continue-shopping"
                        onClick={() => navigate('/')}
                    >
                        <i className="fa-solid fa-arrow-left me-2"></i> Continuar comprando
                    </button>
                </div>

                <div className="cart-section">
                    <ItemCart />
                    <SummaryCart itemsCart={produtosCarrinho}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}