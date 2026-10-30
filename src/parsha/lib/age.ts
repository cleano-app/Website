export type Age = "2-3" | "3-4" | "4-6";

export const AGES: Age[] = ["2-3", "3-4", "4-6"];

export type AgeRules = {
  /** Multiplier on the scene's line thickness. */
  lineScale: number;
  mazeSize: number;
  /** Dot-to-dot target; null keeps the corners only. */
  dotCount: number | null;
  dotHelper: boolean;
  dotNumberPx: number;
  countItems: number;
  countOptions: [number, number, number];
  /** Body text size on the sheets, in pt. */
  bodyPt: number;
};

export const AGE_RULES: Record<Age, AgeRules> = {
  "2-3": {
    lineScale: 1.4,
    mazeSize: 4,
    dotCount: null,
    dotHelper: true,
    dotNumberPx: 22,
    countItems: 3,
    countOptions: [2, 3, 4],
    bodyPt: 15,
  },
  "3-4": {
    lineScale: 1,
    mazeSize: 6,
    dotCount: 10,
    dotHelper: false,
    dotNumberPx: 18,
    countItems: 5,
    countOptions: [4, 5, 6],
    bodyPt: 13,
  },
  "4-6": {
    lineScale: 1,
    mazeSize: 9,
    dotCount: 18,
    dotHelper: false,
    dotNumberPx: 15,
    countItems: 8,
    countOptions: [7, 8, 9],
    bodyPt: 13,
  },
};
