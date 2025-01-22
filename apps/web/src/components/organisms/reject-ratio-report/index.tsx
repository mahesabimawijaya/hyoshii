import { BarChart } from "@tremor/react";
import { FC } from "react";
import Flex from "../../atoms/flex";
import { useQuery } from "@tanstack/react-query";
import useQueryStrings from "../../../hooks/useQuery";
import { getRejectRatioReport } from "../../../services/axios";
import { useUpdateQueryParams } from "../../../hooks/useUpdateQuery";

const RejectRatioReports: FC = () => {
  const query = useQueryStrings();
  const type = query.get("reject") ?? "hour";
  const { data: reject, isLoading } = useQuery({ queryKey: ["reject-ratio-report", type], queryFn: () => getRejectRatioReport(type) });
  const updateQuery = useUpdateQueryParams();

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <Flex direction="col" directionMd="col" align="start" className="w-[360px] md:w-[500px] bg-neutral-50 p-2 md:p-4 border border-neutral-300 rounded-lg">
        <Flex justify="justify-between">
          <h2 className="text-2xl font-semibold">Gross to reject ratio</h2>
          <select onChange={(e) => updateQuery("/", { reject: e.target.value })} className="p-2 border border-neutral-300 rounded-md">
            <option value="" hidden>
              Hour
            </option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
          </select>
        </Flex>
        <BarChart
          data={reject}
          index="time"
          categories={["reject"]}
          colors={["blue"]}
          showYAxis={true}
          startEndOnly={true}
          showAnimation={true}
          showLegend={false}
          padding={{ left: 0, right: 0 }}
          className="w-full h-56 md:h-64"
        />
      </Flex>
    </section>
  );
};

export default RejectRatioReports;
