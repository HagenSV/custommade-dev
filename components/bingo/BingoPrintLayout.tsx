'use client';

import { BingoCardManage } from "@/logic/bingo/bingo-card-manage"
import { useEffect, useMemo, useState } from "react";
import BingoCardDisplay from "./BingoCardDisplay";

interface PrintLayoutProps {
    card: BingoCardManage,
    startingSeed: number,
    count: number,
    countPerPage: number,
}

export default function BingoPrintLayout({ card, startingSeed, count, countPerPage }: PrintLayoutProps ){

    const [cardHash, setCardHash] = useState("");

    useEffect(() => {
        async function fetchData() {
            const result = await card.getHash();
            setCardHash(result);
        }
        fetchData();

    }, []);

    const cards = useMemo( () => Array.from({ length: count }, (_, i) => i), [count]);
    const pages = useMemo( 
        () => Array.from(
            { length: Math.ceil(count/countPerPage) }, 
            (_, i) => cards.slice(i*countPerPage,(i+1)*countPerPage)),
        [ count, countPerPage ]
    )
    const cardStates = useMemo( () => {
        const { rows, cols } = card.getData();
        const size = rows*cols;

        return Array.from({ length: size }, _ => ({ highlighted: false }))
    }, [card])

    //Assumes portrait layout
    //TODO: differentiate landscape & portrait layout
    const cardSize = useMemo( () => {
        const rowSpan = countPerPage > 1 ? 'row-span-1' : 'row-span-2';
        const colSpan = countPerPage > 2 ? 'col-span-1' : 'col-span-2';

        return `${rowSpan} ${colSpan}`;
    }, [ countPerPage ]);

    return (
        <div>
            { pages.map( (cards, idx) => 
                <div key={idx} className={`grid grid-cols-2 grid-rows-2 gap-5 w-[100vw] h-[100vh] break-inside-avoid break-before-page break-after-page`}>
                    { cards.map( cardNo => {
                        const seed = startingSeed + cardNo;
                        return (
                            <div key={cardNo} className={`${cardSize} flex flex-col`}>
                                <h1 className="text-center !text-xxl !m-0">{card.getData().name}</h1>
                                <div className="flex flex-grow">
                                <BingoCardDisplay 
                                    card={card.getData()}
                                    seed={seed}
                                    cellStates={cardStates}
                                    className="h-full !max-w-500 !w-full !text-lg"
                                />
                                </div>
                                <p className="text-xs !m-0">Card {cardHash}, No {seed}</p>
                            </div>
                        )
                    } ) }
                </div>
            ) }
        </div>
    )
}