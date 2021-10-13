import React, { useState } from "react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";

const TipPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [totalAmount, setTotalAmount] = useState();

  const getPercentage = (percentage, totalNumber) => {
    const totalTip = (percentage / 100) * Number(totalNumber);
    return totalTip.toFixed(2);
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className='container'>
      <h1 className='text-7xl font-bold'>Hola: {username}</h1>
      <div className='flex-col w-screen justify-center items-center'>
        <div className='flex-col justify-center items-center mt-14 w-1/2'>
          <NumberInput
            width={250}
            onChange={(value) => setTotalAmount(value)}
            value={totalAmount}>
            <NumberInputField />
          </NumberInput>
          <ButtonGroup variant='outline' spacing='6' flexDirection='column'>
            <Button width={250} colorScheme='blue'>
              Pagar 10%: {totalAmount ? getPercentage(10, totalAmount) : ""}
            </Button>
            <Button width={250} onClick={() => goHome()} colorScheme='blue'>
              Pagar 20%: {totalAmount ? getPercentage(20, totalAmount) : ""}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default TipPage;
