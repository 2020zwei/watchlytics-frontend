import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/react";
import React, { memo, useEffect, useState } from "react";
import Heading from "../common/heading";
import RoundedBox from "../common/baseButton/RoundedBox";
import FileUploader from "../common/UploadWithDragDrop";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../common/baseButton/BaseButton";
import { InventoryFormFields, InventoryFormSchema } from "@/utils/mock";
import { AddInventoryModalTypes, FileMetaTypes } from "@/types";
import { TransparentButton } from "../common/baseButton/TransparentButton";
import FormField from "../common/FormField";
import clsx from "clsx";
import { sendRequest } from "@/utils/apis";
import { METHODS, URLS } from "@/utils/constants";
import { toast } from "react-toastify";


type FormSchemaType = z.infer<typeof InventoryFormSchema>;

const AddInventoryModal: React.FC<AddInventoryModalTypes> = ({ isOpen, onOpenChange, options, formTitle, defaultData }) => {
    const [submitting, setSubmittion] = useState<boolean>(false);
    const [fileMeta, setFileMeta] = useState<FileMetaTypes | null>();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        formState: { errors, isDirty, isValid },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(InventoryFormSchema),
        mode: "onChange",
    });

    const onFormSubmit = (data: FormSchemaType) => {
        setSubmittion(true)
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
            // @ts-ignore
            let value = data[key];
            formData.append(key, value);
        });
        if(!fileMeta?.file){
            formData.delete("image")
        }
        const PAYLOAD = {
            url: defaultData ? URLS.UPDATEPRODUT + defaultData?.id+"/" : URLS.ADDPRODUCT,
            method: defaultData ? METHODS.PATCH : METHODS.POST,
            payload: formData
        }
        sendRequest(PAYLOAD).then((res) => {
            if (res?.status === 201 ||res?.status === 200) {
                toast.success(defaultData ? "Product successfully updated" : "Product successfully added");
                setFileMeta(null);
                onOpenChange(false)
                reset()
            }
            const errors = res?.response?.data?.errors
            if (errors) {
                Object.keys(errors).forEach(key => {
                    toast.error(errors[key])
                })
            }
        }).finally(() => {
            setSubmittion(false)
        })

    };

    useEffect(() => {
        return () => {
            reset()
            setFileMeta(null)
        }
    }, [isOpen])

    const resetAll = async () => {
        if (defaultData) {
            const clearedValues = Object.keys(defaultData).reduce((acc, key) => {
                acc[key] = "";
                return acc;
            }, {} as Record<string, any>);
            reset(clearedValues);
            onOpenChange(false)
        }
        else {
            onOpenChange(false)
        }
    }

    useEffect(() => {
        if (defaultData) {
            reset(defaultData)
        }
    }, [defaultData])

    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent className="max-w-[600px] w-full ps-2 pe-1">
                    {(onClose) => {
                        const onSubmit = (data: FormSchemaType) => {
                            const res = onFormSubmit(data);
                        };
                        return (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <ModalHeader className="pt-7">
                                    <Heading>{formTitle}</Heading>
                                </ModalHeader>
                                <ModalBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
                                    <RoundedBox >
                                        <FileUploader
                                            onChange={(fileData) => {
                                                setFileMeta(fileData);
                                                setValue("image", fileData?.file, { shouldValidate: true });
                                                trigger("image");
                                            }}
                                        >
                                            <div className="flex items-center gap-5 w-fit -ms-0Pagination">
                                                <RoundedBox className={clsx("w-20 h-20 outline-gray-180 overflow-hidden", !fileMeta || !defaultData?.image && "outline-dashed")}>
                                                    {fileMeta?.url || defaultData?.image ? (
                                                        <img
                                                            width={80}
                                                            src={fileMeta?.url || defaultData?.image}
                                                            alt="Selected Image"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : null}
                                                </RoundedBox>

                                                <div className="text-sm">
                                                    <div className="text-gray-180">Drag image here</div>
                                                    <div className="text-center text-gray-180">or</div>
                                                    <div className="text-dark-800">Browse image</div>
                                                </div>
                                            </div>
                                        </FileUploader>

                                        <div className="pt-4">
                                            <fieldset className="flex flex-col gap-6">
                                                {
                                                    InventoryFormFields.map((field) => (
                                                        <FormField
                                                            fieldType={field.fieldType}
                                                            key={field.label}
                                                            type={field?.type}
                                                            label={field.label}
                                                            name={field.name}
                                                            control={control}
                                                            placeholder={field.placeholder}
                                                            errors={errors}

                                                            // @ts-ignore
                                                            options={field.fieldType === "select" ? options : undefined}
                                                        />
                                                    ))
                                                }

                                            </fieldset>
                                            <div>

                                            </div>
                                        </div>

                                    </RoundedBox>
                                </ModalBody>
                                <ModalFooter className="!mt-0 pe-10">
                                    <TransparentButton
                                        title="Discard"
                                        onPress={() => {
                                            resetAll()
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        title={defaultData ? "Update Product" : "Add Product"}
                                        className="h-10"
                                        isDisabled={!isValid}
                                        isLoading={submitting}
                                    />
                                </ModalFooter>
                            </form>
                        )
                    }}
                </ModalContent>
            </Modal>
        </>
    );
};

export default memo(AddInventoryModal)
