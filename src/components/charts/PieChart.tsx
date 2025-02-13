"use client";

import { linePieChart } from "@/types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FC } from "react";

const PieChart: FC<linePieChart> = (props: linePieChart) => {
  const options: Highcharts.Options = {
    title: {
      text: '' // Désactive le titre
    },
    chart: {
      height: props.height,
      width: props.width,
      type: "pie", // Type de graphique en secteurs
    },
    series: [
      {
        type: "pie",
        data: [
          { name: "Catégorie 1", y: 40, color: "#618DB9" },
          { name: "Catégorie 2", y: 30, color: "#7CB5EC" },
          { name: "Catégorie 3", y: 20, color: "#434348" },
          { name: "Catégorie 4", y: 10, color: "#90ED7D" },
        ], // Données pour le graphique en secteurs
      },
    ],
    legend: { enabled: false }, // Désactive la légende
    credits: { enabled: false }, // Désactive les crédits
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;