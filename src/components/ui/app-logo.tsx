import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path clipRule="evenodd" d="M24 4L42 14V34L24 44L6 34V14L24 4Z" fill="currentColor" fillOpacity="0.2" fillRule="evenodd"></path>
        <path clipRule="evenodd" d="M24 8L38 16V32L24 40L10 32V16L24 8Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
  );
}
