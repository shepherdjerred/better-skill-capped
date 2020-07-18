import React, { ErrorInfo } from "react";
import { Color, Hero, Size } from "./Hero";

export interface ErrorPageProps {
  children: React.ReactNode;
}

export interface ErrorPageState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorPageProps, ErrorPageState> {
  constructor(props: Readonly<ErrorPageProps>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Hero title="Something went wrong" color={Color.RED} size={Size.FULL_WITH_NAVBAR} />;
    } else {
      return this.props.children;
    }
  }
}
