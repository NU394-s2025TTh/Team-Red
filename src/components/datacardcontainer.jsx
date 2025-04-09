  import React from "react";
  import { DataCard } from "./datacard";

  export function DataCardContainer({userData}) {
    return (
      <div>
        <DataCard name={userData.name} fridgecontents={userData.fridgecontents} />
      </div>
    );
  }
