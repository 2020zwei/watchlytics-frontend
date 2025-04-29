"use client";

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";

import React from "react";
import Icon from "./Icon";
import Heading from "./heading";

interface TradingModalTypes {
    modalTile: string,
    data: []
}

const TradingModal: React.FC<TradingModalTypes> = ({ modalTile, data }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <button onClick={onOpen}><Icon name='filledEye' size="1.3rem" /></button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent className="max-w-[750px] px-4">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-xl font-medium text-dark-800 px-0">
                                <Heading className="border-b border-r-gray-200 w-full pb-2 border-gray-80">{modalTile}</Heading>
                            </ModalHeader>
                            <ModalBody className="max-h-[calc(100vh-200px)] gap-6 overflow-y-auto px-0 py-0">
                                <div className="">
                                    <table className="w-full">
                                        <thead className=" border-b border-r-gray-200">
                                            <tr className=" text-dark-800 font-medium text-sm">
                                                <th className="px-0 text-start pb-4">Watch Name</th>
                                                <th className="px-0 pb-4">Buyer Name</th>
                                                <th className="px-0 pb-4">Quantity</th>
                                                <th className="px-0 pb-4">Purchase Price</th>
                                                <th className="px-0 pb-4">Price Per Piece</th>
                                                <th className="px-0 pb-4 text-end">Sale Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-gray-650 font-medium text-sm border-b border-r-gray-200">
                                                <td className="text-start py-4">
                                                    <div className="flex items-center">
                                                        <div>image</div>
                                                        <span>Panerai</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">Carter Press</td>
                                                <td className="py-4">05</td>
                                                <td className="py-4">$72,700</td>
                                                <td className="py-4">$14,540</td>
                                                <td className="text-end py-4">$15,840</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ModalBody>

                            {/* <ModalFooter className="flex gap-4">
                                <Button color="primary" onPress={onClose}>
                                    Add
                                </Button>
                                <Button color="default" variant="flat" onPress={() => { onClose(); }}>
                                    Cancel
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default TradingModal;
