interface InvoiceTableRowProps {
    groups: string[][]; // Tableau de groupes de colonnes
    bgColor1?: string; // Couleur de fond des groupes
    bgColor2?: string; // Couleur de fond des groupes
    textColor1?: string; // Couleur du texte
    textColor2?: string; // Couleur du texte

  }
  
  export default function InvoiceTableRow({
    groups,
    bgColor1 = "bg-cloudGray",
    bgColor2 = "bg-cloudGray",
    textColor1 = "text-midnightblue",
    textColor2 = "text-midnightblue",

  }: InvoiceTableRowProps) {
    return (
      <div className="w-full flex gap-3">
        {groups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`flex text-center   justify-between rounded-lg ${groupIndex === 0 ? `w-[30%] text-center  ${bgColor1} ${textColor1}` : `w-[70%] text-center  ${bgColor2} ${textColor2}`}`}
          >
            {group.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`p-2 text-center  ${groupIndex === groups.length - 1 && cellIndex === group.length - 1
                  ? "rounded-r-lg"
                  : ""}`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  