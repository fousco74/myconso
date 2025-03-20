interface InvoiceRowProps {
  data: string[]; // Les données de chaque ligne
  bgColor?: string; // Couleur de fond dynamique
  textColor?: string; // Couleur du texte dynamique
  isHeader?: boolean; // Définit si c'est une ligne d'en-tête
}

export default function InvoiceRow({
  data,
  bgColor = "bg-facturegradient",
  textColor = "text-white",
}: InvoiceRowProps) {
  return (
    <div className={`flex text-center  ${bgColor} ${textColor} rounded-lg w-full`}>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex-1 p-2 ${index === 0 ? "rounded-l-lg" : ""} ${
            index === data.length - 1 ? "rounded-r-lg" : ""
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
