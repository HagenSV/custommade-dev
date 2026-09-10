import { StoredItem } from "@/logic/shared/localstorage-api";

export interface BingoCardData extends StoredItem {
    name: string;
    rows: number;
    cols: number;
    hasFreeSpace: boolean;
    freeSpaceText: string;
    values: string[];
    theme: string;
}

export interface BingoGameData extends StoredItem {
    name: string;
    card: Omit<BingoCardData, keyof StoredItem>;
    highlightedSpaces: number;
    seed: number;
}