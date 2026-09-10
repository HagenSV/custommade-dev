'use client';

import BingoCardPreview from "@/components/bingo/BingoCardPreview";
import { BingoCardActions } from "@/logic/bingo/bingo-actions";
import type { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ShareBingoCardClientPage(){
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true)

    const [card, setCard] = useState<BingoCardManage>()

    useEffect( () => {
        const loadClass = async () => {
            const { BingoCardManage } = await import("@/logic/bingo/bingo-card-manage")

            const card = BingoCardManage.import(searchParams);

            if (!card){
                //Todo: Error message
                return;
            }

            setCard(card);
            setLoading(false)
        }

        loadClass();
        
    }, [])

    return (
        <div className="flex flex-col justify-center m-auto">
            <h1 className="text-center">{ card?.getData().name ?? "Custom Bingo Card" }</h1>
            { !loading && 
                <BingoCardPreview 
                    card={card!} 
                    actions={{
                        edit: BingoCardActions.edit,
                        play: BingoCardActions.play
                    }} 
                /> 
            }
        </div>
    )
}