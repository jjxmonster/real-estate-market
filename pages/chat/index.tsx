import React, { useEffect } from "react";

import ChatView from "components/ChatView/ChatView";
import Head from "next/head";
import PageHeader from "components/PageHeader/PageHeader";
import { URL } from "utils";
import { loadingState } from "atoms/atoms";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";

const Chat = () => {
  const { push } = useRouter();
  const { status } = useSession();
  const setLoadingState = useSetRecoilState(loadingState);

  useEffect(() => {
    setLoadingState({ isLoading: false, message: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    setLoadingState({ isLoading: true, message: "Loading..." });

    return null;
  } else if (status === "unauthenticated") {
    setLoadingState({ isLoading: true, message: "Redirecting..." });

    setTimeout(() => {
      setLoadingState({ isLoading: false, message: "" });

      push(URL.HOME_PAGE);
    }, 1000);

    return null;
  }

  return (
    <>
      <Head>
        <title>HOME4U | Conversations</title>
      </Head>
      <div>
        <PageHeader
          title="Conversations"
          description="Your Conversations with other users"
        />
        <ChatView />
      </div>
    </>
  );
};

export default Chat;
