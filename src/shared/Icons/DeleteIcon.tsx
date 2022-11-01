import React from "react";

export interface IProps {
  stroke?: string;
  width?: string | number | undefined;
  height?: string | number | undefined;
  classes?: string;
}

const DeleteIcon: React.FC<IProps> = ({ stroke, width, height, classes }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={classes}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
};

export default DeleteIcon;
