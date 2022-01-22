import { useEffect, useState } from "react";

import { useRouter } from "next/router";

const feedbackOptions = ["approved", "pending", "rejected"];

function Feedback({ data }) {
  const router = useRouter();
  const status = router.query("status");
  console.log(status);
  return (
    <>
      <div className='container mx-auto  h-screen items-center flex justify-center flex-col'></div>
    </>
  );
}

// export async function getStaticProps(context) {
//   await dbConnect();
//   const profileName = context.params.profile;
//   const singleUser = await User.findOne({ profileName: profileName });
//   if (!singleUser) {
//     return { notFound: true };
//   }
//   const user = JSON.parse(JSON.stringify(singleUser));
//   return {
//     props: { data: user },
//   };
// }

export async function getStaticPaths() {
  const paths = feedbackOptions.map((opt) => ({
    params: { feedback: opt },
  }));
  return { paths, fallback: "blocking" };
}

export default Profile;
