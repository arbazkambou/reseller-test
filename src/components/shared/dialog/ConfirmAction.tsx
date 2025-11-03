import { Button } from "@/components/ui/button";
import SpinnerMini from "../skeltons/SpinnerMini";

interface PropsType {
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  isPending?: boolean;
}

export function ConfirmAction({ setIsConfirm, isPending, setShow }: PropsType) {
  function handleClick(value: boolean) {
    if (!value && setShow) {
      setShow(false);
    }
    setIsConfirm(value);
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={"destructive"}
        onClick={() => handleClick(true)}
        disabled={isPending}
      >
        {isPending ? <SpinnerMini /> : "Confirm"}
      </Button>
      <Button
        variant={"outline"}
        onClick={() => handleClick(false)}
        disabled={isPending}
      >
        Cancel
      </Button>
    </div>
  );
}

export default ConfirmAction;
