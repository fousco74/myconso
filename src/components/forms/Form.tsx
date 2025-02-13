import { FormProps } from "@/types";

export default function form(props: FormProps){
    return (
        <form action="" className={`${props.width}`}>
        <div className="flex flex-col gap-4">
            {props.children}
        </div>
    </form>
    )
}