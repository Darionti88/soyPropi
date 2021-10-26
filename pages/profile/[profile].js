import { getSession, useSession } from "next-auth/client";
import dbConnect from "../../lib/mongodb";
import user from "../../models/user";

function Profile({ data, users }) {
  const [session] = useSession();
  console.log(users);
  return <h1>Hello {users[1].name} from SSR route!</h1>;
}

export async function getServerSideProps(context) {
  await dbConnect();
  const session = await getSession(context);
  const result = await user.find({});
  const users = JSON.parse(JSON.stringify(result));
  console.log(users);
  // const users = result.map((doc) => {
  //   const user = doc.toObject();
  //   user._id = user._id.toString();
  //   return user;
  // });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      data: session && session,
      users,
    },
  };
}

export default Profile;
