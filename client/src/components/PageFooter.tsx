import { ReactNode } from "react";

export const PageFooter = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "90%",
        padding: 20,
      }}
    >
      {children}
    </div>
  );
};
