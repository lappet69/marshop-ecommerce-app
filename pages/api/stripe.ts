import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripeConfig: Stripe.StripeConfig = {
  apiVersion: "2022-11-15",
  timeout: 10000,
  maxNetworkRetries: 2,
};
const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!,
  stripeConfig
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1MfzUMBW3mrYzg8bE825Fgxi" },
          { shipping_rate: "shr_1Mg09ABW3mrYzg8bEkFDkaQf" },
        ],
        line_items: req.body.map((item: any) => {
          const img = item.image;
          const newImage = img
            .replace("image-", "https://fakestoreapi.com/img/")
            .replace("-jpg", ".jpg");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.title,
                images: [newImage],
              },
              unit_amount: Math.round(item.price * 100),
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
