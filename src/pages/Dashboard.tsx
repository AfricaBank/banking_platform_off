import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import BlocInfosGenerales from "@/components/blocInfos/BlocInfosGenerales";
export const Dashboard = () => {
  return (
    <>
    <BlocInfosGenerales/>
      <div>
        je suis dashboard
        <CustomDatePicker />
      </div>
    </>
  );
};
