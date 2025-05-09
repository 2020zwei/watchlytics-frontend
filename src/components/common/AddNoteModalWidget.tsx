"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter, Button } from "@heroui/react";

import React from "react";
import Icon from "./Icon";
import Heading from "./heading";

interface AddNoteModalWidgetTypes {
    isOpen: boolean;
    onOpen: (value: boolean) => void;
    callBack?: (value?: boolean | any) => void;
    isLoading?: boolean;
}

const AddNoteModalWidget: React.FC<AddNoteModalWidgetTypes> = ({
    isOpen,
    onOpen,
    callBack = () => { },
    isLoading = false,
}) => {

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpen} placement="center" className=" overflow-y-visible">
            <ModalContent className="max-w-[450px] px-4 relative">
                {(onClose) => (
                    <>
                        <ModalHeader className=" left-0 w-full flex justify-center absolute -top-14">
                            <img src="" alt="" className="h-[68px] w-[68px] rounded-full bg-white p-1" />
                        </ModalHeader>
                        <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0 pt-9">
                            <div className="">
                                <h4 className=" text-sm font-medium text-dark-700 text-center">Carter Press</h4>
                                <div className="font-medium text-dark-800 text-center">Add Notes</div>
                                <textarea className=" appearance-none mt-2 p-2 min-h-[165px] rounded-lg border placeholder:text-xs placeholder:text-gray-180 w-full" placeholder="Type you notes here..."></textarea>
                            </div>
                        </ModalBody>

                        <ModalFooter className="flex gap-4">
                            <Button className=" w-[86px] !rounded-lg border-1" color="default" variant="bordered" onPress={() => { onClose(); }}>
                                Cancel
                            </Button>
                            <Button className="bg-blue-gradient text-white w-[86px] !rounded-lg" onPress={onClose}>
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
