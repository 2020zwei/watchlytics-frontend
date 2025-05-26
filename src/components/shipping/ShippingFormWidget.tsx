"use client"
import React from 'react'
import RoundedBox from '../common/baseButton/RoundedBox';
import Heading from '../common/heading';
import FormField from '../common/FormField';
import { PackageFields, RecipientInformationFields, SenderFields } from '@/utils/mock';
import { useForm } from 'react-hook-form';
import { Button } from '@heroui/react';

const defaultData = {
    generate_label_on_save: false
}

const ShippingFormWidget = () => {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        watch,
        formState: { errors, isValid },
    } = useForm<any>({
        // @ts-ignore
        // resolver: zodResolver(InventoryFormSchema),
        defaultValues: defaultData,
        mode: "onChange",
    });

    const onSubmit = (data: any) => {
        reset();
    };


    return (
        <RoundedBox className='!px-5 pb-5'>
            <Heading className='pt-7 pb-3 border-b border-[#F0F1F3]'>Recipient Information</Heading>
            <form className="pt-5" onSubmit={handleSubmit(onSubmit)} >
                <fieldset>
                    <div className='max-w-[530px] flex flex-col gap-3'>
                        {RecipientInformationFields.map((field) => {

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
                                    labelClass='text-sm text-dark-700 !min-w-[170px]'
                                    inputClass='text-sm !min-h-8'
                                    placeholderClass="text-sm text-dark-700"
                                    isSearch={field?.isSearch}
                                // options={
                                //     field.fieldType === "select"
                                //         // @ts-ignore
                                //         ? dropdwonOptions?.[field?.name]
                                //         : undefined
                                // }
                                />
                            );
                        })}
                    </div>
                    <Heading className='pt-5 pb-2 border-b border-[#F0F1F3]'>Email Notification</Heading>
                    <div className='pt-1'>
                        <button type='button' className='text-sm font-medium'> <span className=' text-lg'>+</span> <span className='text-blue-850 ps-1'> Add Notification</span></button>
                    </div>
                    <Heading className='pt-4 pb-2 border-b border-[#F0F1F3] mb-5'>Package and Shipment Details</Heading>
                    <div className='max-w-[530px] flex flex-col gap-3'>
                        {PackageFields.map((field) => {

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
                                    labelClass='text-sm text-dark-700 !min-w-[170px]'
                                    inputClass='text-sm !min-h-8'
                                    placeholderClass="text-sm text-dark-700"
                                // options={
                                //     field.fieldType === "select"
                                //         // @ts-ignore
                                //         ? dropdwonOptions?.[field?.name]
                                //         : undefined
                                // }
                                />
                            );
                        })}
                    </div>
                    <Heading className='pt-4 pb-2 border-b border-[#F0F1F3] mb-5'>Sender Informationw</Heading>
                    <div className='max-w-[530px] flex flex-col gap-3'>
                        {SenderFields.map((field) => {

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
                                    labelClass='text-sm text-dark-700 !min-w-[170px]'
                                    inputClass='text-sm !min-h-8'
                                    placeholderClass="text-sm text-dark-700"
                                    isSearch={field?.isSearch}
                                // options={
                                //     field.fieldType === "select"
                                //         // @ts-ignore
                                //         ? dropdwonOptions?.[field?.name]
                                //         : undefined
                                // }
                                />
                            );
                        })}
                    </div>

                </fieldset>
                <div className='flex gap-3 border-t pt-5 mt-5 border-[#F0F1F3]'>
                    <Button type="submit" className="h-10 !w-[105px] rounded-lg bg-blue-gradient text-white"
                    // isDisabled={!isValid || !isDirty}
                    // isLoading={loading}
                    >
                        Submit
                        {/* {id ? "Update" : "Add"} */}
                    </Button>
                    <Button
                        onPress={() => reset()}
                        type="button" className="h-10 !w-[105px] border bg-transparent rounded-lg">
                        Reset
                    </Button>
                </div>
            </form>

        </RoundedBox>
    )
}

export default ShippingFormWidget
