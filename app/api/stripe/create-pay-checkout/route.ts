import { auth } from "@/app/lib/auth";
import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testeId } = await req.json();

  const session = await auth();
  const userEmail = session?.user?.email;

  const price = process.env.STRIPE_PRODUCT_PRICE_ID;

  if (!price) {
    return NextResponse.json(
      {
        error: "Price not found",
      },
      {
        status: 500,
      }
    );
  }

  const metadata = {
    testeId,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card", "boleto"],
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/`,
      ...(userEmail && {
        customer_email: userEmail,
      }),
      metadata,
    });

    if (!session) {
      return NextResponse.json(
        {
          error: "Session URL not found",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        sessionId: session.id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
