import { Suspense } from "react";
import EditBingoCardClientPage from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit Bingo Card",
    robots: "noindex"
}

export default function EditBingoCard(){
    return <Suspense><EditBingoCardClientPage /></Suspense>
}