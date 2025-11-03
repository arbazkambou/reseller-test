import MyDialog from "@/components/shared/dialog/MyDialog";
import { Button } from "@/components/ui/button";
import { BundleSoldBreakdown } from "@/types/dashboard.types";
import { ListCollapse } from "lucide-react";

function BundleBreakdownDetail({
  bundleSoldBreakDown,
}: {
  bundleSoldBreakDown: BundleSoldBreakdown;
}) {
  const { global, local, regional } = bundleSoldBreakDown;
  return (
    <>
      <div className="grid gap-2 rounded-xl border bg-card/50 p-2">
        <div className="flex items-center justify-between rounded-lg p-3 hover:bg-accent/30 transition-colors">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Regional
          </span>
          <span className="font-semibold tabular-nums px-2 py-0.5 rounded-md bg-muted/70">
            {regional.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg p-3 hover:bg-accent/30 transition-colors">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Local
          </span>
          <span className="font-semibold tabular-nums px-2 py-0.5 rounded-md bg-muted/70">
            {local.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg p-3 hover:bg-accent/30 transition-colors">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Global
          </span>
          <span className="font-semibold tabular-nums px-2 py-0.5 rounded-md bg-muted/70">
            {global.toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
}

function BundleSoldBreakdownDialog({
  bundleSoldBreakDown,
}: {
  bundleSoldBreakDown: BundleSoldBreakdown;
}) {
  return (
    <MyDialog
      dialogTrigger={
        <Button variant="outline" size="icon" className="text-xs rounded-full">
          <ListCollapse size={16} className="text-primary" />
        </Button>
      }
      dialogTitle={"Bundle Sold Details"}
      dialogContent={
        <BundleBreakdownDetail bundleSoldBreakDown={bundleSoldBreakDown} />
      }
    />
  );
}

export default BundleSoldBreakdownDialog;
