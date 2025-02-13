import InputDate from "./forms/InputDate"


export default function filter({children} : {children?: React.ReactNode}){
    return(
        <div className="flex gap-5 items-center justify-center text-midnightblue">
                                {children}
                                <div className="flex gap-1 justify-center items-center">
                                    <span>Du</span>
                                    <InputDate />
                                </div>
                                <div className="flex gap-1 justify-center items-center">
                                    <span>Au</span>
                                    <InputDate />
                                </div>
                                
                            </div>
    )
}