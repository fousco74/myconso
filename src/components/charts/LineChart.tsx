import { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { linePieChart } from "@/types";


const LineChart: FC<linePieChart> = (props: linePieChart) => {
  const options: Highcharts.Options = {
    title: { text: "" },
    chart: { 
      ...(props.width && props.height ? { width: props.width, height: props.height } : {width : 700, height: 190}), 
      type: 'line' 
  },
      xAxis: {
      categories: props.dates ?? [], // Utilisation des dates dynamiques
      labels: { style: { fontSize: "12px", color: "#333" } },
    },
    yAxis: {
      tickPositions: props.yAxis ?? [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000],
      labels: {
        style: { fontSize: "12px", color: "#333" },
      },
    },
    series: [
      {
        type: "line",
        data: props.consommation_fcfa ?? props.consommation_kw, // Sécurité si undefined
        color: "#618DB9",
      },
    ],
    legend: { enabled: false }, 
    credits: { enabled: false }, 
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
