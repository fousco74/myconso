"use client";

import { linePieChart } from "@/types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FC } from "react";

const PieChart: FC<linePieChart> = ({ height, width, consoParPeriode, title }) => {

   // Fonction pour attribuer une couleur en fonction du nom de la période
    const colors = {
      "fév-avr": "#0E3151",
      "avr-juin": "#2A527A",
      "juin-août": "#436E9D",
      "août-oct": "#6B779A",
      "oct-déc": "#9F7E8D",
      "déc-fév": "#E1877D",
    };

  // Vérifier si consoParPeriode est défini et s'il contient des données valides
  const data = consoParPeriode && consoParPeriode.length > 0
    ? consoParPeriode.map((periode) => ({
        name: periode.name,
        y: periode.percentage,
        color: colors[periode.name], // Une fonction pour attribuer une couleur en fonction de la catégorie
      }))
    : [
        { name: "Catégorie 1", y: 40, color: "#618DB9" },
        { name: "Catégorie 2", y: 30, color: "#7CB5EC" },
        { name: "Catégorie 3", y: 20, color: "#434348" },
        { name: "Catégorie 4", y: 10, color: "#90ED7D" },
      ]; // Valeur par défaut si aucune donnée n'est passée

 

  const options: Highcharts.Options = {
    title: {
      text: title ?? "",
    },
    chart: {
      height: height,
      width: width,
      type: "pie", // Type de graphique en secteurs
    },
    series: [
      {
        type: "pie",
        data: data, // Données dynamiques pour le graphique
      },
    ],
    legend: { enabled: false }, // Désactive la légende
    credits: { enabled: false }, // Désactive les crédits
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
