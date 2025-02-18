import { useState } from 'react';

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export default function ModalWithContentBlur({setIsOpen, message}: ModalProps) {


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
          <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Titre de la Modal</h2>
            <p className="mb-4">{message}</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Fermer
            </button>
          </div>
        </div>

    </div>
  );
}
