import React, { useEffect, useState } from "react";

import Button from "components/Button/Button";
import Conversation from "components/Conversation/Conversation";
import ConversationList from "components/ConversationsList/ConversationList";
import Head from "next/head";
import InputComponent from "components/InputComponent/InputComponent";
import PageHeader from "components/PageHeader/PageHeader";
import { URL } from "utils";
import { loadingState } from "atoms/atoms";
import supabase from "services/supabase";
import useConversations from "hooks/useConversations";
import useMessages from "hooks/useMessages";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";

const Chat = () => {
  const { data } = useSession();
  const [text, setText] = useState("");
  const { push } = useRouter();

  const conversations = useConversations(data?.user.id as string);
  const messages = useMessages("123");

  const handleCreateMessage = async () => {
    console.log(text);
    const res = await supabase.from("messages").insert([
      {
        text,
        author: data?.user.id,
        conversation_id: conversations[0].id,
      },
    ]);
  };

  const setLoadingState = useSetRecoilState(loadingState);

  // const conversations = useConversations()
  const { status } = useSession();

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

        <div className="flex">
          <ConversationList />
          <Conversation conversationId="" />
        </div>
      </div>
    </>
  );
};

export default Chat;
