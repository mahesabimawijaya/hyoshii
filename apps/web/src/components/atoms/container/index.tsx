import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
  maxWidthMd?: string;
  maxWidthLg?: string;
  maxWidthXl?: string;
}

const Container: FC<ContainerProps> = ({
  children,
  className = "",
  maxWidth = "max-w-[350px]",
  maxWidthMd = "md:max-w-[750px]",
  maxWidthLg = "lg:max-w-[950px]",
  maxWidthXl = "xl:max-w-screen-xl",
}) => {
  return <div className={`${className} ${maxWidth} ${maxWidthMd} ${maxWidthLg} ${maxWidthXl} mx-auto`}>{children}</div>;
};

export default Container;
