import { Suspense } from "react";
import PlayBingoClientPage from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Play Bingo",
    robots: "noindex"
}

export default function PlayBingoPage(){
    return <Suspense><PlayBingoClientPage /></Suspense>
}