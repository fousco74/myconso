import { Url } from "url";

export interface todoProps{
    id: string,
    name: string
}

export interface itemProps{
    icon: string,
    width?: string,
    name: string,
    url?: string
}


export interface meterCard{
    icon: string,
    subTitle: string,
    title: string,
    color?: string
}

export interface linePieChart{
    width?: string,
    height?: string
}

export interface ProgressBarProps {
  progress: number; 
  height?: string; 
}

export interface rounded{
    color: string
}

export interface Select {
    name?: string,
    width?: string,
    options: {
        name: string,
    }[];
    label?: string
}

export interface inputProps{
    name: string,
    label?: string,
    type?: string
    placeholder?: string
}

export interface FormProps {
    width: string;
    children: React.ReactNode;
  }
