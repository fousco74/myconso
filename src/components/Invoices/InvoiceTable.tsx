import React from 'react';
import InvoiceTableRows from './InvoiceTableRow';
import InvoiceTableRowGroup from './InvoiceTableRowGroup';
import Image from 'next/image';

interface InvoiceProps {
    dateRange?: string;
    section1Data?: string[];
    section1Value?: string[];
    section2Data?: string[];
    section3Data?: [[string[], string[]], [string[], string[]]];
    section2Value?: string[];
    totalAmount?: string;
    date?: string;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Invoice({
    date,
    dateRange,
    section1Data,
    section1Value,
    section2Value,
    section2Data,
    section3Data,
    totalAmount,
    setToggle
}: InvoiceProps) {
    return (
        <div className="w-full h-full p-4 flex flex-col bg-white  space-y-4 md:space-y-6 relative">
            {/* Bouton de fermeture */}
            <Image 
                src="/icons/close.svg" 
                alt="close-icon" 
                width={20} 
                height={20} 
                className="absolute right-2 top-2 md:right-4 md:top-4 cursor-pointer" 
                onClick={() => setToggle(false)} 
            />

            {/* En-tête */}
            <div className="flex flex-col space-y-1 md:space-y-2 text-midnightblue">
                <h1 className="text-base md:text-lg font-medium">Facture</h1>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
                    <span className="text-xl md:text-2xl font-bold">{date}</span>
                    <span className="text-xs md:text-sm text-gray-600">{dateRange}</span>
                </div>
            </div>

            {/* Première section */}
            <div className="w-full max-md:overflow-x-auto">
                <div className="min-w-[400px] md:min-w-full flex flex-col gap-1">
                    <InvoiceTableRows
                        data={section1Data}
                        bgColor="bg-facturegradient"
                        textColor="text-white"
                        isHeader={true}
                    />
                    <InvoiceTableRows
                        data={section1Value}
                        bgColor="bg-gray-200"
                        textColor="text-midnightblue"
                        isHeader={true}
                    />
                </div>
            </div>

            {/* Deuxième section */}
            <div className="w-full max-md:overflow-x-auto">
                <div className="min-w-[400px] md:min-w-full flex flex-col gap-1">
                    <InvoiceTableRows
                        data={section2Data}
                        bgColor="bg-facturegradient"
                        textColor="text-white"
                        isHeader={true}
                    />
                    <InvoiceTableRows
                        data={section2Value}
                        bgColor="bg-gray-200"
                        textColor="text-midnightblue"
                        isHeader={true}
                    />
                    {section3Data?.map((group, index) => (
                        <InvoiceTableRowGroup
                            key={index}
                            groups={group}
                            bgColor1="bg-facturegradient"
                            bgColor2="bg-gray-200"
                            textColor1="text-white"
                            textColor2="text-midnightblue"
                        />
                    ))}
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-center md:justify-end">
                <div className="flex flex-col items-center gap-1 w-full md:w-auto">
                    <h1 className="text-sm md:text-base">Total à payer Hors Taxe</h1>
                    <div className="text-center bg-facturegradient px-2 py-2 md:py-3 rounded-lg text-white">
                        <span className="text-3xl md:text-5xl">{totalAmount}</span>
                        <span className="text-sm md:text-base"> FCFA</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


