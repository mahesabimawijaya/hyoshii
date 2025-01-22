import { Link } from "react-router-dom";
import { Button } from "../../atoms/button";
import Flex from "../../atoms/flex";
import DashboardLayout from "../../templates/dashboard-layout";
import PicReportSection from "../../organisms/pic-report-section";
import QuantityReportSection from "../../organisms/quantity-report-section";
import PicProductivitySection from "../../organisms/pic-productivity-section";
import QtyRatioReportsSection from "../../organisms/qty-ratio-reports-section";
import RejectRatioReports from "../../organisms/reject-ratio-report";

export default function Home() {
  return (
    <DashboardLayout>
      <Flex direction="col" directionMd="col" gap="gap-10">
        <Flex justify="justify-end xl:pr-32" className="w-full">
          <Link to="/add-pack">
            <Button>Add Record</Button>
          </Link>
        </Flex>
        <Flex direction="col" directionMd="row" justify="justify-center" gap="gap-10">
          <PicReportSection />
          <QuantityReportSection />
        </Flex>
        <Flex direction="col" directionMd="row" justify="justify-center" gap="gap-10">
          <PicProductivitySection />
          <QtyRatioReportsSection />
        </Flex>
        <RejectRatioReports />
      </Flex>
    </DashboardLayout>
  );
}
