import * as React from "react";

const Footer: React.FunctionComponent = () => {
  return (
    <div className="text-white py-7 flex items-center w-full justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="w-5 h-5 stroke-yellow"
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
      <div className="h-7 border border-gray-400 mx-5"></div>
      <span>© {new Date().getFullYear()}</span>
    </div>
  );
};

export default Footer;
