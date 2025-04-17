import { auth } from "@/app/lib/auth";
import mercadoPago from "@/app/lib/mercado-pago";
import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testeId } = await req.json();

  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json(
      {
        error: "Unhathorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const preference = new Preference(mercadoPago);

    const createdPreference = await preference.create({
      body: {
        external_reference: testeId, // Impacta na pontuação do Mercado Pago
        metadata: {
          testeId, // Essa váriavel é convertida para snake_case -> teste_id
        },
        payer: {
          email: userEmail,
        },
        items: [
          {
            id: "",
            title: "",
            description: "",
            quantity: 1,
            unit_price: 1,
            currency_id: "BRL",
            category_id: "services",
          },
        ],
        payment_methods: {
          installments: 12, // Parcelas máximas
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/api/mercado-pago/pending`,
          failure: `${req.headers.get("origin")}/api/mercado-pago/pending`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`,
        },
      },
    });

    if (!createdPreference.id) {
      return NextResponse.json(
        {
          error: "Error creating checkout with Mercado Pago",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
