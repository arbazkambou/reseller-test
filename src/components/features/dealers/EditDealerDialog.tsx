import MyDialog from "@/components/shared/dialog/MyDialog";
import { EditDealerForm } from "./EditDealerForm";
import { Dealer } from "@/types/dealers.types";
import { useState } from "react";

function EditDealerDialog({ dealer }: { dealer: Dealer }) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <MyDialog
      dialogProps={{ open: showDialog, onOpenChange: setShowDialog }}
      dialogTitle="Update Dealer"
      dialogDescription={"You can update dealer here"}
      dialogTrigger={<span>Edit Dealer</span>}
      dialogContent={
        <EditDealerForm dealer={dealer} setShowDialog={setShowDialog} />
      }
    />
  );
}

export default EditDealerDialog;
