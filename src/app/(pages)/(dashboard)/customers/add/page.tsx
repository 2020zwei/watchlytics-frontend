"use client"

import RoundedBox from "@/components/common/baseButton/RoundedBox";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/heading";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const FormFieldsSchema = z.object({
    name: z.string().min(1, "ame iNs required"),
    number: z.string().min(8, "Number is required"),
    address: z.string().min(1, "Address is required"),
})
const fields = [
    {
        label: "Name Of Customer:",
        name: "name",
        placeholder: "Enter name",
        fieldType: "input",
        type: "text"
    },
    {
        label: "Phone number:",
        name: "number",
        placeholder: "Enter number",
        fieldType: "input",
        type: "text"
    },
    {
        label: "Address:",
        name: "address",
        placeholder: "Enter address",
        fieldType: "input",
        type: "text"
    },
]
type FormSchemaType = z.infer<typeof FormFieldsSchema>;
const page = () => {
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        watch,
        formState: { errors, isValid },
    } = useForm<FormSchemaType>({
        // @ts-ignore
        resolver: zodResolver(FormFieldsSchema),
        mode: "onChange",
    });
    const onSubmit = (data: FormSchemaType) => { }

    return (
        <RoundedBox className="px-4 min-h-[calc(100vh-160px)] pb-5">
            <Heading className="pt-8 pb-3 mb-4 border-b">Add Customer</Heading>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <fieldset className="flex flex-col gap-6 max-w-[480px] pb-10">
                    {fields.map((field) => {
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
                                labelClass="min-w-[160px]"
                                containerClass="flex"
                            />
                        );
                    })}

                </fieldset>
                <div className=" border-t pt-4">
                    <Button className="bg-blue-gradient h-10 w-[84px] rounded-lg text-white text-sm font-medium">Add</Button>
                    <Button variant="bordered" className="h-10 w-[84px] rounded-lg text-[#ACACAC] border-1 ms-3 text-sm font-medium">Cancel</Button>
                </div>
            </form>
        </RoundedBox>
    )
}

export default page
