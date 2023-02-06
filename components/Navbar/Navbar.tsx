import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";

import Button from "../Button/Button";
import { URL } from "../../utils";
import { useSession } from "next-auth/react";

const Navbar: FunctionComponent = () => {
  const { push } = useRouter();
  const session = useSession();
  return (
    <nav className="w-full py-10 flex items-center cursor-pointer justify-between">
      <h1
        className="text-white flex items-center font-bold text-3xl relative"
        onClick={() => push(URL.HOME_PAGE)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-12 stroke-yellow"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span>
          HOME<span className="text-yellow">4</span>U
        </span>
      </h1>
      <div className="flex items-center gap-4">
        {session.status === "authenticated" ? (
          <>
            <p className="text-white text-xl">{session.data.user?.name}</p>
            <Button label="Logout" onClick={() => push("/")} />
          </>
        ) : (
          <>
            <Button label="Register" onClick={() => push(URL.REGISTER_PAGE)} />
            <Button
              label="Sign In"
              onClick={() => push(URL.LOGIN_PAGE)}
              type="secondary"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
