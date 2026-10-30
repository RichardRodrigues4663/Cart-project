import { produtos } from '../../../data/products.js'
import { ofertasDoDia } from '../../../data/offersDay.js'
import { useNavigate } from 'react-router'
import './SuggestionsProducts.css'

export default function SuggestionProducts({ produto }){
    const navigate = useNavigate();

    // Filtra sugestões pela mesma subcategoria ou mesma categoria
    const todosProdutos = [...produtos, ...ofertasDoDia];
    
    // Remove duplicados de ID e o próprio produto atual
    const mapUnicos = new Map();
    todosProdutos.forEach(item => {
        if (item && item.id !== produto?.id && !mapUnicos.has(item.id)) {
            mapUnicos.set(item.id, item);
        }
    });

    const listaUnica = Array.from(mapUnicos.values());

    // Prioriza mesma subcategoria, depois mesma categoria
    let sugestoes = listaUnica.filter(item => item.subcategoria === produto?.subcategoria);
    if (sugestoes.length < 4) {
        const mesmaCategoria = listaUnica.filter(item => 
            item.categoria === produto?.categoria && !sugestoes.some(s => s.id === item.id)
        );
        sugestoes = [...sugestoes, ...mesmaCategoria];
    }
    if (sugestoes.length < 4) {
        const outros = listaUnica.filter(item => !sugestoes.some(s => s.id === item.id));
        sugestoes = [...sugestoes, ...outros];
    }

    const sugestoesFinais = sugestoes.slice(0, 4);

    function seeProduct(prod){
        const query = new URLSearchParams()
        query.set('id', prod.id)
        navigate(`/product?${query.toString()}`)
        window.scrollTo(0, 0);
    }

    return(
        <div className='suggestion-container'>
            <div className='d-flex align-items-center justify-content-between mb-3'>
                <h3 className="suggestion-heading">
                    <i className="fa-solid fa-thumbs-up me-2 text-warning"></i> Quem viu este produto também comprou
                </h3>
            </div>

            <div className="items">
                {sugestoesFinais.map(item => (
                    <div 
                        onClick={() => seeProduct(item)} 
                        key={item.id} 
                        className="item-card" 
                        role="button"
                        tabIndex={0}
                    >
                        <div className="product-image-box"> 
                            {item.desconto > 0 && (
                                <span className='text-discont'>-{item.desconto}% OFF</span>
                            )}
                            <img 
                                className='product-image' 
                                src={item.imagem?.[0]} 
                                alt={item.nome}
                                loading="lazy"
                            />
                        </div>

                        <div className="product-card-body">
                            <p className="product-name" title={item.nome}>{item.nome}</p>

                            <div className="product-price">
                                {item.precoOriginal && (
                                    <div className="product-original-price">
                                        <s>R$ {item.precoOriginal.toFixed(2)}</s>
                                    </div>
                                )}
                                <div className="product-current-price">
                                    <span className="currency">R$</span> {item.preco.toFixed(2)}
                                </div>
                                <div className="product-installments">
                                    em até 10x de R$ {(item.preco / 10).toFixed(2)}
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
        </div>
    )
}
