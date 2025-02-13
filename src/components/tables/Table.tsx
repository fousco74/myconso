
import Tr from "@/components/tables/Tr";

export default function Table({children} : {children?: React.ReactNode}){
    return (
        <div className="flex flex-col gap-6  mb-4 w-full bg-white py-4 px-8 right-3 rounded-lg  ">
                <div className="flex justify-between text-midnightblue">
                    {children}
                </div>
                <table className="rounded-lg border-collapse border-spacing-1 text-midnightblue">
                    <thead>
                    <tr>
                        <th className="text-start px-5">Index</th>
                        <th className="text-start px-5">Date</th>
                        <th className="text-start">Heure</th>
                    </tr>
                    </thead>
                    <tbody>
                        <Tr />
                        <Tr />
                        <Tr />
                        <Tr />
                        <Tr />
                        <Tr />
                        <Tr />
                        <Tr />
                    </tbody>
                </table>
            </div>
    )
}