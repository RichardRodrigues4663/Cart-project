import { useState } from 'react';
import { toast } from 'react-toastify';
import './SummaryCart.css'

export default function SummaryCart({ itemsCart }){
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [cupomDesconto, setCupomDesconto] = useState(0);

  const calcularDiscont = (subtotal) => {
    if (subtotal < 100) return 0
    if (subtotal <= 300) return 10
    return 30
  }

  // Multiplica pelo número de unidades de cada item
  const subtotal = itemsCart?.reduce(
    (acc, produto) => acc + (produto.preco * (produto.quantidadeCarrinho || 1)),
    0
  ) || 0

  const totalQuantidade = itemsCart?.reduce(
    (acc, produto) => acc + (produto.quantidadeCarrinho || 1),
    0
  ) || 0

  // Percentual de desconto progressivo
  const discont = calcularDiscont(subtotal)

  // Valor do desconto progressivo
  const valorDescontoProgressivo = subtotal * (discont / 100)
  
  // Desconto de cupom (se houver)
  const valorDescontoCupom = subtotal * (cupomDesconto / 100)
  
  const totalDescontos = valorDescontoProgressivo + valorDescontoCupom

  // Total final
  const total = Math.max(0, subtotal - totalDescontos)

  // Formatação
  const totalFormatado = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const descontosFormatado = totalDescontos.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  const handleAplicarCupom = (e) => {
    e.preventDefault();
    const cupomLimpo = cupom.trim().toUpperCase();
    if (!cupomLimpo) {
      toast.info('Digite um cupom de desconto');
      return;
    }
    if (cupomLimpo === 'BEMVINDO' || cupomLimpo === 'DESCONTO10' || cupomLimpo === 'CART10') {
      setCupomAplicado(true);
      setCupomDesconto(10);
      toast.success('Cupom de 10% aplicado com sucesso!');
    } else {
      toast.error('Cupom inválido ou expirado. Tente "CART10"');
    }
  };

  const handleCheckout = () => {
    toast.success('Pedido iniciado! Redirecionando para pagamento seguro...', {
      autoClose: 3000
    });
  };

  return(
    <div className="cart-total-card">
      <h4 className="summary-title">Resumo do Pedido</h4>

      <div className="summary-lines">
        <div className="total-line">
          <span className="line-label text-muted">
            <i className="fas fa-shopping-basket me-2 text-secondary"></i> Subtotal ({totalQuantidade} {totalQuantidade === 1 ? 'item' : 'itens'}):
          </span>
          <span className="line-value fw-semibold">R$ {subtotal.toFixed(2)}</span>
        </div>

        {discont > 0 && (
          <div className="total-line discount-line">
            <span className="line-label text-success">
              <i className="fa-solid fa-tag me-2"></i> Desconto Progressivo ({discont}%):
            </span>
            <span className="line-value text-success fw-bold">-{descontosFormatado}</span>
          </div>
        )}

        {cupomAplicado && (
          <div className="total-line discount-line">
            <span className="line-label text-success">
              <i className="fa-solid fa-ticket me-2"></i> Cupom ({cupomDesconto}%):
            </span>
            <span className="line-value text-success fw-bold">-R$ {valorDescontoCupom.toFixed(2)}</span>
          </div>
        )}

        <div className="total-line">
          <span className="line-label text-muted">
            <i className="fas fa-truck me-2 text-primary"></i> Frete Brasil:
          </span>
          <span className="line-value badge-shipping text-success fw-bold">
            GRÁTIS
          </span>
        </div>

        <div className="coupon-box mt-3 mb-2">
          <form onSubmit={handleAplicarCupom} className="d-flex gap-2">
            <input 
              type="text" 
              placeholder="Cupom (ex: CART10)" 
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              className="form-control form-control-sm input-coupon"
              disabled={cupomAplicado}
            />
            <button 
              type="submit" 
              className="btn btn-sm btn-apply-coupon"
              disabled={cupomAplicado}
            >
              {cupomAplicado ? 'Aplicado' : 'Aplicar'}
            </button>
          </form>
        </div>

        <div className="total-line total-final-row pt-3">
          <div className="d-flex flex-column">
            <span className="total-final-label">Total a pagar:</span>
            <span className="total-installments-note text-muted">
              ou em até 10x de R$ {(total / 10).toFixed(2)} sem juros
            </span>
          </div>
          <span className="total-final-amount">{totalFormatado}</span>
        </div>
      </div>

      <button 
        type="button"
        className="btn-checkout" 
        disabled={itemsCart.length < 1}
        onClick={handleCheckout}
      >
        <i className="fa-solid fa-lock me-2"></i> Finalizar Compra
      </button>

      <div className="security-notice mt-3 d-flex align-items-center justify-content-center gap-2 text-muted">
        <i className="fa-solid fa-shield-halved text-success"></i>
        <span>Ambiente Criptografado & Compra 100% Segura</span>
      </div>
    </div>
  )
}