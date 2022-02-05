import { useRouter } from "next/router";
import Success from "../../components/feedback/Success";
import SuccessImage from "../../assets/images/feedbackImages/success.svg";
import FailureImage from "../../assets/images/feedbackImages/failure.svg";
import PendingImage from "../../assets/images/feedbackImages/pending.svg";
import { useEffect } from "react";

function Feedback() {
  const { query } = useRouter();
  const router = useRouter();

  useEffect(() => {
    const redirect = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(redirect);
  });

  const paymentText = {
    success: "Tu Pago fue Exitoso! Muchas Gracias",
    failure: "Ups! Algo Salió Mal. Por favor intentá más tarde",
    pending: "Tu pago se está procesando",
  };

  const status = query.status;

  switch (status) {
    case "approved":
      return <Success image={SuccessImage} text={paymentText.success} />;
      break;
    case "failure":
      return <Success image={FailureImage} text={paymentText.failure} />;
      break;
    case "pending":
      return <Success image={PendingImage} text={paymentText.pending} />;
      break;
    default:
      return <Success image={PendingImage} text={paymentText.pending} />;
      break;
  }
}

export default Feedback;
