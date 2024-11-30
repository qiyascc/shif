import PropTypes from "prop-types";

const ErrorMessage = ({ value, className }) => {
  return (
    <p
      className={`flex items-center gap-1 mt-2 text-error text-[14px] leading-none ${className}`}
    >
      <svg
        className="shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clipPath="url(#clip0_553_12015)">
          <path
            d="M2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8Z"
            stroke="#FF3B30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6V8.66667"
            stroke="#FF3B30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 10.6667V10.6734"
            stroke="#FF3B30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_553_12015">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {value}
    </p>
  );
};

ErrorMessage.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ErrorMessage;