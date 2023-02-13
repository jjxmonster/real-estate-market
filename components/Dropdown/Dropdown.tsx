import React, { useState } from "react";
import { FieldError } from "react-hook-form";

import { ArrowDownIcon } from "../Icons/Icons";
import { useRouter } from "next/router";

interface DropdownProps {
  label: string;
  items: Array<{ label: string; path: string }>;
}

function Dropdown({ label, items }: DropdownProps) {
  const [showItems, setShowItems] = useState(false);
  const { push } = useRouter();

  const renderDropdownItems = items.map(({ label, path }) => (
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
      <div>
        <div
          id="selector"
          className={`${
            showItems ? "opacity-1" : "opacity-0"
          } z-10 w-44  absolute rounded divide-y transition divide-gray-100 shadow-xl bg-black`}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {renderDropdownItems}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
