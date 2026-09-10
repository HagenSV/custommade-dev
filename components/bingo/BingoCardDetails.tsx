import { BingoCardActions } from "@/logic/bingo/bingo-actions";
import { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import { BingoGameManage } from "@/logic/bingo/bingo-game-manage";
import { BingoRoutes } from "@/logic/bingo/bingo-routes";
import { Edit2, Play, Printer, Share2, Trash } from "lucide-react";
import Link from "next/link";

interface Props {
    card: BingoCardManage;
    deleteFunc: (card: BingoCardManage) => void;
}

const createBingoGame = (card: BingoCardManage, seed: number) => {
    const game = BingoGameManage.createBingoGame(card, seed);
    window.location.href = BingoRoutes.play(game);
}

export default function BingoCardDetails({ card, deleteFunc }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 dark:bg-mist-800">
            <p className="text-xl font-bold">{ card.getData().name }</p>
            <p className="text-sm text-neutral-900 dark:text-neutral-400">Edited { new Date(card.getData().lastModified).toDateString() }</p>
            <div className="flex flex-row justify-center gap-4">
                    
                <Link href={BingoRoutes.edit(card)} className="p-3 hover:text-blue-500"><Edit2 /></Link>
                
                <div className="p-3 hover:text-lime-600">
                    <button onClick={() => createBingoGame(card,Math.round(Math.random()*1000))}><Play /></button>
                </div>
                {/* <div className="p-3 hover:text-slate-500">
                    <Printer />
                </div> */}
                <div className="p-3 hover:text-teal-600">
                    <button
                        onClick={() => BingoCardActions.share?.(card) }
                    >
                        <Share2 />
                    </button>
                </div>
                
                <button onClick={() => deleteFunc(card)} className="p-3 hover:text-red-600"><Trash /></button>
            </div>
        </div>
    )
}