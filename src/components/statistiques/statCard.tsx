import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";

interface StatCardProps {
  title: string;
  Column?: number[];
  selectValue: string;
  setSelectValue?: React.Dispatch<React.SetStateAction<string>>;
  chart: number;
  setChart?: React.Dispatch<React.SetStateAction<number>>;
  data: number[];
  dates: string[];
}

/** Composant réutilisable pour afficher les statistiques */
export const StatCard = ({ title, selectValue, setSelectValue, chart, setChart, data, dates, Column }: StatCardProps) => (
  <div className="flex bg-white p-4 rounded-lg justify-end">
    <div className="flex flex-col gap-2">
      <div className="flex justify-between px-5 py-1">
        <span>{title}</span>
      </div>
      <div className="px-4">
        {chart === 1 ? <LineChart yAxis={Column} consommation_kw={data} dates={dates} width="500" height="290" /> : <BarChart consommation_kw={data} dates={dates} width="500" height="290" />}
      </div>
    </div>
  </div>
);