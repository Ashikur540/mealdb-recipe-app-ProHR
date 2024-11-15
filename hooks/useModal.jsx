import { useState, useCallback } from "react";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = useCallback((data) => {
        setModalData(data);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setModalData(null);
    }, []);

    return {
        handleCloseModal,
        handleOpenModal,
        isModalOpen,
        modalData,
    };
};
