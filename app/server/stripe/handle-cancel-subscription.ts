import { db } from "@/app/lib/firebase";
import "server-only";

import Stripe from "stripe";

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent
) {
  if (event.data.object.status === "canceled") {
    console.log(
      "Pagamento realizado com sucess. Enviar um email para o usuário e liberar acessso"
    );

    const customerId = event.data.object.customer

    const userRef = await db.collection('users').where("stripeCustomerId", "==", customerId).get()

    if (userRef.empty) {
        console.error("User not found")
        return
    }

    const userId = userRef.docs[0].id

    await db.collection("users").doc(userId).update({
      subscriptionStatus: "inactive",
    });
  }
}
