import React, { useState } from "react";
import { FieldError } from "react-hook-form";

import { ArrowDownIcon } from "../Icons/Icons";
import { capitalizeFirstLetter } from "../../utils";

type ItemValue = string | null;

type Item<T extends ItemValue> = {
  value: T;
  label: string;
};

interface SelectorProps<T extends ItemValue> {
  label: string;
  items: Item<T>[];
  value: T;
  onChange: (value: T) => void;
  error: FieldError | undefined;
}

function Selector<T extends ItemValue>({
  label,
  items,
  value,
  onChange,
  error,
}: SelectorProps<T>) {
  const [showItems, setShowItems] = useState(false);

  const renderSelectorItems = items.map(item => (
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
          className="text-gray-dark my-2 bg-yellow font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          {displaySelectedValue}
          {<ArrowDownIcon />}
        </button>

        <div
          id="selector"
          className={`${
            showItems ? "opacity-1" : "opacity-0"
          } z-10 w-44 bg-white absolute rounded divide-y transition divide-gray-100 shadow dark:bg-gray-700`}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {renderSelectorItems}
          </ul>
        </div>
      </div>
      {error?.message && (
        <p className="text-red font-medium">
          {capitalizeFirstLetter(error.message)}
        </p>
      )}
    </div>
  );
}

export default Selector;
