import users from "@/app/(users)/admin/dashboard/users/page";
import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";
import { Url } from "url";

export interface todoProps{
    id: string,
    name: string
}

export interface itemProps{
    icon: string,
    width?: string,
    name: string,
    isActive?: boolean,
    url?: string,
    user?: userProps|null
}

export interface Index{
  id: number;
  created_at: Date;
  valeur_kw: number;
  compteur_id: number;
  client_id: number;
}

export interface meterCard{
    icon: string,
    subTitle: string,
    title: string,
    color?: string
}

export interface linePieChart{
    title?: string,
    width?: string,
    height?: string,
    yAxis?: number[]
    consommation_fcfa?: number[],
    consommation_kw?: number[],
    dates?: string[],
    consoParPeriode?: object[]
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
    setValue?: Dispatch<SetStateAction<number>>,
    value?: string,
    options: any[];
    label?: string
}

export interface inputProps{
    name: string,
    label?: string,
    setValue?: Dispatch<SetStateAction<string>>,
    value?: string,
    type?: string
    placeholder?: string
}

export interface FormProps {
    width: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
  }


  export interface userProps {
    id: number;
    nom_complet: string;
    email: string;
    mot_de_passe: string;
    client_id: number;
    role_id: number;
    userId: UUID;
    client: {
      id: number;
      type_client: string;
      nom_organisation: string;
      index:[];
      compteur: {
        id: number;
        abonnement: string;
        type_compteur: string;
        client_id: number;
      }[];
      user: {
        id: number;
        email: string;
        nom: string;
        prenoms: string;
        date_naissance: Date;
        role: {
          id: number;
          name: string;
        };
      }[];
      consommation: {
        id: number;
        consommation_kw: number;
        consommation_fcfa: number;
        index_depart_id: number;
        index_fin_id: number;
        compteur_id: number;
        client_id: number;
        created_at: Date;
      }[];
    };
    role: {
      id: number;
      nom: string;
    };
  }
  

  export interface facturesProps {
    dateRange: string;
    date: string;
    section1Data: string[];
    section1Value: any[];
    section2Data: string[];
    section2Value: string[];
    section3Data: [[string[],string[]],[string[],string[]]];
    totalAmount: string;
}

  