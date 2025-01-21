import { Link } from "react-router-dom";
import { Button } from "../../atoms/button";
import Flex from "../../atoms/flex";
import DashboardLayout from "../../templates/dashboard-layout";

export default function Home() {
  return (
    <DashboardLayout>
      <Flex justify="justify-end">
        <Link to="/add-pack">
          <Button>Add Record</Button>
        </Link>
      </Flex>
    </DashboardLayout>
  );
}
