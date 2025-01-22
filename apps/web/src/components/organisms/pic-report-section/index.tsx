import { AreaChart } from "@tremor/react";
import { FC } from "react";
import Flex from "../../atoms/flex";
import { useQuery } from "@tanstack/react-query";
import { getPicReport } from "../../../services/axios";

const PicReportSection: FC = () => {
  const { data: pic, isLoading } = useQuery({ queryKey: ["pic-report"], queryFn: getPicReport });

  if (isLoading) return <p>Loading...</p>;
  console.log(pic);

  return (
    <section>
      <Flex direction="col" directionMd="col" align="start" className="w-[360px] md:w-[500px] bg-neutral-50 p-2 md:p-4 border border-neutral-300 rounded-lg">
        <h2 className="text-2xl font-semibold">PIC quantity per hour</h2>
        <AreaChart
          data={pic}
          index="time"
          categories={["Andri", "Indra", "Indri"]}
          colors={["blue", "violet", "emerald"]}
          showYAxis={true}
          showGradient={true}
          startEndOnly={true}
          showAnimation={true}
          curveType="natural"
          padding={{ left: 0, right: 0 }}
          maxValue={140}
          className="w-full h-56 md:h-64"
        />
      </Flex>
    </section>
  );
};

export default PicReportSection;
