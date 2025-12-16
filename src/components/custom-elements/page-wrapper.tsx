import React from "react";

interface Props {
  children?: React.ReactNode;
}

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="w-full min-h-full bg-[var(--card)] rounded-xl border-1 border-[var(--border)] shadow-xs p-4 animation-fade-in">
      {children}
    </div>
  );
};

export default PageWrapper;
