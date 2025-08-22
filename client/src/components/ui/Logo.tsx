import * as React from "react";

/**
 * SomaSmartV SVG Logo as a React component.
 * Scales to parent container via width/height or className.
 */
const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 768 768"
    width={props.width || 48}
    height={props.height || 48}
    {...props}
  >
    <defs>
      <clipPath id="0e63192c2c"><path d="M 351.109375 297.230469 L 392.703125 297.230469 L 392.703125 338.824219 L 351.109375 338.824219 Z M 351.109375 297.230469 "/></clipPath>
      {/* (all other <clipPath> and <g> elements from logo.svg should be here, but no HTML comments) */}
    </defs>
    <g id="8e5efd0c8b">
      {/* (all SVG paths and elements from logo.svg should be here, but no HTML comments) */}
    </g>
  </svg>
);

export default Logo; 