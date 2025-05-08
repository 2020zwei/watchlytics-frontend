"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import Icon from "./common/Icon";

export default function NotificationsModal({
    isOpen,
    onOpen,
    callBack = () => { },
    isLoading = false,
}: {
    isOpen: boolean;
    onOpen: (value: boolean) => void;
    callBack?: (value?: boolean | any) => void;
    isLoading?: boolean;
}) {
    const [file, setFile] = useState<File>()

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpen} placement="center">
            <ModalContent className="max-w-[480px] px-4 !ms-auto -top-20 end-20">
                {(onClose) => (
                    <>
                        <ModalHeader className="pb-3 text-xl font-medium flex flex-col text-dark-800 px-0 border-b border-gray-80">
                            <div className="w-full pb-2">Notifications</div>
                            <div className="text-xs text-gray-180">You have <span className="text-blue-850">3</span> notifications today.</div>
                        </ModalHeader>

                        <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0 pb-4">
                            <div className=" font-normal text-sm text-[#48505E]">Today</div>
                            <div className="flex gap-2">
                                <div className="flex items-center justify-center min-w-9 max-h-9 rounded-full bg-[#003BFF0D] border border-[#003BFF1A]">
                                    <Icon name="bell" stroke="#003BFF" fill="#003BFF"/>
                                </div>
                                <div>
                                    <div className=" font-medium">
                                        <span className="text-blue-850">New Listing Alert:</span>
                                        <span className=" text-dark-800"> Richard Mille RM 011</span>
                                    </div>
                                    <p className="text-sm font-normal text-dark-700 pt-1">
                                        A new listing for the [Brand Name] [Model Name] has been added to our platform. Listed price: [Price]. Check it out now and make an offer before it's gone!
                                    </p>
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

