import React, { ReactNode, useState } from "react";
import Header from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};
