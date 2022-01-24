import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import Success from "../../components/feedback/Success";
import Failure from "../../components/feedback/Failure";

function Feedback() {
  const { query } = useRouter();

  if (query.status === "approved") {
    return <Success status={query.status} />;
  }
  if (query.status === "failure") {
    return <Failure status={query.status} />;
  } else return <Success status={query.status} />;
}

export default Feedback;
