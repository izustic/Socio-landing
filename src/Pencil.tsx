export function PencilDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="10 20 150 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id="diecut" filterUnits="userSpaceOnUse" x="0" y="40" width="160" height="80">
          <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="grow" />
          <feOffset in="grow" dx="3" dy="4" result="shadowShape" />
          <feFlood floodColor="#24251f" floodOpacity="0.25" />
          <feComposite in2="shadowShape" operator="in" result="shadow" />
          <feFlood floodColor="#fffdf7" />
          <feComposite in2="grow" operator="in" result="sticker" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="sticker" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#diecut)" transform="rotate(-38 80 80)">
        <rect x="10" y="64" width="20" height="32" rx="7" fill="#FFB4C8" stroke="#141218" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="27" y="64" width="15" height="32" fill="#d9d3c6" stroke="#141218" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="42" y="64" width="80" height="32" fill="#FF6F3C" stroke="#141218" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M44 80 H120" stroke="#141218" strokeWidth="2" opacity="0.3" />
        <path d="M122 64 L154 80 L122 96 Z" fill="#F4D3A3" stroke="#141218" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M143 74.5 L154 80 L143 85.5 Z" fill="#141218" />
      </g>
    </svg>
  );
}