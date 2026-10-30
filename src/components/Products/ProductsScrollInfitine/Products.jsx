//importando hooks
import { useNavigate } from 'react-router'
import { useState } from 'react'

//importando estilos
import './Products.css'

//importando hooks
import { useCart } from '../../../context/CartContext.jsx'
import { useProdutos } from '../../../context/ContextProduct.jsx'

export default function Products(){

    const { produtos } = useProdutos()
    const cartFunctions = useCart();
    
    const [categoriaAtual] = useState('todos');
    const [quantidadeVisivelScroolInfinite, setquantidadeVisivelScroolInfinite] = useState(10);
    
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
    
    // Usando a função para preparar os produtos
    const produtosParaVoce = prepararProdutos(produtos, quantidadeVisivelScroolInfinite);
    
    function seeProduct(produto){
        const query = new URLSearchParams()
        query.set('id', produto.id)
        navigate(`/product?${query.toString()}`)
    }

    return(
        <div className="products text-start">
            <div className="items">
                {produtosParaVoce.limitados.map(produto => (
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

            {quantidadeVisivelScroolInfinite < produtosParaVoce.totalFiltrados && (
                <div className="text-center mt-4">
                    <button 
                        className="btn-see-more" 
                        onClick={() => setquantidadeVisivelScroolInfinite(prev => prev + 10)}
                    >
                        <span>Carregar Mais Produtos ({produtosParaVoce.totalFiltrados - quantidadeVisivelScroolInfinite} restantes)</span>
                        <i className="fa-solid fa-rotate-right ms-2"></i>
                    </button>   
                </div>
            )}
        </div>
    )
}