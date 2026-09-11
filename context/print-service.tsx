'use client';

import {
    createContext,
    useContext,
    useState,
    ReactNode,
    ReactElement,
    useEffect,
} from "react";


interface PrintContextValue {
    print: (contents: ReactElement) => void;
}

const PrintContext = createContext<PrintContextValue | undefined>(undefined);

interface PrintProviderProps {
    children: ReactNode;
}

export function PrintService({ children }: PrintProviderProps) {

    const [ printContents, setPrintContents ] = useState<ReactElement | null>(null);

    useEffect( () => {
        window.addEventListener('afterprint', disablePrintMode);
        return () => window.removeEventListener('afterprint', disablePrintMode)
    }, []);

    useEffect( () => {
        if (!printContents){
            return;
        }
        window.print();

    }, [ printContents ])


    const print = (contents: ReactElement) => {
        setPrintContents(contents);
    }

    const disablePrintMode = () => {
        setPrintContents(null);
    }

    return (
        <PrintContext.Provider
            value={{
                print,
            }}
        >
            <div className={`${printContents ? 'print:hidden' : ''}`}>
                { children }
            </div>
            <div className="print:block">
                { printContents }
            </div>

        </PrintContext.Provider>
    );
}

export function usePrintService() {
    const context = useContext(PrintContext);

    if (!context) {
        throw new Error("usePrintService must be used within a PrintProvider");
    }

    return context;
}