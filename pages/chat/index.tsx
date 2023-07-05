import React, { useEffect, useState } from "react";

import Button from "components/Button/Button";
import Head from "next/head";
import InputComponent from "components/InputComponent/InputComponent";
import PageHeader from "components/PageHeader/PageHeader";
import supabase from "services/supabase";
import useConversations from "hooks/useConversations";
import { useSession } from "next-auth/react";

const Chat = () => {
  const { data } = useSession();
  const conversations = useConversations(data?.user.id as string);
  const [text, setText] = useState("");

  const handleCreateMessage = async () => {
    console.log(text);
    const res = await supabase.from("messages").insert([
      {
        text,
        author: data?.user.id,
        conversation_id: conversations[0].id,
      },
    ]);

    console.log(res);
  };

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

        <div>
          <input
            type="text"
            onChange={e => {
              setText(e.target.value);
            }}
          />
          <Button type="primary" label="Send" onClick={handleCreateMessage} />
        </div>
      </div>
    </>
  );
};

export default Chat;
