import { AreaChart } from "@tremor/react";
import { FC } from "react";
import Flex from "../../atoms/flex";
import { useQuery } from "@tanstack/react-query";
import { getQtyReport } from "../../../services/axios";

const QuantityReportSection: FC = () => {
  const { data: qty, isLoading } = useQuery({ queryKey: ["qty-report"], queryFn: getQtyReport });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <Flex direction="col" directionMd="col" align="start" className="w-[360px] md:w-[500px] bg-neutral-50 p-2 md:p-4 border border-neutral-300 rounded-lg">
        <h2 className="text-2xl font-semibold">Quantity per hour</h2>
        <AreaChart
          data={qty}
          index="time"
          categories={["QtyA", "QtyB", "QtyC"]}
          colors={["blue", "violet", "emerald"]}
          showYAxis={true}
          showGradient={true}
          startEndOnly={true}
          showAnimation={true}
          curveType="natural"
          padding={{ left: 0, right: 0 }}
          className="w-full h-56 md:h-64"
        />
      </Flex>
    </section>
  );
};

export default QuantityReportSection;
