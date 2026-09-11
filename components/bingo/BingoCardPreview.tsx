import SeededRng from "@/logic/shared/seeded-rng";
import { useMemo, useState } from "react";
import StyledInput from "../core/StyledInput";
import { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import { Dice1, Dices, Edit2, Play, Printer, Share2 } from "lucide-react";
import { IBingoCardActions } from "@/logic/bingo/bingo-actions";
import BingoCardDisplay from "./BingoCardDisplay";

interface Props {
    card: BingoCardManage,
    initialSeed?: number,
    actions?: IBingoCardActions
}

export default function BingoCardPreview({ card, initialSeed, actions }: Props) {

    const [ seed, setSeed ] = useState(initialSeed ?? Math.floor(Math.random() * 10000))
    
    const cellStates = useMemo( () => {
        const { rows, cols } = card.getData()

        const size = rows*cols;

        return Array.from({ length: size }, _ => ({ highlighted: false }))

    }, [ card ])

    return (
        <div>
            <div className="flex flex-row gap-5 items-center mb-5">
                <StyledInput
                    name="seed"
                    type="number"
                    value={seed}
                    onChange={e => setSeed(parseInt(e.target.value))}
                />
                <button
                    className="rounded p-2 border hover:text-yellow-300 hover:rotate-360"
                
                    onClick={() => setSeed(Math.round(Math.random()*10000))}>
                    <Dices />
                </button>
            </div>

        <BingoCardDisplay 
            className="aspect-square md:aspect-3/2"
            card={card.getData()}
            seed={seed}
            cellStates={cellStates}
        />
        <div className="flex flex-row justify-around mt-10">
            { actions?.edit &&
                <button 
                    className="rounded p-2 border"
                    onClick={() => actions.edit?.(card)}><Edit2 /></button>
            }
            { actions?.play &&
                <button 
                    className="rounded p-2 border"
                    onClick={() => actions.play?.(card,seed)}><Play /></button>
            }
            { actions?.print &&
                <button 
                    className="rounded p-2 border"
                    onClick={() => actions.print?.(card)}><Printer /></button>
            }
            { actions?.share &&
                <button
                    className="rounded p-2 border"
                    onClick={() => actions.share?.(card)}><Share2 /></button>
            }
        </div>
        </div>
    ) 
}