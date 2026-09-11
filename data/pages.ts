export interface WebPage {
    path: string,
    lastEdited: Date
}

export const staticPages: WebPage[] = [
    {
        path: "/",
        lastEdited: new Date("8-24-2026")
    },
    {
        path: "/bingo",
        lastEdited: new Date("8-24-2026")
    },
    {
        path: "/company",
        lastEdited: new Date("8-24-2026")
    },
    {
        path: "/company/privacy-policy",
        lastEdited: new Date("8-24-2026")
    }
]