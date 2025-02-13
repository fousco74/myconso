"use client"; 

import { linePieChart } from "@/types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FC } from "react";

const LineChart: FC<linePieChart> = (props: linePieChart) => {
  const options: Highcharts.Options = {
    title: {
      text: '' // Désactive le titre
    },
    chart: {      
      height: props.height,
      width: props.width,
      type: "line",
     
    },
    xAxis: {
      categories: ["3 Jan", "6 Jan", "9 Jan", "12 Jan", "15 Jan", "18 Jan", "21 Jan", "24 Jan", "27 Jan", "30 Jan"],
      labels: {
        style: { fontSize: "12px", color: "#333" }, // Taille et couleur du texte
      },
    },
    yAxis: {
      tickPositions: [0, 5, 10, 15, 20], 
      labels: {
        formatter: function () {
          return this.value + "K"; // Ajoute "K" aux valeurs
        },
        style: { fontSize: "12px", color: "#333" },
      },
    },
    series: [
      {
        type: "line",
        data: [10, 15, 9, 12, 5, 11, 15, 2, 14, 18], 
        color: "#618DB9",
      },
    ],
    legend: { enabled: false }, 
    credits: { enabled: false }, 
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
