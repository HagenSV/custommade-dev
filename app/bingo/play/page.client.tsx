'use client';

import InteractiveBingoCard from "@/components/bingo/InteractiveBingoCard";
import { BingoGameManage } from "@/logic/bingo/bingo-game-manage";
import { BingoRoutes } from "@/logic/bingo/bingo-routes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlayBingoClientPage(){
    const searchParams = useSearchParams();
    
    const [loading, setLoading] = useState(true)
    
    const [game, setGame] = useState<BingoGameManage>()

    useEffect( () => {
        const currentId = searchParams.get("game")

        if (!currentId){
            window.location.href = BingoRoutes.home();
            return;
        }

        const game = BingoGameManage.loadBingoGame(currentId);

        if (!game){
            //Todo: Error message
            return;
        }

        setGame(game);
        setLoading(false)
    }, [])

    return (
        <div className="flex flex-col justify-center m-auto">
            <h1 className="text-center">{game?.getData().name ?? "Bingo Game"}</h1>
            { !game && !loading && <p>Failed to load bingo game</p> }
            {game && <InteractiveBingoCard game={game}/> } 
        </div>
    )
}