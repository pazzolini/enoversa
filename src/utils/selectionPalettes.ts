export const selectionPaletteNames = [
    "Burgundy",
    "Rose",
    "Gold",
    "Amber",
    "Moss",
    "Marine",
    "Slate",
    "Earth",
    "Plum",
    "Void",
] as const;

export type SelectionPalette = (typeof selectionPaletteNames)[number];

const selectionPalettes: Record<SelectionPalette, string> = {
    Burgundy: "bg-[#6E2C2C] text-[#F8EEEE]",
    Rose: "bg-[#6B3F47] text-[#F8E9EC]",
    Gold: "bg-[#6D5A2F] text-[#FFF4D6]",
    Amber: "bg-[#784F31] text-[#FFF1DF]",
    Moss: "bg-[#34463A] text-[#EFF7F0]",
    Marine: "bg-[#415762] text-[#EFF8FC]",
    Slate: "bg-[#35383D] text-[#F1F3F5]",
    Earth: "bg-[#5A4034] text-[#F4E9DF]",
    Plum: "bg-[#4D384F] text-[#F6EDF7]",
    Void: "bg-[#1A1A1A] text-[#EAEAEA]",
};

export const getSelectionPalette = (palette: SelectionPalette) =>
    selectionPalettes[palette];
