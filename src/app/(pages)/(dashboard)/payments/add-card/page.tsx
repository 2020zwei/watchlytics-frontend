"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddCardWidget from "@/components/AddCardWidget";
import RoundedBox from "@/components/common/baseButton/RoundedBox";
import Heading from "@/components/common/heading";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

const page = () => {
    return (
        <RoundedBox className="max-w-[500px] p-5 mx-auto shadow-lg">
            <Heading className="mb-4">Enter Card detail</Heading>
            <Elements stripe={stripePromise}>
                <AddCardWidget />
            </Elements>
        </RoundedBox>
    )
}

export default page
