//importando dependencias
import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';

//importando dados
import { produtos } from '../../data/products.js'
import { ofertasDoDia } from '../../data/offersDay.js';

// impotando estilos
import './ProductPage.css'

//importando Componentes
import Header from '../../components/Layout/Header/Header.jsx'
import PriceSection from '../../components/PageProduct/PriceSection/PriceSection.jsx';
import ImgProductSection from '../../components/PageProduct/ImgProductSection/ImgProductSection.jsx';
import DescriptionProductSection from '../../components/PageProduct/DescriptionProductSection/DescriptionProductSection.jsx';
import Footer from '../../components/Layout/Footer/Footer.jsx'
import FullDescription from '../../components/PageProduct/FullDescription/FullDescription.jsx';
import SuggestionProducts from '../../components/PageProduct/SuggestionsProducts/SuggestionsProducts.jsx';

export default function ProductPage(){

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    
    // Procura o produto em produtos normais ou ofertas
    const produto = produtos.find(p => String(p.id) === String(id)) || 
                    ofertasDoDia.find(p => String(p.id) === String(id)) || 
                    produtos[0];

    useEffect(() => {
        // Rolagem para o topo ao montar o componente
        window.scrollTo(0, 0);  
    }, [id])

    return(
      <div className="product-page-container">
        <Header />
        
        <div className="container product-page-content py-4">
          {/* Breadcrumb simples */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span role="button" onClick={() => navigate('/')} className="text-white-50">Início</span>
              </li>
              <li className="breadcrumb-item">
                <span role="button" onClick={() => navigate('/ofertas')} className="text-white-50">Produtos</span>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">
                {produto.nome}
              </li>
            </ol>
          </nav>

          <div className="product-details-card p-4 bg-white rounded-4 shadow-lg">
            <div className="details-grid">
              <div className="gallery-col">
                <ImgProductSection produto={produto} />
              </div>

              <div className="info-col">
                <DescriptionProductSection produto={produto}/>
              </div>

              <div className="purchase-col">
                <PriceSection produto={produto} />
              </div>
            </div>

            <hr className="my-5 opacity-25" />

            <div className="full-desc-col">
              <FullDescription produto={produto}/>
            </div>

            <div className="suggestions-col mt-5">
              <SuggestionProducts produto={produto}/>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
}