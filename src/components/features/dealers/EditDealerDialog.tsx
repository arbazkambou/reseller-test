import MyDialog from "@/components/shared/dialog/MyDialog";
import { Button } from "@/components/ui/button";
import { Dealer } from "@/types/dealers.types";
import { SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { EditDealerForm } from "./EditDealerForm";

function EditDealerDialog({ dealer }: { dealer: Dealer }) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <MyDialog
      dialogProps={{ open: showDialog, onOpenChange: setShowDialog }}
      dialogTitle="Update Dealer"
      dialogDescription={"You can update dealer here"}
      dialogTrigger={
        <Button
          variant={"outline"}
          size={"icon"}
          className="hover:text-primary transition-all"
        >
          <SquarePenIcon />
        </Button>
      }
      dialogContent={
        <EditDealerForm dealer={dealer} setShowDialog={setShowDialog} />
      }
    />
  );
}

export default EditDealerDialog;
