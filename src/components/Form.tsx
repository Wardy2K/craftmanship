"use client";
import {
  CourseDetails,
  calculeLePrixDUneCourse,
} from "@/app/utlis/calculeLePrixDUneCourse";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function FormulaireCalculantLePrixDUneCourse() {
  const [DetailsCourse, setDetailsCourse] = useState<CourseDetails>({
    type: "basique",
    prixParKm: 0,
    distanceKm: 0,
    heure: 0,
    isEtudiant: false,
    isSenior: false,
    pays: "France",
    tauxDeChange: null,
  });
  const [prixFinalDeLaCourse, setPrixFinalDeLaCourse] = useState<null | number>(
    null
  );

  useEffect(() => {
    const recupereTauxDeChange = async () => {
      const response = await fetch(
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_mIWyRnNAjyKir3lDtVYx9So4AAiqGWleKqGh4Y98&base_currency=EUR"
      );
      const { data } = await response.json();

      //Affiche les taux de change dans la console
      console.log(data);

      setDetailsCourse({
        ...DetailsCourse,
        tauxDeChange: data,
      });
    };

    recupereTauxDeChange();
  }, []);

  useEffect(() => {
    console.log(DetailsCourse);
  }, [DetailsCourse]);

  return (
    <Card className="w-full max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPrixFinalDeLaCourse(calculeLePrixDUneCourse(DetailsCourse));
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl">
            Calculer le prix d'une course
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Type de course</Label>
            <Select
              onValueChange={(value) =>
                setDetailsCourse({
                  ...DetailsCourse,
                  type: value as "basique" | "dimanche",
                })
              }
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de course" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="basique">Basique</SelectItem>
                  <SelectItem value="dimanche">Dimanche</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Prix par km</Label>
            <Input
              id="prixParKm"
              type="number"
              required
              onChange={(e) =>
                setDetailsCourse({
                  ...DetailsCourse,
                  prixParKm: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Distance de la course (en km)</Label>
            <Input
              id="distance"
              type="number"
              required
              onChange={(e) =>
                setDetailsCourse({
                  ...DetailsCourse,
                  distanceKm: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Heure de la course</Label>
            <Input
              id="distance"
              type="time"
              required
              onChange={(e) =>
                setDetailsCourse({
                  ...DetailsCourse,
                  heure: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Type de course</Label>
            <Select
              onValueChange={(value) =>
                setDetailsCourse({
                  ...DetailsCourse,
                  isSenior: value === "senior",
                  isEtudiant: value === "etudiant",
                })
              }
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de client" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="etudiant">Etudiant</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Pays</Label>
            <Select
              onValueChange={(value) =>
                setDetailsCourse({
                  ...DetailsCourse,
                  pays: value as
                    | "France"
                    | "Espagne"
                    | "Roumanie"
                    | "RoyaumeUni",
                })
              }
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de client" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Espagne">Espagne</SelectItem>
                  <SelectItem value="Roumanie">Roumanie</SelectItem>
                  <SelectItem value="RoyaumeUni">Royaume-Unis</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" type="submit">
            Calculer
          </Button>
          {prixFinalDeLaCourse && (
            <p className="text-2xl">
              Le prix est de : {prixFinalDeLaCourse.toFixed(2)} €
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
