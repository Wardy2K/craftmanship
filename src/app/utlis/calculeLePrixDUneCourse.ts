export interface CourseDetails {
  prixParKm: number;
  type: "basique" | "dimanche" | "nuit";
  distanceKm: number;
  heure: number;
  isEtudiant: boolean;
  isSenior: boolean;
  pays: "France" | "Espagne" | "Roumanie" | "RoyaumeUni";
  tauxDeChange: {
    AUD: number;
    BGN: number;
    BRL: number;
    CAD: number;
    CHF: number;
    CNY: number;
    CZK: number;
    DKK: number;
    EUR: number;
    GBP: number;
    HKD: number;
    HRK: number;
    HUF: number;
    IDR: number;
    ILS: number;
    INR: number;
    ISK: number;
    JPY: number;
    KRW: number;
    MXN: number;
    MYR: number;
    NOK: number;
    NZD: number;
    PHP: number;
    PLN: number;
    RON: number;
    RUB: number;
    SEK: number;
    SGD: number;
    THB: number;
    TRY: number;
    USD: number;
    ZAR: number;
  } | null;
}

const reductionEtudiant = 0.11;
const reductionSenior = 0.08;

const augmentations = {
  basique: 0,
  dimanche: 0.32,
  nuit: 0.49,
};

const reductionsPays = {
  France: 0,
  Espagne: 0.05,
  Roumanie: 0.09,
  RoyaumeUni: -0.07,
};

export function calculeLePrixDUneCourse(course: CourseDetails): number {
  const nuit = course.heure < 6 || course.heure > 21;
  let prixKm;
  if (nuit) {
    prixKm = course.prixParKm * (1 + augmentations["nuit"]);
  } else {
    prixKm = course.prixParKm * (1 + augmentations[course.type]);
  }

  prixKm *= 1 - reductionsPays[course.pays];

  let prix = prixKm * course.distanceKm;

  if (course.isEtudiant) {
    prix *= 1 - reductionEtudiant;
  }
  if (course.isSenior) {
    prix *= 1 - reductionSenior;
  }

  if (course.tauxDeChange && course.pays === "RoyaumeUni")
    prix *= course.tauxDeChange.GBP;
  else if (course.tauxDeChange && course.pays === "Roumanie") {
    prix *= course.tauxDeChange.RON;
  }

  return prix;
}
