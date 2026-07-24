export const selectionTagVocabulary = {
    site: [
        "Alluvial",
        "Basalt",
        "Chalk",
        "Clay",
        "Flint",
        "Granite",
        "Gravel",
        "Limestone",
        "Loess",
        "Marl",
        "Quartz",
        "Sand",
        "Sandstone",
        "Schist",
        "Silt",
        "Slate",
        "Volcanic",
    ],
    vineyard: [
        "Field Blend",
        "Single Vineyard",
        "Ungrafted",
        "Bush Vines",
        "Terraced Vineyard",
    ],
    farming: [
        "Organic Farming",
        "Certified Organic",
        "Biodynamic Farming",
        "Certified Biodynamic",
        "Dry Farmed",
        "Hand Harvested",
        "Horse Ploughed",
        "No Herbicides",
        "Cover Crops",
        "Agroforestry",
    ],
    vinification: [
        "Direct Press",
        "Saignée",
        "Skin Contact",
        "Carbonic Maceration",
        "Semi-carbonic Maceration",
        "Whole Cluster",
        "Destemmed",
        "Co-fermented",
        "Native Yeast",
        "Malolactic Fermentation",
        "No Added Sulphites",
        "Unfined",
        "Unfiltered",
    ],
    vessel: [
        "Amphora",
        "Barrel",
        "Concrete",
        "Stainless Steel",
        "Foudre",
        "Demi-muid",
        "Clay Tinaja",
        "Glass",
        "Fibreglass",
    ],
    ageing: [
        "Lees Ageing",
        "Bâtonnage",
        "Flor Ageing",
        "Oxidative Ageing",
        "Solera",
    ],
    style: [
        "Pét-Nat",
        "Traditional Method",
        "Ancestral Method",
        "Charmat Method",
        "Col Fondo",
        "Brut Nature",
        "Extra Brut",
        "Brut",
        "Blanc de Blancs",
        "Blanc de Noirs",
        "Late Harvest",
        "Botrytised",
        "Ice Wine",
        "Straw Wine",
        "Passito",
        "Rancio",
    ],
    producer: [
        "Estate Grown",
        "Estate Bottled",
        "Négociant",
        "Cooperative",
    ],
} as const;

export type SelectionTagFacet = keyof typeof selectionTagVocabulary;

export const selectionTagFacetOrder = [
    "site",
    "vineyard",
    "farming",
    "vinification",
    "vessel",
    "ageing",
    "style",
    "producer",
] as const satisfies readonly SelectionTagFacet[];

export const selectionTagFacetLabels: Record<SelectionTagFacet, string> = {
    site: "Site",
    vineyard: "Vineyard",
    farming: "Farming",
    vinification: "Vinification",
    vessel: "Vessel",
    ageing: "Ageing",
    style: "Style",
    producer: "Producer",
};

export type SelectionTags = Partial<Record<SelectionTagFacet, readonly string[]>>;

export const getSelectionTagGroups = (tags: SelectionTags) =>
    selectionTagFacetOrder.flatMap((facet) => {
        const values = tags[facet] ?? [];
        return values.length
            ? [{ facet, label: selectionTagFacetLabels[facet], values }]
            : [];
    });

export const flattenSelectionTags = (tags: SelectionTags) =>
    getSelectionTagGroups(tags).flatMap((group) => group.values);

export const formatSelectionVibe = (vibe: readonly string[]) =>
    vibe.map((descriptor) => `${descriptor}.`).join(" ");
