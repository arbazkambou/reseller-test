import MyDialog from "@/components/shared/dialog/MyDialog";
import { Button } from "@/components/ui/button";
import { Dealer } from "@/types/dealers.types";
import { HandCoinsIcon } from "lucide-react";
import { useState } from "react";
import { AddCreditForm } from "./AddCreditForm";

function AddCreditDialog({ dealer }: { dealer: Dealer }) {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <MyDialog
      dialogTitle="Add Credit"
      dialogDescription={"Add credit to a dealer account"}
      dialogTrigger={
        <Button
          variant={"outline"}
          size={"icon"}
          className="hover:text-primary transition-all"
        >
          <HandCoinsIcon />
        </Button>
      }
      dialogContent={
        <AddCreditForm dealer={dealer} setShowDialog={setShowDialog} />
      }
      dialogProps={{ open: showDialog, onOpenChange: setShowDialog }}
    />
  );
}

export default AddCreditDialog;
