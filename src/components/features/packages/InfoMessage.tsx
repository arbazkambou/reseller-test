import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface PropsType {
  className?: string;
  message?: string;
}

function InfoMessage({ className, message}: PropsType) {
  return (
    <div
      className={cn(
        `flex min-h-[300px] items-center justify-center`,
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2 rounded-sm bg-info/10 px-4 py-2">
        <Info className="shrink-0 text-info" size={20} />
        <p className="font-400 text-info">
          {message
            ? message
            : " Currently, no eSIM plans are available for this country due to being out of stock. Please check again later."}
        </p>
      </div>
    </div>
  );
}

export default InfoMessage;
