"use client";

import Link from "next/link";

type CloseButtonProps = {
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  size?: number;
};

export default function CloseButton({
  onClick,
  href,
  ariaLabel = "Close",
  size = 20,
}: CloseButtonProps) {
  const ButtonContent = (
    <div
      style={{
        width: size,
        height: size,
        outline: "2px solid #1E1E1E",
        outlineOffset: "-1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size / 2}
        height={size / 2}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="1" y1="1" x2="9" y2="9" stroke="#1E1E1E" strokeWidth="2" />
        <line x1="9" y1="1" x2="1" y2="9" stroke="#1E1E1E" strokeWidth="2" />
      </svg>
    </div>
  );

  // navigation close (route-based pages)
  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        style={{
          display: "inline-block",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        {ButtonContent}
      </Link>
    );
  }

  // state close (popup)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      {ButtonContent}
    </button>
  );
}
