import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps";

import { useState } from "react";

interface Step {
  index: number;
  title: string;
  content: string;
}

interface StepperComponentProps {
  steps: Step[];
  initialStep?: number;
  chakraProps?: any;
}

export const StepperComponent: React.FC<StepperComponentProps> = ({
  steps,
  initialStep = 0,
  chakraProps,
}) => {
  const [step, setStep] = useState(initialStep);
  return (
    <StepsRoot
      size="sm"
      step={step}
      onStepChange={(e) => setStep(e.step)}
      variant="subtle"
      orientation="vertical"
      count={steps.length}
      colorPalette="blue"
      {...chakraProps}
    >
      <StepsList>
        {steps.map(({ index, title }) => (
          <StepsItem key={index} index={index} title={title} width="110px" />
        ))}
      </StepsList>

      {steps.map(({ index, content }) => (
        <StepsContent key={index} index={index}>
          {content}
        </StepsContent>
      ))}

      <StepsCompletedContent>Inserez les pièces jointes</StepsCompletedContent>
    </StepsRoot>
  );
};
