import type { CollectionEntry } from "astro:content";

const collator = new Intl.Collator("en", { sensitivity: "base" });
const countryOrder = ["Portugal", "Spain", "France", "Ireland"];

const countryPosition = (country: string) => {
    const position = countryOrder.indexOf(country);
    return position === -1 ? countryOrder.length : position;
};

export const comparePlaces = (
    a: CollectionEntry<"places">,
    b: CollectionEntry<"places">,
) => {
    const positionDifference =
        countryPosition(a.data.country) - countryPosition(b.data.country);

    return (
        positionDifference ||
        collator.compare(a.data.country, b.data.country) ||
        collator.compare(a.data.city, b.data.city) ||
        collator.compare(a.data.title, b.data.title)
    );
};
