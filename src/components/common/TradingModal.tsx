"use client";

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";

import React from "react";
import Icon from "./Icon";
import Heading from "./heading";

interface TradingModalTypes {
    modalTile: string,
    data: any
}

const TradingModal: React.FC<TradingModalTypes> = ({ modalTile, data }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    console.log(data)

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
                                            {
                                                data?.map((item: any) => (
                                                    <tr className="text-gray-650 font-medium text-sm border-b border-r-gray-200">
                                                        <td className="text-start py-4">
                                                            <div className="flex items-center gap-1 ">
                                                                <div className="w-8 h-8 p-[3px] !bg-gray-80 flex justify-center items-center">
                                                                    {item?.product_details?.image ? <img src={item?.product_details?.image} alt="image" className="rounded w-full h-full" /> : "N/A"}
                                                                </div>
                                                                <span>{item?.product_details?.model_name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-center">{item?.buyer_name}</td>
                                                        <td className="py-4 text-center">{item?.quantity}</td>
                                                        <td className="py-4 text-center">{item?.purchase_price}</td>
                                                        <td className="py-4 text-center">{item?.sale_price}</td>
                                                        <td className="text-end py-4">{item?.sale_price}</td>
                                                    </tr>
                                                ))}
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
