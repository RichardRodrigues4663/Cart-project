import './Button.css'

export default function Button({ text, onclick, categoriaAtual, value }){
    const val = value || text.toLowerCase();
    const isActive = categoriaAtual === val || 
                     (val === 'calçados' && categoriaAtual === 'calcados') ||
                     (val === 'em estoque' && categoriaAtual === 'emEstoque') ||
                     categoriaAtual === text.toLowerCase();

    return(
        <button 
            type="button"
            className={`btn-filter-pill ${isActive ? 'active' : ''}`}  
            onClick={() => onclick(val)}
        >
            {text}
        </button>
    )
}