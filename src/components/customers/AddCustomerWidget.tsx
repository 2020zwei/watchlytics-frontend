"use client"

import RoundedBox from "@/components/common/baseButton/RoundedBox";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/heading";
import { sendRequest } from "@/utils/apis";
import { METHODS, URLS } from "@/utils/constants";
import { Button, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
export const FormFieldsSchema = z.object({
    name: z.string().min(3, "Name is required and at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .min(1, { message: "Number is required" })
        .min(8, { message: "Number must be at least 8 characters" }),
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
        label: "Email",
        name: "email",
        placeholder: "Enter email",
        fieldType: "input",
        type: "email"
    },
    {
        label: "Phone number:",
        name: "phone",
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

const AddCustomerWidget = () => {
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useRouter()
    const id = useSearchParams().get('id')

    const {
        control,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors, isValid },
    } = useForm<FormSchemaType>({
        // @ts-ignore
        resolver: zodResolver(FormFieldsSchema),
        mode: "onChange",
    });
    const onSubmit = (formData: FormSchemaType) => {
        setSubmitting(true);
        const PAYLOAD = {
            url: id ? `${URLS.CUSTOMERS}${id}/` : URLS.CUSTOMERS,
            method: id ? METHODS.PATCH : METHODS.POST,
            payload: formData
        };
        sendRequest(PAYLOAD).then((res) => {
            if (res?.status === 200 || res?.status === 201) {
                toast.success(`Customer successfully ${id ? "updated" : "created"}`);
                navigate.push("/customers")
            }
            else {
                if (res?.status === 400) {
                    Object.keys(res?.response?.data?.errors).forEach((key: string) => toast.error(res?.response?.data?.errors[key] || "Something went wrong"))
                }
                if (res?.status === 500) {
                    toast.error("Something went wrong")
                }
            }
        }).finally(() => {
            setSubmitting(false);
        });
    }

    const getCustomer = () => {
        setLoading(true);
        const PAYLOAD = {
            url: `${URLS.CUSTOMERS}${id}/`,
        };
        sendRequest(PAYLOAD).then((res) => {
            if (res?.status === 200) {
                const { name, email, phone, address } = res?.data
                setValue("name", name)
                setValue("email", email)
                setValue("phone", phone)
                setValue("address", address)
                trigger()
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (id) {
            getCustomer()
        }
    }, [id])
    if (loading) {
        return <div className="text-center mt-5"><Spinner /></div>
    }
    return (
        <RoundedBox className="px-4 min-h-[calc(100vh-160px)] pb-5">
            <Heading className="pt-8 pb-3 mb-4 border-b">{id ? "Update" : "Add"} Customer</Heading>
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
                    <Button type="submit" isLoading={submitting} className="bg-blue-gradient h-10 w-[84px] rounded-lg text-white text-sm font-medium" isDisabled={!isValid}>{id ? "Update" : "Add"}</Button>
                    <Button variant="bordered" className="h-10 w-[84px] rounded-lg text-[#ACACAC] border-1 ms-3 text-sm font-medium" onPress={() => navigate.push("/customers")}>Cancel</Button>
                </div>
            </form>
        </RoundedBox>
    )
}

export default AddCustomerWidget
