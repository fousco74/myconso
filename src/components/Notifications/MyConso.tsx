import Image from "next/image";


export default function MyConso(){
    return (
        <div className="rounded-xl w-52 h-60 border bg-notif2 flex flex-col p-4 relative">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <h2>Ma conso en chiffres</h2>
                    <Image
                      src="/icons/clock.svg"
                      alt="clock"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>

                <span className="absolute top-16 text-4xl left-8">-10%</span>

                <div className="self-center mt-20 text-[13px] opacity-85 flex flex-col gap-2 relative">
                  <p>
                    Youpi ! votre consommation <br />
                    des 6 derniers mois a baissé !{" "}
                  </p>
                  <p>
                    Vous avez économisé <br />
                    92.350 FCFA.
                  </p>
                </div>
              </div>
    )
}       