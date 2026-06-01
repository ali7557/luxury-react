export enum ProductStatus {
    PAUSE = "PAUSE",
    PROCESS = "PROCESS",
    DELETE = "DELETE",
}

export enum ProductCollection {
    WATCHES = "WATCHES",
    PERFUMES = "PERFUMES",         // Fragrance collection
    BRACELETS = "BRACELETS",       // Luxury jewelry bracelets
    SMART_WATCHES = "SMART_WATCHES", // Tech-luxury smart timepieces
    RINGS = "RINGS", // Straps, Watch Winders, etc.
}

/** * For Watches, size usually refers to the Case Diameter (mm).
 * For Jewelry, it refers to standard Ring/Chain sizing.
 */
export enum ProductSize {
    SMALL = "SMALL",   // e.g., 28mm-33mm (Ladies)
    NORMAL = "NORMAL", // e.g., 36mm-40mm (Unisex)
    LARGE = "LARGE",   // e.g., 41mm-45mm (Mens)
    SET = "SET",       // e.g., Watch + Bracelet gift set
}


export enum ProductVolume {
    GOLD_14K = 14,
    GOLD_18K = 18,
    GOLD_24K = 24,
    PLATINUM = 950,
    SILVER = 925,
}