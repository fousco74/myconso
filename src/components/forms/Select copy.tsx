import { Select } from "@/types"

export default function select(props : Select){
    return (
        <div className="flex flex-col gap-1">
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
        <select
            name={props.name}
            id={props.name}
            className={`text-deepBlue  cursor-pointer bg-cloudGray outline-none   ${props.width || 'max-w-fit rounded-full p-2'}`}
            >
                {props.options.map((item) =>(
                    <option key={item.name} value="">{item.name}</option>
                ))}
        </select>
        </div>
    )
}