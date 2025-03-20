"use client";
import { Select } from "@/types";

export default function SelectComponent(props: Select) {
  return (
    <div className="flex flex-col gap-1">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <select
        defaultValue={props.value}
        name={props.name}
        id={props.name}
        onChange={(e) => props.setValue!(e.target.value)}
        className={`text-deepBlue cursor-pointer bg-cloudGray outline-none ${props.width || "max-w-fit rounded-full p-2"}`}
      >
        {props.label && <option value="">{`Veuillez sélectionner un ${props.label}`}</option>}
        {props.options?.map((item) => (
          <option key={item.name || item.id} value={item.value || item.id}>
            {item.name || item.type_compteur}
          </option>
        ))}
      </select>
    </div>
  );
}
