import React, { ReactNode } from "react";
import { Header } from "@/components/Header/Header";

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};
