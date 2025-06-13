import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

interface NoteModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSubmit: (data: { date: string; note: string }) => void;
}

export default function NoteModal({ isOpen, onOpenChange, onSubmit }: NoteModalProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const date = formData.get("date") as string;
        const note = formData.get("note") as string;
        onSubmit({ date, note });
        onOpenChange(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="text-lg font-semibold">Add Note</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit} id="note-form" className="space-y-4">
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        className="w-full border border-gray-70 rounded px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Note</label>
                                    <textarea
                                        name="note"
                                        rows={4}
                                        required
                                        className="w-full border rounded border-gray-70 px-3 py-2"
                                    />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" form="note-form">
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
