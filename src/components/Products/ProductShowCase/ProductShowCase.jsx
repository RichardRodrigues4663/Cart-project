//importando hooks
import { useNavigate } from 'react-router'
//importando funções e estilos
import { useCart } from '../../../context/CartContext.jsx'
import './ProductShowCase.css'

export default function ProductShowCase({ produtos }){

    const cartFunctions = useCart();
    const categoriaAtual = 'todos';
    const quantidadeVisivelAmostras = 10;
    
    const navigate = useNavigate()

    // Função refatorada para preparar produtos
    const prepararProdutos = (produtos, limitador) => {
        const produtosFiltrados = cartFunctions.filtro(produtos, categoriaAtual);
        const produtosLimitados = produtosFiltrados.slice(0, limitador);
        return { 
            limitados: produtosLimitados, 
            filtrados: produtosFiltrados,
            totalFiltrados: produtosFiltrados.length
        };
    }
    
    const produtosOferta = prepararProdutos(produtos, quantidadeVisivelAmostras);
    
    function seeProduct(produto){
        const query = new URLSearchParams()
        query.set('id', produto.id)
        navigate(`/product?${query.toString()}`)
    }

    return(
        <div className="products text-start">
            <div className="items">
                {produtosOferta.limitados.map(produto => (
                    <div 
                        onClick={() => seeProduct(produto)} 
                        key={produto.id} 
                        className="item-card" 
                        data-category={produto.categoria || "eletronicos"}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="product-image-box"> 
                            {produto.desconto > 0 && (
                                <span className='text-discont'>-{produto.desconto}% OFF</span>
                            )}
                            <img 
                                className='product-image' 
                                src={produto.imagem?.[0]} 
                                alt={produto.nome}
                                loading="lazy"
                            />
                        </div>

                        <div className="product-card-body">
                            <p className="product-name" title={produto.nome}>{produto.nome}</p>

                            <div className="product-price">
                                {produto.precoOriginal && (
                                    <div className="product-original-price">
                                        <s>R$ {produto.precoOriginal.toFixed(2)}</s>
                                    </div>
                                )}
                                <div className="product-current-price">
                                    <span className="currency">R$</span> {produto.preco.toFixed(2)}
                                </div>
                                <div className="product-installments">
                                    em até 10x de R$ {(produto.preco / 10).toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <div className="product-card-footer mt-auto">
                            <button className='btn-plus' type="button">
                                <i className="fa-solid fa-eye me-1"></i> Ver detalhes
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {quantidadeVisivelAmostras < produtosOferta.totalFiltrados && (
                <div className="text-center mt-4">
                    <button className="btn-see-more" onClick={() => navigate('/ofertas')}>
                        <span>Ver Mais Ofertas</span>
                        <i className="fa-solid fa-arrow-right ms-2"></i>
                    </button>   
                </div>
            )}
        </div>
    )
}