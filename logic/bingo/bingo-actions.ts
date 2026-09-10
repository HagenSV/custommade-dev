import { BingoCardManage } from "./bingo-card-manage";
import { BingoGameManage } from "./bingo-game-manage";
import { BingoRoutes } from "./bingo-routes";

export interface IBingoCardActions {
    edit?: (card: BingoCardManage) => void;
    play?: (card: BingoCardManage, seed: number) => void;
    print?: (card: BingoCardManage) => void;
    share?: (card: BingoCardManage) => void;
}

export const BingoCardActions: IBingoCardActions = {
    edit: (card) => {
        //Save card locally if it is temporary
        card.save();
        window.location.href = BingoRoutes.edit(card);
    },

    play: (card, seed) => {
        const game = BingoGameManage.createBingoGame(card, seed);
        window.location.href = BingoRoutes.play(game);
    },

    share: (card) => {

        async function copyToClipboard() {
        
            try {
                const result = card.export();
                await navigator.clipboard.writeText(result);
                //TODO: notify client
            } catch (e) {
                //TODO: notify client
            }
        }


        copyToClipboard()
    }
}