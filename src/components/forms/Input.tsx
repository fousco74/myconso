import { inputProps } from "@/types";

export default function text(props: inputProps){
    return(
        <div className="p-0 w-full rounded flex flex-col text-midnightblue gap-1">
            
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <input
                type={props.type || 'text'}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                className="p-2 py-[0.36rem] outline-none bg-cloudGray w-full border  rounded"
            />
        </div>
    )
}