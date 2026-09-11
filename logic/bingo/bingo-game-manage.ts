'use client';

import { BingoGameData } from "@/data/bingo";
import { BingoCardManage, DEFAULT_CARD_VALUES } from "./bingo-card-manage";
import LocalStorage from "../shared/localstorage-api";

const bingoGameStorage = new LocalStorage<BingoGameData>(
    "/bingo/games",
    {
        highlightedSpaces: 0,
        card: DEFAULT_CARD_VALUES,
        name: DEFAULT_CARD_VALUES.name + " Game",
        seed: 0
    }
)

export class BingoGameManage {

    private constructor(
        private gameData: BingoGameData, 
    ) {
        //Save changes
        if (!gameData.id){
            throw new Error("Card is missing a valid ID!")
        }

        if (!gameData.highlightedSpaces){
            gameData.highlightedSpaces = 0;
            this.save();
        }
    }

    static listBingoGameIds(): string[] {
        return bingoGameStorage.getIds();
    }

    static createBingoGame(card: BingoCardManage, seed: number){
        const newGame = bingoGameStorage.create();

        newGame.card = card.getData();
        newGame.name = card.getData().name + " Game";
        newGame.seed = seed;

        bingoGameStorage.update(newGame);

        return new BingoGameManage(newGame);
    }

    static loadBingoGame(id: string): BingoGameManage | null {
        const gameData = bingoGameStorage.load(id);
        if (!gameData){ return null; }
        return new BingoGameManage(gameData);
    }

    getData(): BingoGameData {
        return {
            ...this.gameData
        };
    }

    isHighlighed(row: number, col: number){
        const cellId = row*this.gameData.card.cols + col;

        return (this.gameData.highlightedSpaces % (2**(cellId+1))) >= 2**(cellId)
    }

    clearHighlights(){
        this.gameData.highlightedSpaces = 0

        this.update();
    }

    toggleCell(row: number, col: number){
        const cellId = row*this.gameData.card.cols + col;

        const cell = (2**cellId) * (this.isHighlighed(row, col) ? -1 : 1)
        this.gameData.highlightedSpaces += cell

        this.update();
    }

    update(){
        bingoGameStorage.update(this.gameData);
    }

    save(){
        bingoGameStorage.save(this.gameData);
    }

    delete(){
        bingoGameStorage.delete(this.gameData.id);
    }

    export(): string {
        return bingoGameStorage.share(this.gameData);
    }

    static import(params: URLSearchParams) {
        const gameData = bingoGameStorage.import(params);
        return new BingoGameManage(gameData);
    }
}