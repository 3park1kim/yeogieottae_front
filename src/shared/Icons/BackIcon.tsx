/* eslint-disable react/style-prop-object */
import React from "react";

export interface IProps {
  stroke?: string;
  width?: string | number | undefined;
  height?: string | number | undefined;
  classes?: string;
}
const BackIcon: React.FC<IProps> = ({ stroke, width, height, classes }) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="30.731px"
      height="30.73px"
      viewBox="0 0 60.731 60.73"
      style={{ background: "0 0 60.731 60.73", cursor: "pointer" }}
      xmlSpace="preserve"
    >
      <g>
        <g>
          <polygon points="0,30.365 29.737,60.105 29.737,42.733 60.731,42.729 60.731,18.001 29.737,17.999 29.737,0.625 		" />
        </g>
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};

export default BackIcon;
