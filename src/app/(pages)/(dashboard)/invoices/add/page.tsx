"use client"

import RoundedBox from '@/components/common/baseButton/RoundedBox';
import FormField from '@/components/common/FormField';
import Heading from '@/components/common/heading';
import { InvoiceFormFields, InvoiceFormFieldsSchema } from '@/utils/mock';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod";
type FormSchemaType = z.infer<typeof InvoiceFormFieldsSchema>;
const page = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormSchemaType>({
        // @ts-ignore
        resolver: zodResolver(InvoiceFormFieldsSchema),
        mode: "onChange",
    });

    const fetchProducts = async () => {
    
    };
    useEffect(() => { fetchProducts() }, [])
    const onSubmit = (data: FormSchemaType) => {
        setLoading(true)
    }

    return (
        <RoundedBox className='px-4 py-8 '>
            <Heading className=' border-b border-[#F0F1F3] pb-4'>Add New Invoice</Heading>
            <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
                <fieldset className="flex flex-col sm:gap-6 max-w-[500px]">
                    {InvoiceFormFields.map((field) => {
                        return (
                            <FormField
                                fieldType={field.fieldType}
                                key={field.label}
                                type={field?.type}
                                label={field.label}
                                name={field.name}
                                control={control}
                                placeholder={field.placeholder}
                                errors={errors}
                                options={products}
                                containerClass='flex sm:flex-row flex-col items-start xl:gap-8 sm:gap-x-6'
                                inputContainer='sm:flex-1 w-full'
                                inputClass='!min-h-10'
                            />
                        );
                    })}

                </fieldset>
                <div className='flex gap-3 px-4 py-5 border-t mt-5 border-[#F0F1F3]'>
                    <Button type="submit" className="h-10 bg-blue-gradient text-white"
                        isDisabled={!isValid}
                        isLoading={loading}
                    >
                        Add
                    </Button>
                    <Button onPress={() => navigate.back()} type="button" className="h-10 border bg-transparent">
                        Cancel
                    </Button>
                </div>
            </form>
        </RoundedBox>
    )
}

export default page
