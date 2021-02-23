import React from "react";

export interface BannerProps {
  children: React.ReactNode;
}

export default function Banner({ children }: BannerProps) {
  return <div className="notification">{children}</div>;
}
