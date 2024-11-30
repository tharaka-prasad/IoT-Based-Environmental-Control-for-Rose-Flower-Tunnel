import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <path d="M100 20
           C 60 20, 20 60, 50 100
           C 20 140, 60 180, 100 160
           C 140 180, 180 140, 150 100
           C 180 60, 140 20, 100 20"
        fill="#ff4d4d" stroke="darkred" stroke-width="2"/>

  <path d="M100 40
           C 80 40, 40 80, 60 100
           C 40 120, 80 140, 100 130
           C 120 140, 160 120, 140 100
           C 160 80, 120 40, 100 40"
        fill="#ff6666" stroke="darkred" stroke-width="2"/>

  <circle cx="100" cy="100" r="15" fill="darkred" />

  <path d="M100 130
           C 95 160, 105 160, 100 200"
        stroke="green" stroke-width="4" fill="none"/>

  <path d="M100 160
           C 80 170, 80 190, 100 180
           C 120 190, 120 170, 100 160"
        fill="green" stroke="darkgreen" stroke-width="2"/>
</svg>
    );
}
