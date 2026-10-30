import './FullDescription.css'

export default function FullDescription({ produto }){
    return (
        <div className="full-description-box p-4 rounded-4">
            <h3 className="full-desc-title mb-3">
                <i className="fa-solid fa-circle-info me-2 text-primary"></i> Informações Detalhadas do Produto
            </h3>
            
            <div className="full-desc-content text-secondary" style={{ whiteSpace: 'pre-line' }}>
                {produto?.descricaoCompleta || produto?.descricao}
            </div>

            <div className="spec-table-container mt-4 pt-4 border-top">
                <h5 className="spec-table-title text-dark fw-bold mb-3">Ficha Técnica</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="spec-item p-2 rounded bg-light d-flex justify-content-between">
                            <span className="text-muted">Categoria</span>
                            <span className="fw-semibold text-capitalize">{produto?.categoria || 'Diversos'}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="spec-item p-2 rounded bg-light d-flex justify-content-between">
                            <span className="text-muted">Subcategoria</span>
                            <span className="fw-semibold">{produto?.subcategoria || 'Geral'}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="spec-item p-2 rounded bg-light d-flex justify-content-between">
                            <span className="text-muted">Disponibilidade</span>
                            <span className="fw-semibold text-success">Em estoque pronta entrega</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="spec-item p-2 rounded bg-light d-flex justify-content-between">
                            <span className="text-muted">Condição</span>
                            <span className="fw-semibold">Novo, original e lacrado</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}