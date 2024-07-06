import {
  CourseDetails,
  calculeLePrixDUneCourse,
} from "./calculeLePrixDUneCourse";

const tauxDeChangeFictifs = {
  AUD: 1.6060172843,
  BGN: 1.9525668945,
  BRL: 5.916865021,
  CAD: 1.4787336469,
  CHF: 0.9706944536,
  CNY: 7.873464956,
  CZK: 25.1366940053,
  DKK: 7.4619183501,
  EUR: 1,
  GBP: 0.8460671037,
  HKD: 8.4695078588,
  HRK: 7.1623353682,
  HUF: 393.3591372601,
  IDR: 17623.5729198159,
  ILS: 3.9976689406,
  INR: 90.4771102151,
  ISK: 149.7717360692,
  JPY: 174.2737136304,
  KRW: 1490.999563625,
  MXN: 19.588302846,
  MYR: 5.1061747797,
  NOK: 11.4304764717,
  NZD: 1.7635605955,
  PHP: 63.3802618518,
  PLN: 4.2799697453,
  RON: 4.9754540406,
  RUB: 95.4147269846,
  SEK: 11.3558521926,
  SGD: 1.4610290018,
  THB: 39.6165564564,
  TRY: 35.3908950881,
  USD: 1.0841870041,
  ZAR: 19.740934394,
};

describe("calculerPrix", () => {
  it("Calcule le prix correct d'une course basique en France pour un etudiant", () => {
    const course: CourseDetails = {
      type: "basique",
      distanceKm: 10,
      heure: 14,
      isEtudiant: true,
      isSenior: false,
      pays: "France",
      prixParKm: 1.5,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(13.35);
  });

  it("Calcule le prix correct d'une course basique en Espagne pour un senior", () => {
    const course: CourseDetails = {
      type: "basique",
      distanceKm: 11,
      heure: 15,
      isEtudiant: false,
      isSenior: true,
      pays: "Espagne",
      prixParKm: 1.6,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(15.38);
  });

  it("Calcule le prix correct d'une course de nuit en Roumanie pour un etudiant", () => {
    const course: CourseDetails = {
      type: "nuit",
      distanceKm: 6,
      heure: 23,
      isEtudiant: true,
      isSenior: false,
      pays: "Roumanie",
      prixParKm: 2,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(72.049);
  });

  it("Calcule le prix correct d'une course de nuit en Roumanie pour un senior", () => {
    const course: CourseDetails = {
      type: "nuit",
      distanceKm: 10,
      heure: 23,
      isEtudiant: false,
      isSenior: true,
      pays: "Roumanie",
      prixParKm: 3.5,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(217.228);
  });

  it("Calcule le prix correct d'une course de nuit en Roumanie pour un etudiant", () => {
    const course: CourseDetails = {
      type: "nuit",
      distanceKm: 10,
      heure: 22,
      isEtudiant: true,
      isSenior: false,
      pays: "Roumanie",
      prixParKm: 3.5,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(210.144);
  });

  it("Calcule le prix correct d'une course basique au Royaume-Uni pour un etudiant", () => {
    const course: CourseDetails = {
      type: "basique",
      distanceKm: 16,
      heure: 13,
      isEtudiant: true,
      isSenior: false,
      pays: "RoyaumeUni",
      prixParKm: 3.6,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(46.408);
  });

  it("Calcule le prix correct d'une course un dimanche de nuit au Royaume-Uni pour un etudiant", () => {
    const course: CourseDetails = {
      type: "dimanche",
      distanceKm: 16,
      heure: 23,
      isEtudiant: true,
      isSenior: false,
      pays: "RoyaumeUni",
      prixParKm: 3.6,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(69.149);
  });

  it("Calcule le prix correct d'une course un dimanche en Espagne pour un etudiant", () => {
    const course: CourseDetails = {
      type: "dimanche",
      distanceKm: 14,
      heure: 14,
      isEtudiant: true,
      isSenior: false,
      pays: "Espagne",
      prixParKm: 3.7,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(57.8119);
  });

  it("Calcule le prix correct d'une course un dimanche en France pour un senior", () => {
    const course: CourseDetails = {
      type: "dimanche",
      distanceKm: 12,
      heure: 18,
      isEtudiant: false,
      isSenior: true,
      pays: "France",
      prixParKm: 3.8,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(55.376);
  });

  it("Calcule le prix correct d'une course basique en Roumanie pour un senior", () => {
    const course: CourseDetails = {
      type: "basique",
      distanceKm: 11,
      heure: 18,
      isEtudiant: false,
      isSenior: true,
      pays: "Roumanie",
      prixParKm: 3.1,
      tauxDeChange: tauxDeChangeFictifs,
    };
    const prix = calculeLePrixDUneCourse(course);
    expect(prix).toBeCloseTo(142.0418);
  });
});
