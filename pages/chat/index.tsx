import { ChatParticipant, Conversation } from "types/common";
import React, { FunctionComponent, useEffect } from "react";
import { conversationsState, loadingState } from "atoms/atoms";
import { getSession, useSession } from "next-auth/react";

import ChatView from "components/ChatView/ChatView";
import { GetServerSideProps } from "next";
import Head from "next/head";
import PageHeader from "components/PageHeader/PageHeader";
import { URL } from "utils";
import { getConversationForUser } from "services/chat/getConversations";
import { getUsersByIds } from "services/users/get";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

interface ChatProps {
  conversations: Conversation[];
  conversationsUsers: ChatParticipant[];
}

const Chat: FunctionComponent<ChatProps> = ({
  conversations,
  conversationsUsers,
}) => {
  const setConversationState = useSetRecoilState(conversationsState);

  useEffect(() => {
    setConversationState({
      conversations,
      conversationsUsers,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: URL.LOGIN_PAGE,
        permanent: false,
      },
    };
  }
  const conversations = await getConversationForUser(session.user.id);

  const convesatiationsUsersIds = conversations.map(conv => {
    return conv.participants.filter(id => id !== session?.user.id);
  });
  const conversationsUsers = await getUsersByIds(
    convesatiationsUsersIds.flat()
  );

  return {
    props: {
      conversations,
      conversationsUsers,
    },
  };
};
