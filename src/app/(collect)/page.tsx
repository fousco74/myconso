import Image from "next/image";
import ButtonBlue from "@/components/ButtonBlue";
import IndexTracker from "@/components/Index/IndexTracker";
import Select from "@/components/forms/Select";
import InputDate from "@/components/forms/InputDate";
import Tr from "@/components/tables/Tr";


export default function home() {
  return (
   <>
    <div className="flex flex-col my-4 w-full bg-white py-5 right-3 rounded-lg ">
        <IndexTracker class="absolute w-64 right-44 shadow-sm top-48" />
      <div className="flex px-8 gap-3">
        <h1>L’Index du jour</h1>
        <Image src="icons/index.svg" alt="index-icon" width={25} height={25} />
      </div>
      <div className="flex justify-center items-center px-20">
        <div className="my-3 bg-index h-64 w-full flex justify-center items-center ">
          <div className="mt-4">
            <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col w-full">
                <label htmlFor="valeur">Index</label>
                <input
                    type="text"
                    name=""
                    id="valeur"
                    placeholder="Entrer l'index"
                    className="p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                />
                </div>
              <div className="flex justify-between gap-4">

                <div className="flex flex-col">
                  <label htmlFor="valeur">Heure</label>
                  <div className="flex gap-1  w-[90px]">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="10"
                      className="w-1/2 p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                    />
                    :
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="30"
                      className="w-1/2 p-2 outline-none bg-deepBlue bg-opacity-5 rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[150px]">
                  <label htmlFor="valeur">Date</label>
                 <InputDate />
                </div>
              </div>
              <ButtonBlue icon="recorded" name="Enregistrer" />
            </form>
          </div>
        </div>
      </div>
    </div>


    <div className="flex flex-col gap-6 my-4 w-full bg-white py-4 px-8 right-3 rounded-lg  ">
        <div className="flex justify-between">
            <div className="flex  gap-3 items-center">
                <h1>Liste Index </h1>
                <Image src="icons/index.svg" alt="index-icon" width={25} height={25} />
            </div>
            <div className="flex gap-5 items-center justify-center text-midnightblue">
                <Image src="icons/filter.svg" alt="filter-icon" width={25} height={25} className="cursor-pointer" />
                <Select name="date" options={[{
                    name: "Cette semaine"
                }]} />
                <div className="flex gap-1 justify-center items-center">
                    <span>Du</span>
                    <InputDate />
                </div>
                <div className="flex gap-1 justify-center items-center">
                    <span>Au</span>
                    <InputDate />
                </div> 
            </div>
        </div>
        <table className="rounded-lg border-separate border-spacing-1">
            <thead>
            <tr>
                <th className="text-start px-5">Index</th>
                <th className="text-start px-5">Date</th>
                <th className="text-start">Heure</th>
            </tr>
            </thead>
            <tbody>
                <Tr />
                <Tr />
                <Tr />
                <Tr />
                <Tr />
                <Tr />
                <Tr />
                <Tr />
            </tbody>
        </table>
    </div>
   </>
  );
}
