import React, { useState } from "react";

import { ArrowDownIcon } from "../Icons/Icons";
import { URL } from "utils";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface DropdownProps {
  label: string;
  items: Array<{ label: string; path: string }>;
}

function Dropdown({ label, items }: DropdownProps) {
  const [showItems, setShowItems] = useState(false);
  const { push } = useRouter();
  const { data } = useSession();

  const itemsForLoggedUser = items
    .map(item => {
      if (item.path !== URL.ADMIN_PANEL) return item;

      if (data?.user.role === "admin") {
        return item;
      } else {
        return null;
      }
    })
    .filter(item => item !== null) as Array<{ label: string; path: string }>;

  const renderDropdownItems = itemsForLoggedUser.map(({ label, path }) => (
    <li
      key={label}
      onClick={() => {
        setShowItems(false);
        push(path);
      }}
    >
      <span className="block cursor-pointer bg-black text-white py-3 px-5 hover:text-yellow">
        {label}
      </span>
    </li>
  ));

  return (
    <div>
      <label
        onClick={() => setShowItems(prevState => !prevState)}
        className="cursor-pointer text-white font-medium text-xl flex items-center"
      >
        {label}
        {<ArrowDownIcon />}
      </label>
      {showItems && (
        <div>
          <div
            id="selector"
            className={`${
              showItems ? "opacity-1" : "opacity-0"
            } z-10 w-44  absolute rounded divide-y transition divide-gray-100 shadow-xl bg-black`}
          >
            <ul className="py-1 text-sm text-gray-700 rounded dark:text-gray-200">
              {renderDropdownItems}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
