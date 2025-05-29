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
import { availabilities, conditions, InventoryFormFields, InventoryFormSchema } from "@/utils/mock";
import { AddInventoryModalTypes, FileMetaTypes } from "@/types";
import { TransparentButton } from "../common/baseButton/TransparentButton";
import FormField from "../common/FormField";
import clsx from "clsx";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/dateFormater";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useInventory";


type FormSchemaType = z.infer<typeof InventoryFormSchema>;

const AddInventoryModal: React.FC<AddInventoryModalTypes> = ({
    isOpen,
    onOpenChange,
    options,
    formTitle,
    defaultData,
    callBack = () => { },
}) => {
    const [fileMeta, setFileMeta] = useState<FileMetaTypes | null>(null);
    const { mutateAsync: updateProductMutation, isPending } = useUpdateProduct();
    const { mutateAsync: createProductMutation, isPending: createPending } = useCreateProduct();

    const dropdwonOptions = {
        category: options,
        availability: availabilities,
        condition: conditions
    }

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
        resolver: zodResolver(InventoryFormSchema),
        mode: "onChange",
        defaultValues: {
            quantity: 1
        }
    });
    const onFormSubmit = (data: FormSchemaType) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            let value = data[key as keyof typeof data];
            if (key === "date_sold" || key === "date_purchased") {
                value = formatDate(value);
            }
            if (value === undefined || value === null) return;

            // @ts-ignore
            formData.append(key, value);
        });

        if (!fileMeta?.file) {
            formData.delete("image");
        }

        if (defaultData) {
            updateProductMutation(
                { id: defaultData.id, formData },
                {
                    onSuccess: () => {
                        toast.success("Product successfully updated");
                        resetAll();
                        callBack?.();
                    },
                    onError: (error: any) => {
                        toast.error(
                            error?.response?.data?.errors?.product_ids || "Something went wrong"
                        );
                    },
                }
            );
        } else {
            createProductMutation(formData, {
                onSuccess: () => {
                    toast.success("Product successfully created");
                    resetAll();
                    callBack?.();
                },
                onError: (error: any) => {
                    const errorMessage = Object.values(error?.response?.data?.errors || {})[0];
                    if (errorMessage) {
                        toast.error(String(errorMessage));
                    }
                },
            });
        }
    };


    useEffect(() => {
        if (defaultData) {
            const prefill = {
                ...defaultData,
                availability: defaultData.availability || "in_stock",
                condition: defaultData.condition || "new",
            };

            Object.entries(prefill).forEach(([key, value]) => {
                setValue(key as keyof FormSchemaType, value);
            });

            trigger();
        }
    }, [defaultData, setValue, trigger]);


    const resetAll = () => {
        if (defaultData) {
            const clearedValues = Object.keys(defaultData).reduce((acc, key) => {
                acc[key] = "";
                return acc;
            }, {} as Record<string, any>);
            reset(clearedValues);
        } else {
            reset();
        }
        setFileMeta(null);
        onOpenChange(false);
    };
    return (
        <Modal
            isDismissable={true}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    resetAll()
                }
                onOpenChange(open);
            }}
        >
            <ModalContent className="max-w-[600px] w-full ps-2 pe-1">
                {(onClose) => {
                    const onSubmit = (data: any) => {
                        onFormSubmit(data);
                    };

                    return (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <ModalHeader className="pt-7">
                                <Heading>{formTitle}</Heading>
                            </ModalHeader>
                            <ModalBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
                                <RoundedBox>
                                    <FileUploader
                                        onChange={(fileData) => {
                                            setFileMeta(fileData);
                                            setValue("image", fileData?.file, { shouldValidate: true });
                                            trigger("image");
                                        }}
                                    >
                                        <div className="flex items-center relative xs:flex-row flex-col gap-5 w-fit sm:-ms-[100px] Pagination">
                                            <RoundedBox className={clsx("w-20 h-20 outline-gray-180 overflow-hidden", watch("image") ? "" : " outline-dashed")}>
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
                                            {errors?.image?.message ? <p className="text-sm text-red-800 absolute -bottom-6 whitespace-nowrap">{errors?.image?.message}</p> : null}
                                        </div>
                                    </FileUploader>

                                    <div className="pt-4">
                                        <fieldset className="flex flex-col gap-6">
                                            {InventoryFormFields.map((field) => {
                                                const purchaseDate = watch("date_purchased");

                                                return (
                                                    <FormField
                                                        fieldType={field.fieldType}
                                                        key={field.label}
                                                        type={field?.type}
                                                        label={field.label}
                                                        name={field.name}
                                                        control={control}
                                                        placeholder={field.placeholder}
                                                        labelClass="!min-w-[160px]"
                                                        field={field}
                                                        min={
                                                            field.name === "date_sold" && purchaseDate
                                                                ? purchaseDate
                                                                : field.name === "date_purchased"
                                                                    ? undefined
                                                                    : undefined
                                                        }
                                                        errors={errors}
                                                        options={
                                                            field.fieldType === "select"
                                                                // @ts-ignore
                                                                ? dropdwonOptions?.[field?.name]
                                                                : undefined
                                                        }
                                                    />
                                                );
                                            })}

                                        </fieldset>
                                    </div>
                                </RoundedBox>
                            </ModalBody>
                            <ModalFooter className="!mt-0 pe-10">
                                <TransparentButton
                                    title="Discard"
                                    onPress={resetAll}
                                />
                                <Button
                                    type="submit"
                                    title={defaultData ? "Update Product" : "Add Product"}
                                    className="h-10"
                                    isLoading={isPending || createPending}
                                />
                            </ModalFooter>
                        </form>
                    );
                }}
            </ModalContent>
        </Modal>
    );
};

export default memo(AddInventoryModal);
