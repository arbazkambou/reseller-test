import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Info } from "lucide-react";
import { useRef, useState } from "react";

interface PropsType {
  message: string;
  children?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  isRenewTooltip?: boolean;
  can_renew?: boolean;
  isRenewEnable?: boolean;
  handleCheckedChange?: (value: boolean) => void;
}
export function MyTooltip({
  message,
  side = "left",
  isRenewTooltip,
  isRenewEnable,
  can_renew,
  handleCheckedChange,
}: PropsType) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleToggle = (e: React.MouseEvent) => {
    if (isDesktop) return;
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          {isRenewTooltip ? (
            <button
              className="flex w-full items-center justify-center"
              onClick={handleToggle}
              ref={buttonRef}
            >
              <Switch
                disabled={!can_renew}
                checked={isRenewEnable}
                onCheckedChange={handleCheckedChange}
                onFocus={(e) => e.preventDefault()}
                className="disabled:opacity-30"
              />
            </button>
          ) : (
            <button
              ref={buttonRef}
              onClick={handleToggle}
              className="inline-block cursor-pointer"
              onFocus={(e) => e.preventDefault()}
            >
              <Info size={18} />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent
          className="max-w-[200px]"
          side={side}
          avoidCollisions
          onPointerDownOutside={(e) => {
            if (
              buttonRef.current &&
              buttonRef.current.contains(e.target as Node)
            ) {
              return;
            }

            setOpen(false);
          }}
        >
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
