import React from "react";

export interface BannerProps {
  children: React.ReactNode;
  type: BannerType;
}

export enum BannerType {
  Info,
  Primary,
}

export default function Banner({ children, type }: BannerProps): React.ReactElement {
  if (type === BannerType.Info) {
    return <div className="notification is-info">{children}</div>;
  } else {
    return <div className="notification is-primary">{children}</div>;
  }
}
