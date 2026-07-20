// Mood Colors (Based on the FIRST tag)
export const getMoodColor = (tag) => {
    const colors = {
        // --- The Classics ---
        Red: "bg-[#422121] text-[#E8D5D5]", // Deep Burgundy
        White: "bg-[#4B4839] text-[#EBE9DD]", // Olive Oil / Hay
        Rosé: "bg-[#5C3A3A] text-[#EAD0D0]", // Dried Rose

        // --- The Modern/Natural ---
        "Low Intervention": "bg-[#3A4A40] text-[#E6EBE8]", // Forest / Sage
        Natural: "bg-[#2E3B2F] text-[#D4E0D6]", // Deep Moss / Raw Green
        "Pet Nat": "bg-[#4A3B4B] text-[#EADDEB]", // Plum Skin
        "Skin Contact": "bg-[#784F31] text-[#EADDCA]", // Amber / Russet
        Carbonic: "bg-[#6E2C2C] text-[#F2E6E6]", // Bright Cherry

        // --- Structural & Sensory Conditions (Tension and Materiality) ---
        Oxidation: "bg-[#7D6B4E] text-[#F3ECD4]", // Patina/Historical Gold - Intentional age and decay.
        Reduction: "bg-[#33353A] text-[#E7E7E7]", // Sulfur/Sealed Grey - Restraint and tension.
        Salt: "bg-[#4A5B63] text-[#E6F0F4]", // Sea Spray / Blue-Grey - Maritime/volcanic influence.

        // --- The Terroir/Structure (Specifics) ---
        Amphora: "bg-[#594239] text-[#E8DCCA]", // Terracotta
        Volcanic: "bg-[#2F3033] text-[#D1D5DB]", // Basalt / Ash
        Alpine: "bg-[#35464D] text-[#DDE6E8]", // Cold Slate / Blue Stone

        // --- The Soils (Geology) ---
        Granite: "bg-[#6B665F] text-[#E6E2DE]", // Crystalline Stone / Taupe
        Limestone: "bg-[#75777B] text-[#EBEBEB]", // Chalk / Cool Grey
        Chalk: "bg-[#8A8880] text-[#F2F0E8]", // Dry chalk / Warm mineral grey
        Schist: "bg-[#2D3035] text-[#C8CCD1]", // Dark Slate / Charcoal
        Clay: "bg-[#5C4033] text-[#E8DCC5]", // Dense Earth / Mud
        Sand: "bg-[#8F8776] text-[#262420]", // Pale Dune / Beige
        Silex: "bg-[#46494C] text-[#E5E7EB]", // Gunmetal / Flint
        Loess: "bg-[#756C58] text-[#EBE6D8]", // Dusty Yellow / Silt

        // --- Editorial Structural Modules (Thematic Coding) ---
        Interview: "bg-[#3D254B] text-[#F3E5FF]", // Deep Violet / Query - Dialogue and external perspective.
        Essay: "bg-[#2F4A2F] text-[#E8F5E8]", // Philosopher's Green / Thesis - Long-form critical thought and theory.
        Review: "bg-[#4A3C2F] text-[#F5EDE5]", // Sepia / Assessment - Focused critique and evaluation.
        Intermedial: "bg-[#555A3D] text-[#ECEEE4]", // Palimpsest Green/Grey - Content that explicitly bridges media (Text/Data/Image).
    };

    // Default to 'Void Black' if tag not found
    return colors[tag] || "bg-[#1A1A1A] text-[#A3A3A3]";
};
