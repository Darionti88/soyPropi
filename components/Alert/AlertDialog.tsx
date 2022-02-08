import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogFooter,
} from "@chakra-ui/react";

const AlertError = ({ errorMessage, isOpen, onClose, cancelRef, status }) => {
  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader
          className={`text-gray-500 font-hind ${
            status === "error" ? "bg-red-100" : "bg-green-100"
          } `}>
          {status === "error" ? `Oops! Algo salió mal` : "Genial !"}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody className='text-2xl font-hind'>
          {errorMessage}
        </AlertDialogBody>
        <AlertDialogFooter className='text-md font-hind'>
          {status === "error" &&
            "Probá de nuevo. Si el error persiste probá desloguearte y loguearte."}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertError;
