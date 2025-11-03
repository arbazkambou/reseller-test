import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import {
  DialogContentProps,
  DialogProps,
  DialogTriggerProps,
} from "@radix-ui/react-dialog";

type MyDialogProps = {
  dialogProps?: DialogProps;
  dialogTriggerProps?: DialogTriggerProps;
  dialogTrigger: React.ReactNode;
  dialogContentProps?: DialogContentProps;
  dialogHeaderProps?: React.ComponentProps<"div">;
  dialogTitle: React.ReactNode | string;
  dialogDescription?: React.ReactNode | string;
  dialogContent: React.ReactNode;
};

function MyDialog({
  dialogProps,
  dialogTrigger,
  dialogTriggerProps,
  dialogContentProps,
  dialogHeaderProps,
  dialogTitle,
  dialogDescription,
  dialogContent,
}: MyDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogTrigger {...dialogTriggerProps} asChild>
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent {...dialogContentProps}>
        <DialogHeader {...dialogHeaderProps}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
}

export default MyDialog;
