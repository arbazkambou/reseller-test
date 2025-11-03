"use client";
import MyDialog from "@/components/shared/dialog/MyDialog";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { AddDealerForm } from "./AddDealerForm";
import { useState } from "react";

function AddDealerDialog() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <MyDialog
      dialogTitle="Add Dealer"
      dialogDescription={"You can add dealer here"}
      dialogTrigger={
        <Button size={"sm"} className="rounded-full flex items-center gap-2">
          <PlusCircleIcon />
          Add Dealer
        </Button>
      }
      dialogContent={<AddDealerForm setShowDialog={setShowDialog} />}
      dialogProps={{ open: showDialog, onOpenChange: setShowDialog }}
    />
  );
}

export default AddDealerDialog;
