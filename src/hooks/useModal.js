import { useState } from "react";
import Modal from "../components/Modal";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalComponent = ({ onSave }) => <Modal isOpen={isOpen} onClose={closeModal} onSave={onSave} />;

  return [ModalComponent, openModal, closeModal];
};

export default useModal;
