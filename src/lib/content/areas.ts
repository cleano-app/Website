export type Area = {
  name: string;
  postcodes: string[];
};

// Priority areas per the V1 build plan. Postcodes are indicative outward
// codes for the named area - double check before publishing.
export const priorityAreas: Area[] = [
  { name: "Stamford Hill", postcodes: ["N16"] },
  { name: "Tottenham", postcodes: ["N15", "N17"] },
  { name: "Hackney", postcodes: ["E8", "E9"] },
  { name: "Wood Green", postcodes: ["N22"] },
  { name: "Golders Green", postcodes: ["NW11"] },
  { name: "Edgware", postcodes: ["HA8"] },
  { name: "Enfield", postcodes: ["EN1", "EN2", "EN3"] },
];

export const regionName = "London and the surrounding areas";
