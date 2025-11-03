"use client";

import MyDialog from "@/components/shared/dialog/MyDialog";
import { Button } from "@/components/ui/button";
import { SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { EditPromocodeForm } from "./EditPromocodeForm";
import { PromoCode } from "@/types/promocode.types";

function EditPromocodeDialog({ promocode }: { promocode: PromoCode }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <MyDialog
      dialogProps={{ open: showDialog, onOpenChange: setShowDialog }}
      dialogTitle="Edit Promocode"
      dialogDescription="You can update your promocode below."
      dialogTrigger={
        <Button
          variant="outline"
          size="icon"
          className="hover:text-primary transition-all"
        >
          <SquarePenIcon />
        </Button>
      }
      dialogContent={
        <EditPromocodeForm
          promoId={promocode.id.toString()}
          defaultValue={promocode.promocode}
          setShowDialog={setShowDialog}
        />
      }
    />
  );
}

export default EditPromocodeDialog;
