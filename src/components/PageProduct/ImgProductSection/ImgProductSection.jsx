import { useState } from "react"
import './ImgProductSection.css'

export default function ImgProductSection({ produto }) {
    const [imgAtual, setImgAtual] = useState(0)
    
    const showImg = (index) => {
        setImgAtual(index)
    }

    // Verifica se o produto tem imagens
    if (!produto?.imagem || produto.imagem.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center p-5 bg-light rounded-3 text-muted">
                <i className="fa-regular fa-image me-2"></i> Sem imagens disponíveis
            </div>
        )
    }

    return (
        <div className="product-gallery-container d-flex flex-column align-items-center">
            {/* Visualizador Principal */}
            <div className="main-image-viewer">
                <img 
                    src={produto.imagem[imgAtual] || produto.imagem[0]} 
                    className="main-product-img" 
                    alt={`${produto.nome} foto ${imgAtual + 1}`} 
                />
            </div>

            {/* Miniaturas */}
            {produto.imagem.length > 1 && (
                <div className='miniaturas-row mt-3 d-flex gap-2 justify-content-center flex-wrap'>
                    {produto.imagem.map((img, index) => (
                        <div 
                            key={index}
                            className={`miniatura-box ${index === imgAtual ? 'ativa' : ''}`}
                            onClick={() => showImg(index)}
                            role='button'
                            tabIndex={0}
                        >
                            <img 
                                className="miniatura-img"
                                src={img} 
                                alt={`Miniatura ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}