import React, { useState } from "react";

import { ApartmentCategory } from "../../types/common";

type ItemValue = string | null;

type Item<T extends ItemValue> = {
  value: T;
  label: string;
};

interface DropdownProps<T extends ItemValue> {
  label: string;
  items: Item<T>[];
  value: T;
  onChange: (value: T) => void;
}

function Dropdown<T extends ItemValue>({
  label,
  items,
  value,
  onChange,
}: DropdownProps<T>) {
  const [showItems, setShowItems] = useState(false);

  const renderDropdownItems = items.map(item => (
    <li
      key={item.value}
      onClick={() => {
        setShowItems(false);
        onChange(item.value);
      }}
    >
      <span className="block cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        {item.label}
      </span>
    </li>
  ));

  const displaySelectedValue = value
    ? items.find(item => item.value === value)?.label
    : `Choose ${label}`;

  return (
    <div>
      <label className="text-white font-medium text-xl">{label}</label>
      <div>
        <button
          onClick={() => setShowItems(prevState => !prevState)}
          className="text-gray-dark mt-2 bg-yellow font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          {displaySelectedValue}
          <svg
            className="ml-2 w-4 h-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          id="dropdown"
          className={`${
            showItems ? "opacity-1" : "opacity-0"
          } z-10 w-44 bg-white rounded divide-y transition divide-gray-100 shadow dark:bg-gray-700`}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            {renderDropdownItems}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
