import Image from "next/image"; 

export default function Weather(){
    return(
        <div className="w-1/2 bg-white rounded-lg p-2">
                          <div className="flex gap-6">
                                <Image src="/icons/times/clouds.svg" alt="time-icon" width={80} height={80} />
                            <div className="flex flex-col text-[12px]">
                                <div className="flex gap-2 ">
                                  <h3 className="font-bold text-midnightblue text-base">Météo</h3>
                                  <Image src="/icons/weatherBold.svg" alt="time-icon" width={15} height={15} />
                                </div>
                                <div className="flex gap-1">
                                  <h5>Ce temps est susceptible <br />de faire baisser votre <br />consommation !</h5>
                                  <Image src="/icons/info.svg" alt="time-icon" width={15} height={15} className="self-start"/>
                                </div>
                            </div>
                          </div>
                          <div className="flex flex-col px-2">
                            <div className="flex text-midnightblue">
                                  <span className="text-4xl">25°</span>
                                  <span className="text-xl self-center">C</span>
                            </div>
                            <div className="flex gap-2  items-center">
                                <Image src="/icons/weather.svg" alt="time-icon" width={15} height={15} />
                                <span>Nuagueux</span>
                            </div>
                          </div>

                          <hr className="my-2"/>
                          <div className="flex gap-2  items-center text-midnightblue text-opacity-80 px-2">
                                <Image src="/icons/location.svg" alt="time-icon" width={15} height={15} />
                                <span>Abidjan, CI</span>
                          </div>
                          <div className="flex gap-2  items-center text-midnightblue text-opacity-80 px-2">
                                <Image src="/icons/calandar.svg" alt="time-icon" width={15} height={15} />
                                <span>25 Janvier 2025, 10:05</span>
                          </div>

                      </div>
    )
}