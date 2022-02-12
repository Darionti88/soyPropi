import React, { FC } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const DisclaimerModal: FC<ModalProps> = ({ onClose, isOpen }) => {
  return (
    <Modal
      isCentered
      size='md'
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Propi</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
          dignissimos consectetur officia in, mollitia harum odit minus quae
          sequi. Commodi vel voluptate, porro nam sunt possimus voluptatum et
          repudiandae tempore quas fuga pariatur inventore aliquam, aut
          necessitatibus autem qui. Labore, deleniti! Maiores reprehenderit nisi
          aliquid eum itaque tempore architecto, possimus atque necessitatibus
          magni illo quis nihil sunt, maxime sit. Est quisquam id totam fugiat
          ut cum culpa architecto nam, debitis pariatur earum praesentium sunt
          rem. Odio placeat dignissimos laudantium libero.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DisclaimerModal;
