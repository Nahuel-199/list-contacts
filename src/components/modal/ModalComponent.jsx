import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const ModalComponent = ({ onOpen, isOpen, onClose, children, title }) => {

  return (
    <>
     <div className="inodasd">
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay/>
        <ModalContent >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           {children}
          </ModalBody>
        </ModalContent>
      </Modal>
      </div>
    </>
  );
};

export default ModalComponent;
