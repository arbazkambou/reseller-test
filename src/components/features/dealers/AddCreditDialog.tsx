import MyDialog from "@/components/shared/dialog/MyDialog";
import { AddCreditForm } from "./AddCreditForm";
import { Dealer } from "@/types/dealers.types";
import { useState } from "react";

function AddCreditDialog({ dealer }: { dealer: Dealer }) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <MyDialog
      dialogTitle="Add Credit"
      dialogDescription={"Add credit to a dealer account"}
      dialogTrigger={<span>Add Credits</span>}
      dialogContent={
        <AddCreditForm dealer={dealer} setShowDialog={setShowDialog} />
      }
      dialogProps={{ open: showDialog, onOpenChange: setShowDialog }}
    />
  );
}

export default AddCreditDialog;
