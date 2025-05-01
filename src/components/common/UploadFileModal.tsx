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
import Icon from "./Icon";

export default function UploadFileModal({
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
            <ModalContent className="max-w-[750px] px-4">
                {(onClose) => (
                    <>
                        <ModalHeader className="text-xl font-medium text-dark-800 px-0">
                            <div className="border-b w-full pb-2 border-gray-80">Upload File</div>
                        </ModalHeader>

                        <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0">
                            <label
                                htmlFor="file-upload"
                                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer transition hover:border-primary hover:bg-gray-50"
                            >
                                <Icon name="filePlaceholder" />
                                <p className="text-gray-600 font-medium">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-sm text-gray-400 mt-1">SVG, PNG, JPG or PDF (max. 10MB)</p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                />
                            </label>
                        </ModalBody>


                        <ModalFooter className="flex gap-4">
                            <Button
                                className="bg-blue-gradient text-white rounded-lg h-10 w-[107px]"
                                onPress={() => callBack(file)}
                                isDisabled={!file}
                                isLoading={isLoading}
                            >
                                Upload
                            </Button>
                            <Button
                                color="default"
                                className=" bg-transparent rounded-lg border border-gray-70 text-gray-180 w-[107px]"
                                variant="flat"
                                onPress={() => onClose()}
                            >
                                Cancel
                            </Button>

                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
