'use client';

import { useState } from "react";
import FilledButton from "../core/FilledButton";
import StyledInput from "../core/StyledInput";
import { usePrintService } from "@/context/print-service";
import BingoPrintLayout from "./BingoPrintLayout";
import { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import { useModalService } from "@/context/modal-service";

interface Props {
    card: BingoCardManage
    modalId: string
}

export default function BingoPrintOptions({ card, modalId }: Props){
    const printService = usePrintService();
    const modalService = useModalService();

    const [ count, setCount ] = useState(1);
    const [ countPerPage, setCountPerPage ] = useState(1);

    const close = () => {
        modalService.closeModal(modalId);
    }

    const print = () => {
        printService.print(
            <BingoPrintLayout 
                card={card} 
                count={count}
                startingSeed={Math.floor(Math.random()*1000)} 
                countPerPage={countPerPage}
            />
        )
    }

    return <div className="flex flex-col gap-4 m-1">
        
        <div>
            <label htmlFor="count">Count</label>
            <StyledInput 
                id="count"
                type="number"
                min={1}
                max={50}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
            />
        </div>     

        <div>
            <p>Cards Per Page</p>
            <div className="flex flex-row gap-4">
                <div>
                    <input
                        value={1}
                        id="layout1"
                        type="radio"
                        name="layout"
                        checked={countPerPage == 1}
                        onChange={() => setCountPerPage(1)}
                    />
                    <label htmlFor="layout1">1</label>
                    <div className="border grid grid-cols-1 w-30 aspect-[19/22] p-1">
                        <div className="bg-zinc-400 w-full h-full"></div>
                    </div>
                </div>

                <div>
                    <input 
                        value={2}
                        id="layout2"
                        type="radio"
                        name="layout"
                        checked={countPerPage == 2}
                        onChange={() => setCountPerPage(2)}
                    />
                    <label htmlFor="layout2">2</label>
                    <div className="border grid grid-cols-1 gap-2 w-30 aspect-[19/22] p-1">
                        <div className="bg-zinc-400 w-full"></div>
                        <div className="bg-zinc-400 w-full"></div>
                    </div>
                </div>

                <div>
                    <input 
                        value={4}
                        id="layout4"
                        type="radio"
                        name="layout"
                        checked={countPerPage == 4}
                        onChange={e => setCountPerPage(4)}
                    />
                    <label htmlFor="layout4">4</label>
                    <div className="border grid grid-cols-2 gap-2 w-30 aspect-[19/22] p-1">
                        <div className="bg-zinc-400 w-full h-full"></div>
                        <div className="bg-zinc-400 w-full h-full"></div>
                        <div className="bg-zinc-400 w-full h-full"></div>
                        <div className="bg-zinc-400 w-full h-full"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-row gap-5 justify-end">
            <FilledButton onClick={close} className="!text-black !bg-gray-300 hover:!bg-gray-400">
                Cancel
            </FilledButton>

            <FilledButton onClick={print}>
                Print
            </FilledButton>
        </div>

    </div>
}