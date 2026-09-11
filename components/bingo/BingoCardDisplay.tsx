import { BingoCardData } from "@/data/bingo"
import { BingoCardManage } from "@/logic/bingo/bingo-card-manage"
import { useMemo } from "react"

interface BingoCardDisplayProps {
    className?: string,
    card: BingoCardData,
    seed: number,
    cellStates: BingoCardCell[]
}

export interface BingoCardCell {
    highlighted: boolean,
    onClick?: () => void
}


export default function BingoCardDisplay({ className, card, seed, cellStates }: BingoCardDisplayProps) {

    if (cellStates.length !== card.rows*card.cols){
        throw new Error("cellStates mismatch with card size");
    }
    
    const rows = useMemo( () => Array.from({ length: card.rows }, (_, i) => i), [ card ] )
    const cols = useMemo( () => Array.from({ length: card.cols }, (_, i) => i), [ card ] )
    const values = useMemo( () => BingoCardManage.generateCardValues(card,seed), [card, seed] )

    const getValue = (row: number, col: number): string => {
        return values[row*card.cols + col]
    }

    const getState = (row: number, col: number): BingoCardCell => {
        return cellStates[row*card.cols + col];
    } 

    return (
        <table className={`hyphens-auto break-all text-xs lg:break-normal lg:text-sm border-collapse border-3 border-color-black w-full table-fixed max-w-150 m-auto ${className}`}>
            <tbody>
            { rows.map( r => (
                <tr key={r}>
                    { cols.map( c => {
                        
                    const state = getState(r,c);
                    const value = getValue(r,c);
                        
                    return (
                        <td key={c} className="border-1">
                            <div 
                                className={`p-1 flex justify-center items-center w-full ${ state.highlighted ? 'bg-yellow-300/30' : '' }`}
                                onClick={ () => state.onClick?.() }
                            >
                            <p className="text-center">{ value }</p>
                            </div>
                        </td>
                    )})}
                </tr>
            )) }
            </tbody>
        </table>
    ) 
}