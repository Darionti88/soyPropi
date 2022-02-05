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

const AlertError = ({ errorMessage, error, onClose, cancelRef }) => {
  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={error}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader className=' text-gray-500 font-hind'>
          Oops! Algo salió mal
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody className='text-2xl font-hind'>
          {errorMessage}
        </AlertDialogBody>
        <AlertDialogFooter className='text-md font-hind'>
          Probá de nuevo. Si el error persiste probá desloguearte y loguearte.
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertError;
