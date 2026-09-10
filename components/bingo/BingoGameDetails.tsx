import { BingoGameManage } from "@/logic/bingo/bingo-game-manage";
import { BingoRoutes } from "@/logic/bingo/bingo-routes";
import { Play, Share2, Trash } from "lucide-react";
import Link from "next/link";

interface Props {
    game: BingoGameManage;
    deleteFunc: (card: BingoGameManage) => void;
}

export default function BingoGameDetails({ game, deleteFunc }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 dark:bg-mist-800">
            <p className="text-xl font-bold">{ game.getData().name }</p>
            <p className="text-sm text-neutral-900 dark:text-neutral-400">Card No. {game.getData().seed}</p>
            <p className="text-sm text-neutral-900 dark:text-neutral-400">Last Played { new Date(game.getData().lastModified).toDateString() }</p>
            <div className="flex flex-row justify-center gap-4">
                                    
                <div className="p-3 hover:text-lime-600">
                    <Link href={BingoRoutes.play(game)}><Play /></Link>
                </div>
                <div className="p-3 hover:text-teal-600">
                    <Share2 />
                </div>
                
                <button onClick={() => deleteFunc(game)} className="p-3 hover:text-red-600"><Trash /></button>
            </div>
        </div>
    )
}