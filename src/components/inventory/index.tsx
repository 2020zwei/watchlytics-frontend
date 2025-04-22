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

type FormSchemaType = z.infer<typeof InventoryFormSchema>;

const AddInventoryModal: React.FC<AddInventoryModalTypes> = ({ isOpen, onOpenChange }) => {
    const [fileMeta, setFileMeta] = useState<FileMetaTypes | null>();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(InventoryFormSchema),
        mode: "onChange"
    });


    useEffect(() => {
        reset({
            productid: "343438",
            name: "Bilal"
        })
    }, [])

    const onFormSubmit = (data: FormSchemaType) => {
        console.log(data)
        setFileMeta(null);
        reset()
    };

    useEffect(() => {
        return () => {
            reset()
            setFileMeta(null)
        }
    }, [isOpen])

    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent className="max-w-[500px] w-full ps-2 pe-1">
                    {(onClose) => {
                        const onSubmit = (data: FormSchemaType) => {
                            const res = onFormSubmit(data);
                        };
                        return (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <ModalHeader className="pt-7">
                                    <Heading>New Product</Heading>
                                </ModalHeader>
                                <ModalBody className="max-h-[calc(100vh-200px)] overflow-y-auto">
                                    <RoundedBox >
                                        <FileUploader
                                            onChange={(fileData) => {
                                                setFileMeta(fileData);
                                            }}
                                        >
                                            <div className="flex items-center gap-5 w-fit -ms-0Pagination">
                                                <RoundedBox className={clsx("w-20 h-20 outline-gray-180 overflow-hidden", !fileMeta && "outline-dashed")}>
                                                    {fileMeta?.url ? (
                                                        <img
                                                            width={80}
                                                            src={fileMeta?.url}
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
                                                            label={field.label}
                                                            name={field.name}
                                                            control={control}
                                                            placeholder={field.placeholder}
                                                            errors={errors}
                                                            options={field.fieldType === "select" ? [{ value: "bilal", label: "bilal" }] : undefined}
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
                                            onClose();
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        title="Add Product"
                                        className="h-10"
                                        disabled={!isValid || !fileMeta || !isDirty}
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
