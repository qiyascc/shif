import PropTypes from "prop-types";

const TelegramLogo = ({fill}) => {
  return (
    <>
      <svg
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.40081 13.8217C10.7321 10.5965 20.2195 6.66421 21.5291 6.11996C24.9643 4.69546 26.0184 4.96846 25.4928 8.12313C25.1154 10.3905 24.0263 17.8975 23.1583 22.57C22.6432 25.3408 21.4876 25.6692 19.6706 24.4705C18.7967 23.8935 14.3861 20.9769 13.4289 20.292C12.5551 19.6679 11.3499 18.9171 12.8613 17.4384C13.3991 16.9116 16.9248 13.5452 19.6717 10.9249C20.0316 10.5807 19.5796 10.0155 19.1642 10.2914C15.4618 12.7466 10.3285 16.1545 9.67514 16.5984C8.68814 17.2686 7.74022 17.576 6.03864 17.0872C4.75297 16.718 3.49706 16.2775 3.00822 16.1095C1.12581 15.4632 1.57264 14.6261 3.40081 13.8217Z"
          fill={fill}
        />
      </svg>
    </>
  );
};


TelegramLogo.propTypes = {
  fill: PropTypes.string,
};

export default TelegramLogo;
