import { FC, ReactNode } from "react";
import Container from "../../atoms/container";
import Flex from "../../atoms/flex";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, title = "Dashboard" }) => {
  return (
    <Container className="py-10">
      <Flex direction="col" directionMd="col" align="start" gap="gap-3" className="xl:pl-32">
        <h1 className="text-4xl font-bold">{title}</h1>
        <Flex className="text-gray-700 text-lg font-medium">
          Dashboard{" "}
          {title === "Dashboard" ? null : (
            <Flex>
              <span>&gt;&gt;</span>
              {title}
            </Flex>
          )}
        </Flex>
      </Flex>
      <main className="mt-10">{children}</main>
    </Container>
  );
};

export default DashboardLayout;
