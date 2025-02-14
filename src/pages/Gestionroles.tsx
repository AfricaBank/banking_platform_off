import { StepperComponent } from "@/components/pageContents/StepperComponent";
import { ajoutPersonnePhysique } from "@/dataObject/stepsObjects";
import { StepperBox } from "@/components/pageContents/StepperBox";

export const Gestionroles = () => {
  return (
    <>
      <StepperBox>
        <StepperComponent steps={ajoutPersonnePhysique} />
      </StepperBox>
    </>
  );
};
