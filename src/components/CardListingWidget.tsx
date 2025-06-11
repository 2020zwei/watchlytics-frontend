"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import RoundedBox from '@/components/common/baseButton/RoundedBox';
import Heading from '@/components/common/heading';
import Icon from '@/components/common/Icon';
import { RequestTypes } from '@/types';
import { METHODS, URLS } from '@/utils/constants';
import { sendRequest } from '@/utils/apis';
import Notfound from '@/components/common/Notfound';
import { toast } from 'react-toastify';
import { Button, Spinner } from '@heroui/react';
import { useRouter, useSearchParams } from "next/navigation";
import AlertModal from './common/AlertModal';

const CardListingWidget = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams();
    const [plan, setPlan] = useState<any>()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const planId = searchParams.get("id");
    const [deleteId, setDeleteId] = useState()
    const navigate = useRouter()
    const getCards = async () => {
        setLoading(true)
        const PAYLOAD: RequestTypes = {
            url: URLS.CARDS,
            method: METHODS.GET,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.status === 200) {
                setCards(res.data.cards)
            }
            else {
            }
        }).finally(() => setLoading(false))
    }
    const handleDelete = (id: any) => {
        setDeleteId(id)
        setIsUploadModalOpen(true)

    }
    const comfirmDelete = () => {
        const PAYLOAD: RequestTypes = {
            url: `${URLS.CARDS}${deleteId}/`,
            method: METHODS.DELETE,
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.status === 200) {
                setCards(() => cards.filter((card: any) => card.id !== deleteId))
                toast.success(res.data.message);
                closeUploadModal()
            }
            else {
                toast.error(res?.error?.message || "Something went wrong, please try again.");
            }
        }).catch((err) => {
            toast.error("An error occurred while deleting card.");
        })
    }
    const handleSetDefauldCard = async (id: any) => {
        const PAYLOAD: RequestTypes = {
            url: `${URLS.CARDS}${id}/set_default/`,
            method: METHODS.POST,
        };
        try {
            const res = await sendRequest(PAYLOAD);
            if (res?.status === 200) {
                toast.success(res.data.message);
                setCards((prevCards: any) =>
                    prevCards.map((card: any) => ({
                        ...card,
                        is_default: card.id === id,
                    }))
                );
            } else {
                toast.error(res?.error?.message || "Something went wrong, please try again.");
            }
        } catch (err) {
            toast.error("An error occurred while setting the default card.");
        }
    };

    const addCard = () => {
        navigate.push("/payments/add-card")
        localStorage.setItem("cardId", JSON.stringify(planId))
    }

    const handleCheckout = () => {
        setIsSubmitting(true)
        const selectedCard: any = cards?.find((card: any) => card?.is_default)
        const PAYLOAD = {
            plan_name: plan.name,
            price_id: plan.stripe_price_id,
            payment_method_token: selectedCard?.stripe_payment_method_id,
        };
        sendRequest({ url: "/subscribe/", method: "POST", payload: PAYLOAD })
            .then(async (res) => {
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                } else {
                    if (!res?.response?.data?.card_declined) {
                        toast.error(res?.response?.data?.message);
                    }
                    if (res?.data?.response) {
                        toast.error(res?.data?.response?.errors?.error || "Something went wrong");
                    }
                }
            }).catch((err) => {
                toast.error("Something went wrong")
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }
    const getSubscriptions = () => {
        setLoading(true)
        sendRequest({ url: `/plans/${planId}/`, method: "GET" }).then(res => {
            setPlan(res?.data)
        })
    }
    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };


    useEffect(() => {
        
        planId && getSubscriptions()
        getCards()
    },
        [])
    if (loading) {
        return <div className='text-center mt-5'><Spinner /></div>
    }
    else {
        return (
            <>
                <RoundedBox>
                    <div className='flex items-center justify-between px-5 pt-7 pb-3'>
                        <Heading>Saved Cards</Heading>
                        <button onClick={addCard}
                            className="h-10 px-3 text-sm font-medium flex items-center justify-between text-white rounded-lg bg-blue-gradient"
                        >Add Card</button>
                    </div>
                    <div className=" overflow-x-auto">
                        {!cards.length ? <Notfound label='Cards not found' /> :
                            <table className='w-full'>
                                <thead className='h-12'>
                                    <tr className='text-white text-sm font-medium bg-blue-gradient'>
                                        <th className='text-start px-4 first:rounded-s-lg whitespace-nowrap'>
                                            Card type
                                        </th>
                                        <th className='text-start whitespace-nowrap px-4'>
                                            Card number
                                        </th>
                                        <th className='text-start whitespace-nowrap px-4'>
                                            Expiration date
                                        </th>
                                        <th className='text-start whitespace-nowrap px-4'>
                                            Cardholder name
                                        </th>
                                        <td className='text-start whitespace-nowrap px-4'>Set Default</td>
                                        <th className='text-end last:rounded-e-lg w-20 whitespace-nowrap px-4'>
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cards.map((card: any) => (
                                        <tr key={card?.id} className='border-b border-[#F0F1F3] text-sm font-medium text-[#808080]'>
                                            <td className='text-start py-3 px-4 whitespace-nowrap capitalize'>
                                                {card?.card_brand}
                                            </td>
                                            <td className='px-4 text-start py-3 whitespace-nowrap'> XXXX-XXXX-XXXX-{card?.last_four}</td>
                                            <td className='px-4 text-start py-3 whitespace-nowrap'>{card?.exp_month}/{card?.exp_year}</td>
                                            <td className='py-3 px-4 text-start whitespace-nowrap'>{card?.card_holder_name}</td>
                                            <td className="py-3 px-4 text-start whitespace-nowrap">
                                                <div className="relative w-10">
                                                    <input
                                                        type="radio"
                                                        id={`id_${card?.id}`}
                                                        name="card"
                                                        checked={card?.is_default}
                                                        onChange={() => handleSetDefauldCard(card.id)}
                                                        className="sr-only peer"
                                                    />
                                                    <label
                                                        htmlFor={`id_${card?.id}`}
                                                        className="block w-full h-5 bg-gray-300 rounded-full cursor-pointer peer-checked:bg-blue-600 transition-colors"
                                                    ></label>
                                                    <span
                                                        className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 transform peer-checked:translate-x-5"
                                                    />
                                                </div>

                                            </td>


                                            <td className='px-4 py-3 cursor-pointer text-center'>
                                                <button className={card?.is_default ? "opacity-50" : ""} disabled={card?.is_default} onClick={() => card?.is_default ? undefined : handleDelete(card.id)}><Icon name='trash' fill='#F31111' /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                    </div>
                </RoundedBox>
                {cards?.length && plan?.id ? <div className='text-end mt-5'>
                    <Button isLoading={isSubmitting} onPress={handleCheckout} className='text-white rounded-lg !bg-blue-gradient'>Checkout</Button>
                </div> : null}
                <AlertModal
                    alertText="Are you sure you want to delete this card?"
                    isOpen={isUploadModalOpen} onOpen={closeUploadModal} callBack={comfirmDelete} />
            </>
        )
    }
}

export default CardListingWidget

