import React from 'react';

const DisplayIcon = ({ color = '#636363' }) => {
  return (
    <svg
      className="flex-shrink-0"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Linear / Electronic, Devices / Display">
        <path
          id="Vector"
          d="M2.19458 9C2.19458 6.17157 2.19458 4.75736 3.07326 3.87868C3.95194 3 5.36615 3 8.19458 3H16.1946C19.023 3 20.4372 3 21.3159 3.87868C22.1946 4.75736 22.1946 6.17157 22.1946 9V10C22.1946 12.8284 22.1946 14.2426 21.3159 15.1213C20.4372 16 19.023 16 16.1946 16H8.19458C5.36615 16 3.95194 16 3.07326 15.1213C2.19458 14.2426 2.19458 12.8284 2.19458 10V9Z"
          stroke={color}
          stroke-width="1.5"
        />
        <path
          id="Vector_2"
          d="M12.1946 19V16.5M12.1946 19L18.1946 21M12.1946 19L6.19458 21"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

export default DisplayIcon;
