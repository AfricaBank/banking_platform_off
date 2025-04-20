import { CustomDatePicker } from "@/components/customFormFields/CustomDatePicker";
import { DropDownList } from "@/components/customFormFields/DropDownList";
import { collectionList } from "@/dataObject/ListCollection";
export const Dashboard = () => {
  return (
    <>
      <div>
        je suis dashboard
        <CustomDatePicker nomDuChamp="Date de naissance" />
        <DropDownList collection={collectionList} label="Pays" />
      </div>
    </>
  );
};
