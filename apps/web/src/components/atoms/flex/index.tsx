import { FC, ReactNode } from "react";

interface FlexProps {
  children: ReactNode;
  className?: string;
  direction?: "row" | "col";
  directionMd?: "row" | "col";
  align?: string;
  justify?: string;
  gap?: string;
}

const Flex: FC<FlexProps> = ({ children, className = "", direction = "row", directionMd = "row", align = "items-center", justify = "justify-start", gap = "gap-4" }) => {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  const directionMdClass = directionMd === "row" ? "md:flex-row" : "md:flex-col";

  return <div className={`flex ${directionClass} ${directionMdClass} ${align} ${justify} ${gap} ${className}`}>{children}</div>;
};

export default Flex;
