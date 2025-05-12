"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import React from "react";


interface AddNoteModalWidgetTypes {
    isOpen: boolean;
    alertText?: string,
    onOpen: (value: boolean) => void;
    callBack?: (value?: boolean | any) => void;
    isLoading?: boolean;
}

const AlertModal: React.FC<AddNoteModalWidgetTypes> = ({
    isOpen,
    onOpen,
    callBack = () => { },
    alertText = "",
    isLoading = false,
}) => {

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpen} placement="center" className=" overflow-y-visible">
            <ModalContent className="max-w-[450px] px-4 relative">
                {(onClose) => (
                    <>
                        <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0 pt-9">
                            <div className="flex items-center justify-center">
                                <svg stroke="currentColor" fill="red" strokeWidth="0" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M13 17.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25-8.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z"></path><path d="M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752Zm3.03.751a1.002 1.002 0 0 0-1.732 0L2.168 19.499A1.002 1.002 0 0 0 3.034 21h17.932a1.002 1.002 0 0 0 .866-1.5L12.866 3.994Z"></path></svg>
                            </div>
                            <div className="text-center text-dark-800">{alertText}</div>
                        </ModalBody>

                        <ModalFooter className="flex gap-4">
                            <Button className=" w-[86px] !rounded-lg border-1" color="default" variant="bordered" onPress={() => { onClose(); }}>
                                Cancel
                            </Button>
                            <Button className="bg-blue-gradient text-white w-[86px] !rounded-lg" onPress={callBack}>
                                Confirm
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default AlertModal;
