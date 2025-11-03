import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  children?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  icon,
  iconBg,
  iconColor,
  children,
}: StatCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <div className="flex items-center gap-4 mt-3">
            <p className="text-2xl font-semibold">{value}</p>
            {children && children}
          </div>
        </div>
        <div
          className={`p-2 rounded-full ${iconBg} flex items-center justify-center`}
        >
          <div className={`${iconColor}`}>{icon}</div>
        </div>
      </div>
    </Card>
  );
}
