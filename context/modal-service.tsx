'use client';

import Modal from "@/components/core/Modal";
import { removeAll } from "@/logic/shared/list-utilities";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    ReactElement,
} from "react";


type RenderModalContents = (id: string) => ReactElement

interface ModalContextValue {
    openModal: (renderContents: RenderModalContents) => void;
    closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

interface Modal {
    id: string,
    render: RenderModalContents
}

export function ModalService({ children }: ModalProviderProps) {

    const [openModals, setOpenModals] = useState<Modal[]>([]);

    const openModal = (render: RenderModalContents) => {
        const id = crypto.randomUUID()

        setOpenModals(modals => [...modals, { id, render }])

        return id;
    }

    const closeModal = (id: string) => {
        setOpenModals(modals => removeAll(modals, x => x.id === id) )
    }

    return (
        <ModalContext.Provider
            value={{
                openModal,
                closeModal,
            }}
        >
            {children}
            { openModals.map( modal => (
                <Modal key={modal.id} open={true} onClose={() => closeModal(modal.id)}>
                    {modal.render(modal.id)}
                </Modal>
            )) }

        </ModalContext.Provider>
    );
}

export function useModalService() {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModalProvider must be used within a ModalProvider");
    }

    return context;
}