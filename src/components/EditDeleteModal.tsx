import { useState } from 'react';
import ButtonBlue from '@/components/ButtonBlue';
import Image from 'next/image';

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}

export default function ModalWithContentBlur({setIsOpen, children, title}: ModalProps) {


  return (
    <div className="min-h-screen ">

      {/* Modal */}
     
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay semi-transparent (optionnel si vous utilisez le flou sur le contenu principal) */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Contenu de la modal */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 max-w-fit">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <Image src="/icons/close.svg" alt="close-icon" width={20} height={20} className="absolute right-4 top-4 cursor-pointer" onClick={() => setIsOpen(false)} />
            {children}
           
          </div>
        </div>

    </div>
  );
}
