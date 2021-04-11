enum SchematicType {
  SPONGE = ".schem",
  MCEDIT = ".schematic",
  STRUCTURE = ".nbt",
}

/**
 * Determines the type of schematic based on the extension.
 * @param extension The extension without a dot.
 * @returns The schematic type, or null if none exist for this extension.
 */
export const getSchematicType = (extension: string): SchematicType | null => {
  switch (extension) {
    case "schem":
      return SchematicType.SPONGE;
    case "schematic":
      return SchematicType.MCEDIT;
    case "nbt":
      return SchematicType.STRUCTURE;
    default:
      return null;
  }
};

export default SchematicType;
