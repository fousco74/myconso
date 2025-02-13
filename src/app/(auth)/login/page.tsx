import Image from 'next/image'


export default  function Login() {
    return (
        <>
        <div className="w-screen h-screen flex max-lg:flex-col p-0 m-0">
            <div className="lg:w-1/2 max-lg:h-1/2 flex lg:px-16 flex-col relative justify-center lg:p-10 p-4">
                <Image src='logo/logo.svg' alt='logo' className='mb-3' width={280} height={280} />
                <span className='text-deepBlue max-lg:text-[14px]'>L&apos;énergie en toute transparence à portée de<br/>clic. Prenez le contrôle de votre consommation,<br />un kWh à la fois.</span>
                <Image src='icons/Union.svg' alt='logo' className='mb-3 max-lg:hidden absolute bottom-14 right-[-12px] pl-16' width={700} height={700} />

            </div>
            <div className="lg:w-1/2 max-lg:h-screen flex items-center text-center flex-col text-white p-10 bg-connexion">
                    <div className="lg:mt-36">
                        <h2 className='text-2xl font-bold'>Connexion</h2>
                        <h5 className='text-sm mt-6'>Bon retour!<br />Connectez-vous pour avoir accès à<br />votre Dashboard.</h5>
                        <form action="" className='mt-8 space-y-5'>
                                <div className='lg:w-[300px]'>
                                    <input type="text" name='username' placeholder='username' className='px-4 py-2 focus:outline-deepBlue rounded md:w-[300px]'/>
                                </div>
                                <div className='flex flex-col lg:w-[300px]'>
                                    <input type="text" name='password' placeholder='mot de passe' className='px-4 py-2 focus:outline-deepBlue rounded md:w-[300px]'/>
                                    <span className='text-[10px] self-end opacity-85 py-3'>Mot de passe oublié ?</span>
                                </div>
                                <button type="submit" className='px-4 w-full py-1 rounded  bg-white text-deepBlue'>Se connecter</button>
                        </form>
                    </div>
            </div>
        </div>
        </>
    )

    
}


