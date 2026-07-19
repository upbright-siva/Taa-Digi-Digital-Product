import React from "react";

export type IconName =
  | "clock"
  | "dollar"
  | "lightning"
  | "edit"
  | "sliders"
  | "folder"
  | "download"
  | "check"
  | "sparkle"
  | "arrowCheck"
  | "flag"
  | "calendar"
  | "tag"
  | "target"
  | "cart"
  | "shield"
  | "checkSmall";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 22, className }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "dollar":
      return (
        <svg {...common}>
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "lightning":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M4 21v-7M4 10V3M12 21v-11M12 6V3M20 21v-5M20 12V3M1 14h6M9 6h6M17 16h6" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m9 12 2 2 4-4M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="m2 20 3-8 5-6 4 4-6 5-6 5ZM17 3l4 4-3 3-4-4Z" />
        </svg>
      );
    case "arrowCheck":
      return (
        <svg {...common}>
          <path d="M18 6 7 17l-5-5M18 13v6M13 6h8" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M3 11 18 4l-3 15-5-6-6-2Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20.6 12.6 12 21.2 2.8 12 4 4l8-1.2 8.6 8.6a2 2 0 0 1 0 1.2Z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r=".5" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        </svg>
      );
    case "checkSmall":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    default:
      return null;
  }
}
