"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getuserSubscription } from "@/db/queries";
import { userSubscription } from "@/db/schema";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user) {
        throw new Error("Unauthorized");
    }

    const userSubscription = await getuserSubscription();

    if(userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl
        });
        return { data: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: "GlossaFlow Pro",
                        description: "Unlock Unlimited Hearts for a whole year! Enjoy uninterrupted language learning and master new language at your own pace",
                    },
                    unit_amount: 99900,
                    recurring: {
                        interval: "year"
                    }
                }
            }
        ],
        metadata: {
            userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl
    });
    return { data: stripeSession.url};
} 