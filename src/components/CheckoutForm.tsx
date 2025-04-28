"use client";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";
import type { StripeElementChangeEvent } from "@stripe/stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./common/baseButton/BaseButton";
import { sendRequest } from "@/utils/apis";
import Icon from "./common/Icon";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ planName, priceId }: { planName: string, priceId: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useRouter()
    const [cardNumberError, setCardNumberError] = useState("");
    const [csvError, setCsvError] = useState("");
    const [expiryError, setExpiryError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ Complete flags
    const [isCardComplete, setIsCardComplete] = useState(false);
    const [isExpiryComplete, setIsExpiryComplete] = useState(false);
    const [isCvcComplete, setIsCvcComplete] = useState(false);
    const [name, setName] = useState("")

    const stripeInputStyle = {
        base: {
            fontSize: "16px",
            color: "#808080",
            "::placeholder": {
                color: "#808080",
            },
        },
        invalid: {
            color: "#EF4444",
        },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name) {
            toast.error("Please fill card holder field")
            return false
        }
        e.preventDefault();
        setIsSubmitting(true);

        if (!stripe || !elements) {
            toast.error("Payment couldn't be initiated, Try Again!");
            setIsSubmitting(false);
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
            toast.error("Card details not found.");
            setIsSubmitting(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            toast.error(error.message || "Payment failed.");
            setIsSubmitting(false);
        } else {
            const PAYLOAD = {
                plan_name: planName,
                price_id: priceId,
                payment_method_token: paymentMethod?.id,
            };

            sendRequest({ url: "/subscribe/", method: "POST", payload: PAYLOAD })
                .then(async (res) => {
                    console.log(res)
                    if (res?.success) {
                        toast.success(res.data.message);
                        console.log(localStorage.getItem("isLoggedin"), 'localStorage.getItem("isLoggedin")')
                        const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedin") || "false");
                        if (isLoggedIn) {
                            navigate.push("/profile");
                        }
                        else {
                            await fetch('/api/logout')
                            navigate.push("/login")
                        }
                    } else {
                        if (res?.response) {
                            toast.error(res?.response?.errors?.error || res?.response?.message);
                        }
                    }
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        }
    };

    const handleCardNumberChange = (event: StripeElementChangeEvent) => {
        setCardNumberError(event.error ? event.error.message ?? "" : "");
        setIsCardComplete(event.complete);
    };

    const handleExpiryChange = (event: StripeElementChangeEvent) => {
        setExpiryError(event.error ? event.error.message ?? "" : "");
        setIsExpiryComplete(event.complete);
    };

    const handleCvcChange = (event: StripeElementChangeEvent) => {
        setCsvError(event.error ? event.error.message ?? "" : "");
        setIsCvcComplete(event.complete);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-14">
                    <span><Icon name="user" /></span>
                    <input
                        className="bg-transparent w-full text-[#808080] placeholder:text-[#808080] outline-none"
                        required
                        placeholder="Card holder name"
                        onChange={(e: any) => setName(e.target.value)}
                    />
                </div>
                {/* Card Number */}
                <div className="space-y-1">
                    <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-14">
                        {/* <span><Icon name="card" /></span> */}
                        <CardNumberElement
                            onChange={handleCardNumberChange}
                            options={{ showIcon: true, style: stripeInputStyle, placeholder: "Card Number" }}
                            id="cardNumber"
                            className="w-full"

                        />
                    </div>
                    {cardNumberError && <div className="text-red-500 text-xs">{cardNumberError}</div>}
                </div>

                <div className=" grid md:grid-cols-2 md:gap-8 gap-4">
                    <div className="space-y-1">
                        <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-14">
                            <span><Icon name="calender" /></span>
                            <CardExpiryElement
                                onChange={handleExpiryChange}
                                options={{ style: stripeInputStyle, placeholder: "Expiry Date" }}
                                id="cardExpiry"
                                className="w-full"
                            />
                        </div>
                        {expiryError && <div className="text-red-500 text-xs">{expiryError}</div>}
                    </div>

                    {/* CVC */}
                    <div className="space-y-1">
                        <div className="rounded-lg border border-gray-180 px-3 flex items-center gap-3 h-14">
                            <CardCvcElement
                                onChange={handleCvcChange}
                                options={{ style: stripeInputStyle, placeholder: "CVC" }}
                                id="cardCvc"
                                className="w-full"

                            />
                        </div>
                        {csvError && <div className="text-red-500 text-xs">{csvError}</div>}
                    </div>
                </div>

                {/* Checkout Button */}
                <div className="mt-10 mb-8">
                    <Button
                        type="submit"
                        title="Checkout"
                        className="h-14 w-full font-semibold text-xl mt-5"
                        isDisabled={
                            !stripe ||
                            !elements ||
                            isSubmitting ||
                            !isCardComplete ||
                            !isExpiryComplete ||
                            !isCvcComplete ||
                            !(name.toString().length > 2)
                        }
                        isLoading={isSubmitting}
                    />
                </div>
            </form>
        </>
    );
};

export default CheckoutForm;
