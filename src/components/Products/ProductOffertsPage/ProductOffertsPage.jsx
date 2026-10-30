//importando hooks
import { useNavigate } from 'react-router'
import { useState } from 'react';

//importando funções e estilos
import { useCart } from '../../../context/CartContext.jsx'
import './ProductOffertsPage.css'

// importando componentes
import Button from '../../UI/Button/Button.jsx';
import { ofertasDoDia } from '../../../data/offersDay.js';

export default function ProductsOffers(){

    const cartFunctions = useCart();
    const navigate = useNavigate();

    const [categoriaAtual, setCategoriaAtual] = useState('todos');
    const produtosFiltrados = cartFunctions.filtro(ofertasDoDia, categoriaAtual);

    function seeProduct(produto){
        const query = new URLSearchParams()
        query.set('id', produto.id)
        navigate(`/product?${query.toString()}`)
    }

    return (
        <div className="products text-start">
            <div className="filter-buttons-bar p-3 d-flex gap-2 flex-wrap align-items-center mb-3">
                <span className="filter-label text-muted fs-6 fw-bold me-2">Filtrar por:</span>
                <Button categoriaAtual={categoriaAtual} value="todos" onclick={() => setCategoriaAtual('todos')} text={'Todos'} />
                <Button categoriaAtual={categoriaAtual} value="eletronicos" onclick={() => setCategoriaAtual('eletronicos')} text={'Eletrônicos'}/>
                <Button categoriaAtual={categoriaAtual} value="roupas" onclick={() => setCategoriaAtual('roupas')} text={'Roupas'}/>
                <Button categoriaAtual={categoriaAtual} value="calcados" onclick={() => setCategoriaAtual('calcados')} text={'Calçados'}/>
                <Button categoriaAtual={categoriaAtual} value="livros" onclick={() => setCategoriaAtual('livros')} text={'Livros'}/>
                <Button categoriaAtual={categoriaAtual} value="emEstoque" onclick={() => setCategoriaAtual('emEstoque')} text={'Em estoque'}/>
            </div>

            <div className="items">
                {produtosFiltrados.map(produto => (
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

            {produtosFiltrados.length === 0 && (
                <div className="p-5 text-center text-muted">
                    <i className="fa-solid fa-box-open fs-1 mb-3 text-secondary"></i>
                    <h5>Nenhum produto encontrado nesta categoria.</h5>
                    <p>Tente selecionar outra categoria acima.</p>
                </div>
            )}
        </div>
    )
}