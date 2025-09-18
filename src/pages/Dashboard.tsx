import React, { useEffect, useState } from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { FirebaseService } from "@/lib/firebase/firebase";

export const Dashboard: React.FC = () => {
  const firebaseService = new FirebaseService("alerts");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [datas, setDatas] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const datass = await firebaseService.getAll();
      setDatas(datass);
    };

    fetchData();

    return () => {
      // Cleanup if necessary
      setDatas([]);
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* <SectionCards /> */}
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={datas} />
          </div>
        </div>
      </div>
    </>
  );
};
