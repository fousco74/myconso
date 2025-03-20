import { FormProps } from "@/types";

export default function form(props: FormProps){
    return (
        <form onSubmit={props.onSubmit} className={`flex flex-col gap-4 ${props.width || 'w-full'}`}>
        <div className="flex flex-col gap-4">
            {props.children}
        </div>
    </form>
    )
}