"use client";

import { useUpdateCustomer } from "@/hooks/useCustomerHooks";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AddNoteModalWidgetTypes {
    isOpen: boolean;
    note: any,
    onOpen: (value: boolean) => void;
    callBack?: (value?: boolean | any) => void;
    isLoading?: boolean;
}

const AddNoteModalWidget: React.FC<AddNoteModalWidgetTypes> = ({
    isOpen,
    note,
    onOpen,
    callBack = () => { },
}) => {
    const [value, setValue] = useState<any>();
    const { mutateAsync: updateCustomer, isPending } = useUpdateCustomer()
    const navigate = useRouter()
    const onSubmit = () => {
        const DATA = {
            notes: value
        }
        updateCustomer({ payload: DATA, id: note.id }, {
            onSuccess() {
                toast.success(`Customer successfully updated`);
                navigate.push("/customers")
                setValue("")
                callBack()
            },
            onError(error) {
                // @ts-ignore
                Object.keys(error?.response?.data?.errors).forEach((key: string) => toast.error(error?.response?.data?.errors[key] || "Something went wrong"))
            },
        })
    }

    useEffect(() => { setValue(note?.notes) }, [note])
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpen} placement="center" className=" overflow-y-visible">
            <ModalContent className="max-w-[450px] px-4 relative">
                {(onClose) => (
                    <>
                        <ModalHeader className=" left-0 w-full flex justify-center absolute -top-14">
                            <div className="h-[68px] w-[68px] rounded-full bg-white">
                                {note?.profile_picture ? <img src={note?.profile_picture} alt="N/A" className="h-[68px] w-[68px] rounded-full bg-white p-1" /> : null}
                            </div>
                        </ModalHeader>
                        <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0 pt-9">
                            <div className="">
                                <h4 className=" text-sm font-medium text-dark-700 text-center">{note?.name}</h4>
                                <div className="font-medium text-dark-800 text-center">Add Notes</div>
                                <textarea value={value} onChange={(e) => setValue(e.target.value)} className=" appearance-none mt-2 p-2 min-h-[165px] rounded-lg border placeholder:text-xs placeholder:text-gray-180 w-full" placeholder="Type you notes here...">{note?.notes}</textarea>
                            </div>
                        </ModalBody>

                        <ModalFooter className="flex gap-4">
                            <Button className=" w-[86px] !rounded-lg border-1" color="default" variant="bordered" onPress={() => { onClose(); }}>
                                Cancel
                            </Button>
                            <Button isLoading={isPending} type="button" className="bg-blue-gradient text-white w-[86px] !rounded-lg" onPress={onSubmit}>
                                Add
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default AddNoteModalWidget;
