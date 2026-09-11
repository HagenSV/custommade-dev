import { Metadata } from "next";
import { Suspense } from "react";
import ShareBingoCardClientPage from "./page.client";

export const metadata: Metadata = {
    title: "Bingo Card",
    description: "Someone shared a bingo card with you! Create, edit, play, print, and share custom bingo cards with CustomMade Games",
    robots: "noindex"
}

export default function ShareBingoCardPage(){
    return <Suspense><ShareBingoCardClientPage /></Suspense>
}