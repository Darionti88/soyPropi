import { getSession, useSession } from "next-auth/client";

function Index({ data, users }) {
  const [session] = useSession();
  return <h1>Hello {data.user.name} from SSR route!</h1>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default Index;
