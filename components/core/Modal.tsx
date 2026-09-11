'use client';

import { X } from "lucide-react";
import { useState } from "react";

interface ModalProps {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps ){
    if (!open) return null;

    let modalClicked = false;

    const clickOutside = () => {
        if (!modalClicked){
            onClose();
        }
        modalClicked = false;
    }

    const clickInside = () => {
        modalClicked = true;
    }

    return (
        <div 
            className={`fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 ${open ? 'flex' : 'hidden' }`}
            onClick={clickOutside}
        >
            <div 
                className="text-black bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative"
                onClick={clickInside}    
            >
                <div className="flex justify-end">
                    <button onClick={onClose} className="cursor-pointer">
                        <X />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}