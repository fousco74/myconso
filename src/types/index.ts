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
    options:any[];
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


  export interface userProps {
    id: number;
    nom: string;
    prenoms: string;
    date_naissance: Date;
    email: string;
    mot_de_passe: string;
    client_id: number;
    role_id: number;
    client: {
      id: number;
      type_client: string;
      nom_organisation: string;
      compteur: {
        id: number;
        abonnement: string;
        type_compteur: string;
        client_id: number;
      }[];
    };
    role: {
      id: number;
      nom: string;
    };
  }
  