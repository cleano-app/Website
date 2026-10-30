export type Age = "3" | "4" | "5" | "6-7";

export const AGES: Age[] = ["3", "4", "5", "6-7"];

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
  "3": {
    lineScale: 1.4,
    mazeSize: 4,
    dotCount: null,
    dotHelper: true,
    dotNumberPx: 22,
    countItems: 3,
    countOptions: [2, 3, 4],
    bodyPt: 15,
  },
  "4": {
    lineScale: 1.2,
    mazeSize: 6,
    dotCount: 10,
    dotHelper: false,
    dotNumberPx: 18,
    countItems: 5,
    countOptions: [4, 5, 6],
    bodyPt: 14,
  },
  "5": {
    lineScale: 1,
    mazeSize: 8,
    dotCount: 15,
    dotHelper: false,
    dotNumberPx: 16,
    countItems: 7,
    countOptions: [6, 7, 8],
    bodyPt: 13,
  },
  "6-7": {
    lineScale: 1,
    mazeSize: 10,
    dotCount: 22,
    dotHelper: false,
    dotNumberPx: 14,
    countItems: 10,
    countOptions: [9, 10, 11],
    bodyPt: 13,
  },
};
