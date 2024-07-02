import React from "react";
import { Card } from "@mui/material";

export default function Detail({ title, value,unit ,Icon}) {
  return (
    <div>
      <Card className="flex flex-col w-32 h-32 p-2 my-2">
        <div className="text-lg font-bold">{title}</div>
        <Icon className="w-12 h-12 " />
        <div className="my-2">
          <span className="font-bold">{value}</span> {unit}
        </div>
      </Card>
    </div>
  );
}
