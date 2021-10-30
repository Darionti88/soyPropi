import { getSession, useSession } from "next-auth/client";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";

function EditProfile({ data }) {
  return (
    <h1>
      Acá podés {data.name}editar tu Perfil llamado : {data.profileName} y
      agregar tu cuenta MP
    </h1>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const singleUser = await User.findOne({ _id: session.user.id });
    const user = JSON.parse(JSON.stringify(singleUser));
    return {
      props: {
        data: user,
      },
    };
  }
}

export default EditProfile;
