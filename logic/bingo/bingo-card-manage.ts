'use client';

import { generateShareParams, importData } from "../shared/compress";
import { BingoCardData } from "@/data/bingo";
import SeededRng from "../shared/seeded-rng";
import LocalStorage from "../shared/localstorage-api";

//Card limits
//Rows & Cols 3-7
//Bingo cells 30-50 chars
//100 values max

export class BingoCardManage {

    static readonly localStorage = new LocalStorage<BingoCardData>(
        "/bingo/cards",
        {
            name: "Custom Bingo Card",
            rows: 5,
            cols: 5,
            hasFreeSpace: true,
            freeSpaceText: "Free",
            values: [],
            theme: "",
        }
    )

    private constructor(
        private cardData: BingoCardData, 
        private temporary: boolean = false //tracks if the card was loaded in as temporary data from an import
    ) { }

    getData(): BingoCardData {
        return {
            ...this.cardData
        };
    }

    generateCardValues(seed: number){
        return BingoCardManage.generateCardValues(this.cardData,seed);
    }

    async getHash(): Promise<string> {
        const length = 12;

        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(this.cardData.values))
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = new Uint8Array(hashBuffer);
        
        // Convert to Base62
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[hashArray[i] % 62];
        }
        return result;
    }

    updateData(data: Partial<Omit<BingoCardData, "id" | "lastModified">>) {
        this.cardData = {
            ...this.cardData,
            ...data
        }

        this.cardData.lastModified = Date.now();

        BingoCardManage.localStorage.update(this.cardData)
    }

    export(): string {
        return BingoCardManage.localStorage.share(this.cardData);
    }

    save(){
        if (this.temporary){
            //Add card to list
            const newTemplate = BingoCardManage.localStorage.create();
            this.cardData.id = newTemplate.id;
 
            this.temporary = false
        }

        BingoCardManage.localStorage.save(this.cardData);
    }

    delete(){
        BingoCardManage.localStorage.delete(this.cardData.id);        
    }

    static importBingoCard(shareParams: URLSearchParams): BingoCardManage {
        const cardData = importData<BingoCardData>(shareParams);
        if (!cardData){
            throw new Error("Failed to import bingo card");
        }

        return new BingoCardManage(cardData, true);
    }

    static generateCardValues(cardData: BingoCardData, seed: number): string[] {
        const { rows, cols, hasFreeSpace, freeSpaceText } = cardData;

        const rng = new SeededRng(seed);
        
        //Copy values
        const pool = cardData.values.map(x => x)
        const vals = []
        for (let i = 0; i < rows*cols; i++){

            //Insert free space
            if (
                hasFreeSpace &&
                i % rows == Math.floor(cols / 2) &&
                Math.floor(i / rows) == Math.floor(cols / 2)
            ){
                vals.push(freeSpaceText);
                continue;
            }

            //If there is not enough values to fill the card fill the space with empty string
            if (pool.length == 0){
                vals.push("");
                continue;
            }

            //Get value for cell
            const nextIdx = rng.next(0, pool.length)
            vals.push(...pool.splice(nextIdx,1))
        }
        return vals;
    }

    static listBingoCardIds(): string[] {
        return this.localStorage.getIds();
    }

    static createBingoCard(){
        return this.localStorage.create()
    }

    static loadBingoCard(id: string): BingoCardManage | null {
        const cardData = this.localStorage.load(id);

        if (!cardData) return null;

        return new BingoCardManage(cardData);
    }
}