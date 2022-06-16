import { useMutation, useApolloClient } from "@apollo/client";

import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useAuth = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const [authenticate] = useMutation(LOGIN, {
    onError: (error) => {
      console.error("login mutation error:", error);
    },
  });

  const signIn = async (username, password) => {
    const { data } = await authenticate({
      variables: { credentials: { username, password } },
    });
    //console.log("authenticate data", data);
    await authStorage.setAccessToken(data.authenticate.accessToken);
    await client.resetStore();

    //const check = await authStorage.getAccessToken();
    //console.log("check", check);
    // const check2 = await getCurrentUser();
    // console.log("check2", check2);
    //return data;
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
  };

  return { signIn, signOut };
};

export default useAuth;
