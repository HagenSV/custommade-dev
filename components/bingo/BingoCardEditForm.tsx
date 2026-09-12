'use client';

import { BingoCardData } from "@/data/bingo";
import { BINGO_CARD_CONFIG, BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import { useState } from "react";
import BingoCardPreview from "./BingoCardPreview";
import StyledInput from "../core/StyledInput";
import { X } from "lucide-react";
import { BingoCardActions } from "@/logic/bingo/bingo-actions";

interface BingoCardFormProps {
    card: BingoCardManage;
}

export default function BingoCardEditForm({
    card
}: BingoCardFormProps) {

    const [ data, setData ] = useState(card.getData())

    function update<K extends keyof BingoCardData>(
        key: K,
        newValue: BingoCardData[K]
    ) {
        card.updateData({
            [key]: newValue,
        });

        setData(card.getData());
    }

    function updateValues(index: number, text: string) {
        const values = [...data.values];
        values[index] = text;
        update("values", values);
    }

    function addValue() {
        update("values", [...data.values, ""]);
    }

    function removeValue(index: number) {
        update(
            "values",
            data.values.filter((_, i) => i !== index)
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-1 block font-medium" htmlFor="cardname">
                    Card Name
                </label>
                <StyledInput
                    id="cardname"
                    value={data.name}
                    maxLength={BINGO_CARD_CONFIG.MAX_NAME_LENGTH}
                    onChange={(e) => update("name", e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block font-medium" htmlFor="rows">
                        Rows
                    </label>
                    <StyledInput
                        id="rows"
                        type="number"
                        min={BINGO_CARD_CONFIG.MIN_SIZE}
                        max={BINGO_CARD_CONFIG.MAX_SIZE}
                        value={data.rows}
                        onChange={(e) =>
                            update("rows", Number(e.target.value))
                        }
                    />
                </div>

                <div>
                    <label className="mb-1 block font-medium" htmlFor="cols">
                        Columns
                    </label>
                    <StyledInput
                        id="cols"
                        type="number"
                        min={3}
                        max={7}
                        value={data.cols}
                        onChange={(e) =>
                            update("cols", Number(e.target.value))
                        }
                    />
                </div>
            </div>

            {/* <div>
                <label className="mb-1 block font-medium" htmlFor="theme">
                    Theme
                </label>
                <input
                    id="theme"
                    className="w-full rounded border px-3 py-2"
                    value={data.theme}
                    onChange={(e) => update("theme", e.target.value)}
                />
            </div> */}

            <label className="flex items-center gap-2" htmlFor="hasFreeSpace">
                <input
                    id="hasFreeSpace"
                    type="checkbox"
                    checked={data.hasFreeSpace}
                    onChange={(e) =>
                        update("hasFreeSpace", e.target.checked)
                    }
                />
                Has Free Space
            </label>

            <div>
                <label className="mb-1 block font-medium" htmlFor="freeSpaceText">
                    Free Space Text
                </label>
                <StyledInput
                    id="freeSpaceText"
                    disabled={!data.hasFreeSpace}
                    value={data.freeSpaceText}
                    maxLength={BINGO_CARD_CONFIG.MAX_CELL_TEXT_LENGTH}
                    onChange={(e) =>
                        update("freeSpaceText", e.target.value)
                    }
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Values</h2>

                    <button
                        type="button"
                        onClick={addValue}
                        className="rounded border px-3 py-1"
                    >
                        Add
                    </button>
                </div>

                <div className="space-y-2">
                    {data.values.map((entry, index) => (
                        <div
                            key={index}
                            className="flex gap-2"
                        >
                            <StyledInput
                                name={`value${index+1}`}
                                className="flex-1 rounded border px-3 py-2"
                                value={entry}
                                maxLength={BINGO_CARD_CONFIG.MAX_CELL_TEXT_LENGTH}
                                onChange={(e) =>
                                    updateValues(index, e.target.value)
                                }
                            />

                            <button
                                type="button"
                                onClick={() => removeValue(index)}
                                className="rounded border px-3"
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-row justify-between">
                <p>{  data.values.length }/{ data.rows * data.cols - (data.hasFreeSpace ? 1 : 0) } required entries</p>
                
                <button
                    type="button"
                    onClick={addValue}
                    className="rounded border px-3 py-1"
                >
                    Add
                </button>
                </div>
            </div>

            <h2>Bingo Card Preview</h2>
            <BingoCardPreview 
                card={card}
                actions={{
                    play: BingoCardActions.play
                }}
            />
        </div>
    );
}