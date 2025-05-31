import { NombreDossierParStatut } from "@/components/pageContents/NombreDossierParStatut";
import { enCours, rejected } from "@/dataObject/graphicData";

export const Tachesactives = () => {
  return (
    <div>
      Tâches actives
      <NombreDossierParStatut inProgress={enCours} rejected={rejected} />
    </div>
  );
};
