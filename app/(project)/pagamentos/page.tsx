"use client";

import { useMercadoPago } from "@/app/hooks/useMercadoPago";
import { useStripe } from "@/app/hooks/useStripe";

export default function Pagamentos() {
  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  } = useStripe();

  const { createMercadoPagoCheckout } = useMercadoPago();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-semibold">Pagamentos</h1>

      <div className="max-w-2xl flex flex-col gap-6">
        <button
          onClick={() =>
            createPaymentStripeCheckout({
              testeId: "123",
            })
          }
          className="border border-gray-400 px-4 py-2 cursor-pointer"
        >
          Criar Pagamento Stripe
        </button>
        <button
          onClick={() =>
            createSubscriptionStripeCheckout({
              testeId: "123",
            })
          }
          className="border border-gray-400 px-4 py-2 cursor-pointer"
        >
          Criar Assinatura Stripe
        </button>
        <button
          onClick={handleCreateStripePortal}
          className="border border-gray-400 px-4 py-2 cursor-pointer"
        >
          Criar Portal de Pagamentos
        </button>
        <button
          onClick={() => createMercadoPagoCheckout({
            testeId: '123',
            userEmail: 'test@gmail.com'
          })}
          className="border border-gray-400 px-4 py-2 cursor-pointer"
        >
          Criar Pagamento Mercado Pago
        </button>
      </div>
    </div>
  );
}
