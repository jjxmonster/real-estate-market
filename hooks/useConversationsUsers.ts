import { useEffect, useState } from "react";

const useConversationsUsers = (
  usersIDs: Array<string>
): Array<{ name: string; id: string }> => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`/api/users?ids=${usersIDs.join(",")}`, {
        method: "GET",
      });
      const data = await response.json();

      setUsers(data.users);
    };

    if (usersIDs.length) {
      getUsers();
    }
  }, []);

  return users;
};

export default useConversationsUsers;
