import Image from 'next/image';
import { useState } from 'react';

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  success?: boolean;
  setSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalWithContentBlur({setIsOpen, message, success, setMessage, setSuccess}: ModalProps) {


  return (
    <div className="min-h-screen ">

      {/* Modal */}
     
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay semi-transparent (optionnel si vous utilisez le flou sur le contenu principal) */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() =>{
              setSuccess(false);
              setMessage("");
              setIsOpen(false);
              
            }}
          ></div>

          {/* Contenu de la modal */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-11/12 max-w-md flex flex-col justify-center items-center">
          <Image src="/icons/close.svg" alt="close-icon" width={20} height={20} className="absolute right-4 top-4 cursor-pointer" onClick={() => setIsOpen(false)} />
          
            <p className="mb-4 px-4 text-nowrap text-[13px]">{message}.</p>
{ success ?  <Image src="/icons/success.svg" alt="success" width={200} height={200}  />
 : <Image src="/icons/error.svg" alt="success" width={200} height={200}  />
}            
          </div>
        </div>

    </div>
  );
}
