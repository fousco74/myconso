import Image from "next/image";


export default function tr(){
    return (
        <tr className="border space-x-0 bg-white shadow-sm hover:bg-cloudGray">
                        <td className="p-2 border-y  border-l rounded-sm">
                            <span>1.</span>
                            <span>1,684,442</span>
                        </td>
                        <td className="p-2 border-y">
                            10/01/2025
                        </td>
                        <td  className="p-2 border-y">
                            10:30
                        </td>
                        <td className="flex gap-3 p-2 border-y border-r rounded-sm justify-end">
                            <Image src="/icons/edit.svg" alt="edit" width={20} height={20} />
                            <Image src="/icons/delete.svg" alt="delete" width={20} height={20} />
                        </td>
                    </tr>
    )
}