import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import BlocInfosGenerales from "@/components/blocInfos/BlocInfosGenerales";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { collectionList } from "@/dataObject/ListCollection";
export const Dashboard = () => {
  return (
    <>
    <BlocInfosGenerales/>
      <div>
        je suis dashboard
        <CustomDatePicker nomDuChamp="Date de naissance" />
        <DropDownList collection={collectionList} label="Pays" />
      </div>
    </>
  );
};
