// Mood Colors (Based on the FIRST tag)
export const getMoodColor = (tag) => {
    const colors = {
        // --- The Classics ---
        Red: "bg-[#422121] text-[#E8D5D5]", // Deep Burgundy
        White: "bg-[#4B4839] text-[#EBE9DD]", // Olive Oil / Hay
        Rosé: "bg-[#5C3A3A] text-[#EAD0D0]", // Dried Rose

        // --- The Modern/Natural ---
        "Low Intervention": "bg-[#3A4A40] text-[#E6EBE8]", // Forest / Sage
        Natural: "bg-[#2E3B2F] text-[#D4E0D6]", // Deep Moss / Raw Green [NEW]
        "Pet Nat": "bg-[#4A3B4B] text-[#EADDEB]", // Plum Skin
        "Skin Contact": "bg-[#784F31] text-[#EADDCA]", // Amber / Russet
        Carbonic: "bg-[#6E2C2C] text-[#F2E6E6]", // Bright Cherry

        // --- The Terroir/Structure ---
        Amphora: "bg-[#594239] text-[#E8DCCA]", // Terracotta
        Volcanic: "bg-[#2F3033] text-[#D1D5DB]", // Basalt / Ash
        Alpine: "bg-[#35464D] text-[#DDE6E8]", // Cold Slate / Blue Stone
        Oxidative: "bg-[#665D37] text-[#EBE6C7]", // Walnut / Old Gold

        // --- The Soils (Geology) ---
        Granite: "bg-[#6B665F] text-[#E6E2DE]", // Crystalline Stone / Taupe
        Limestone: "bg-[#75777B] text-[#EBEBEB]", // Chalk / Cool Grey (Champagne/Burgundy)
        Schist: "bg-[#2D3035] text-[#C8CCD1]", // Dark Slate / Charcoal (Douro/Priorat)
        Clay: "bg-[#5C4033] text-[#E8DCC5]", // Dense Earth / Mud (Right Bank/Alentejo)
        Sand: "bg-[#8F8776] text-[#262420]", // Pale Dune / Beige (Colares/Nieva)
        Silex: "bg-[#46494C] text-[#E5E7EB]", // Gunmetal / Flint (Loire)
        Loess: "bg-[#756C58] text-[#EBE6D8]", // Dusty Yellow / Silt (Kaiserstuhl)
    };

    // Default to 'Void Black' if tag not found
    return colors[tag] || "bg-[#1A1A1A] text-[#A3A3A3]";
};
