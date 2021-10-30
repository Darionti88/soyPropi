import axios from "axios";
import dbConnect from "../../lib/mongodb";
import { getSession, useSession } from "next-auth/client";
import router, { useRouter } from "next/router";
import User from "../../models/User";
import { useEffect } from "react";

function Profile({ user }) {
  // if (!user) return <h1>Loading...</h1>;

  return (
    <h1>
      Este es el Perfil de {user.name} cuyo nombre de perfil es{" "}
      {user.profileName}{" "}
    </h1>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   // const result = await axios.get(`/api/users/6171fa69d25c4a3537b9cc03`);
//   // const users = JSON.parse(JSON.stringify(result));
//   // const users = result.map((doc) => {
//   //   const user = doc.toObject();
//   //   user._id = user._id.toString();
//   //   return user;
//   // });
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//       data: "hola",
//       // users,
//     },
//   };
// }
// export async function getStaticPaths() {
//   return {
//     paths: [
//       // String variant:
//       "/profile/name",
//       // Object variant:
//       { params: { profile: "profileName" } },
//     ],
//     fallback: true,
//   };
// }
export const getStaticProps = async (context) => {
  await dbConnect();
  const { profile } = context.params;
  const singleUser = await User.findOne({ profileName: profile });
  const user = JSON.parse(JSON.stringify(singleUser));
  if (!user) {
    return {
      notFound: true,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Profile;
