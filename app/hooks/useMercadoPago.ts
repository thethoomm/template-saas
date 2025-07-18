import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useMercadoPago() {
  const router = useRouter();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  async function createMercadoPagoCheckout({
    testeId,
  }: {
    testeId: string;
  }) {
    try {
      const response = await fetch("/api/mercado-pago/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testeId,
        }),
      });

      const data = await response.json();

      router.push(data.initPoint);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    createMercadoPagoCheckout,
  };
}
