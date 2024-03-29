import React, { FunctionComponent } from "react";
import { URL, userDropdownItems } from "../../utils";
import { signOut, useSession } from "next-auth/react";

import Button from "../Button/Button";
import Dropdown from "components/Dropdown/Dropdown";
import { useRouter } from "next/router";

interface NavItemProps {
  label: string;
}

const NavItem: FunctionComponent<NavItemProps> = ({ label }) => {
  const { push, query, pathname } = useRouter();
  const isActive =
    label === "All" && pathname === "/offers"
      ? !query.category
      : query.category === label.toLowerCase();

  const handleNavItemClick = () => {
    push(`/offers${label !== "All" ? `?category=${label.toLowerCase()}` : ""}`);
  };

  return (
    <div
      onClick={handleNavItemClick}
      className={`transition-all ${
        isActive && "bg-yellow_opacity"
      } cursor-pointer px-5 py-2 hover:bg-yellow_opacity rounded-md`}
    >
      <p className="text-yellow text-md ">{label}</p>
    </div>
  );
};

const Navbar: FunctionComponent = () => {
  const { push } = useRouter();
  const { status, data } = useSession();

  return (
    <nav className="w-full py-10 flex items-center justify-between">
      <div className="flex gap-20">
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
          <span className="cursor-pointer">
            HOME<span className="text-yellow">4</span>U
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <NavItem label="All" />
          <NavItem label="Rent" />
          <NavItem label="Sale" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {status === "authenticated" ? (
          <>
            <Dropdown label={data.user?.name ?? ""} items={userDropdownItems} />
            <Button label="Logout" onClick={() => signOut()} />
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
