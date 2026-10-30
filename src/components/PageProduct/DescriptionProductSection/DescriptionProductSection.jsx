import { useState } from 'react'
import './DescriptionProductSection.css'

export default function DescriptionProductSection({ produto }){
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState('M');
    const tamanhos = ['PP', 'P', 'M', 'G', 'GG'];

    return(
        <div className='product-info-section'>
            {produto?.qntEstoque === 0 ? (
                <div className="badge bg-danger mb-2">Produto indisponível</div>
            ) : (
                <div className="category-lead text-muted text-uppercase small fw-bold mb-1">
                    {produto?.categoria} &gt; {produto?.subcategoria || 'Geral'}
                </div>
            )}

            <h1 className="product-title-detail mb-3">{produto?.nome}</h1>

            {/* Avaliações simuladas com estrelas e confiança */}
            <div className="ratings-bar d-flex align-items-center gap-2 mb-3">
                <div className="stars text-warning">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <span className="rating-score fw-bold">4.8</span>
                <span className="text-muted small">(142 avaliações de compradores)</span>
            </div>

            {produto?.categoria === "roupas" && (
                <div className="size-selector-box mb-4 p-3 rounded-3 bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">Tamanho selecionado: <strong>{tamanhoSelecionado}</strong></span>
                        <span className="text-primary small role-btn" role="button">Guia de medidas</span>
                    </div>
                    <div className='d-flex flex-wrap gap-2'>
                        {tamanhos.map(tam => (
                            <button 
                                key={tam}
                                type="button"
                                className={`btn-size ${tamanhoSelecionado === tam ? 'selected' : ''}`}
                                onClick={() => setTamanhoSelecionado(tam)}
                            >
                                {tam}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className='product-short-description mt-3'>
                <h6 className="fw-bold text-dark mb-2">Sobre este item:</h6>
                <p className='text-secondary leading-relaxed'>{produto?.descricao}</p>
            </div>
            
            <div className="features-checklist mt-3 pt-3 border-top">
                <div className="feature-item d-flex align-items-center gap-2 mb-2 text-muted small">
                    <i className="fa-solid fa-shield-check text-success"></i>
                    <span>Garantia oficial do fabricante com nota fiscal</span>
                </div>
                <div className="feature-item d-flex align-items-center gap-2 text-muted small">
                    <i className="fa-solid fa-arrow-rotate-left text-primary"></i>
                    <span>Devolução gratuita em até 7 dias após o recebimento</span>
                </div>
            </div>
        </div>
    )
}