import { useState } from "react"


export const useModal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = (data) => {
        setModalData(data);
        setIsModalOpen(true)
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    }

    return {
        handleCloseModal,
        handleOpenModal,
        isModalOpen,
        modalData,
    }
}