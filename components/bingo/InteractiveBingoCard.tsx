'use client';

import { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import type { BingoGameManage } from "@/logic/bingo/bingo-game-manage";
import { useEffect, useMemo, useState } from "react";
import BingoCardDisplay, { BingoCardCell } from "./BingoCardDisplay";

interface Props {
    game: BingoGameManage,
}

export default function InteractiveBingoCard({ game }: Props){

    const card = useMemo( () => game.getData().card, [ game ] )
    const seed = useMemo( () => game.getData().seed, [ game ] )

    const [cellStates, setCellStates] = useState<BingoCardCell[]>([])
    const updateCellStates = () => {
        const { rows, cols } = game.getData().card

        const size = rows*cols;

        const states = Array.from({ length: size }, (_, i) => {
            const row = Math.floor(i/cols);
            const col = i % cols

            return {
                highlighted: isHighlighted(row, col),
                onClick: () => toggleCell(row, col)
            }
        })

        setCellStates(states);
    }

    useEffect( () => {
        updateCellStates();
    }, [])


    const clearHighlighted = () => {
        game.clearHighlights();
        updateCellStates();
    }

    const toggleCell = (row: number, col: number): void => {
        game.toggleCell(row,col);
        updateCellStates();
    }

    const isHighlighted = (row: number, col: number): boolean => {
        return game.isHighlighed(row, col);
    }

    return (
        <div>
        { cellStates.length !== 0 && 
            <BingoCardDisplay 
                className="aspect-square md:aspect-3/2"
                card={card}
                seed={seed}
                cellStates={cellStates}
            />
        }
        <div className="flex flex-row justify-center items-center mt-5">
        <button 
            className="px-4 py-2 rounded-xl bg-violet-700 text-white"
            onClick={() => clearHighlighted()}>Clear</button>
        </div>
        </div>
    ) 
}