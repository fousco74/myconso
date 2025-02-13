import { rounded } from "@/types";

export default function rounded(props : rounded){
    return(
        <span className={`p-1 rounded-full bg-${props.color}`}></span>
    )
}