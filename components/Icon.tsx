
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: 'brain' | 'telescope' | 'users' | 'target' | 'sparkles' | 'chevron-down' | 'lock';
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'brain':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 19.5v-15A2.5 2.5 0 0 1 8.5 2h1Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h1A2.5 2.5 0 0 0 18 19.5v-15A2.5 2.5 0 0 0 15.5 2h-1Z" /><path d="M6 12h12" />
        </svg>
      );
    case 'telescope':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-1.108l1.318-6.18A.934.934 0 0 1 5 6.013l4.053 4.053a.934.934 0 0 1 .407 1.427Z" /><path d="M15.42 2.13L21.87 8.58" /><path d="m16 2-4.41 4.41" /><path d="m18 4-4.41 4.41" /><path d="m20 6-4.41 4.41" /><path d="M13.83 15.24 10.08 19" /><path d="M19 10.08 15.24 13.83" /><path d="M22 17.5l-1.85-1.85" /><path d="M17.5 22l-1.85-1.85" />
        </svg>
      );
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'target':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12"cy="12" r="2" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8 1.9-4.8 4.8-1.9-4.8-1.9Z" /><path d="M5 21v-4" /><path d="M19 21v-4" /><path d="M21 5h-4" /><path d="M21 19h-4" /><path d="M3 5h4" /><path d="M3 19h4" />
        </svg>
      );
    case 'chevron-down':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6"/></svg>
        );
    case 'lock':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        );
    default:
      return null;
  }
};

export default Icon;
