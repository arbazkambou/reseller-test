import { Badge } from "@/components/ui/badge";
import { UserInfo } from "@/types/dealers.types";

export function DealerDetailCard({ dealerDetail }: { dealerDetail: UserInfo }) {
  const { id, name, email, blocked, email_verified, balance } = dealerDetail;

  const userFields = [
    { label: "ID", value: id },
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Blocked", value: blocked },
    { label: "Balance", value: balance },
    { label: "Email Verified", value: email_verified },
  ];

  return (
    <div className="divide-y">
      {userFields.map((field, index) => (
        <div
          key={field.label}
          className={`flex items-center justify-between px-6 py-2 rounded-md ${
            index % 2 === 0 ? "bg-secondary" : "bg-background"
          }`}
        >
          <span className="text-body font-semibold  min-w-0 flex-shrink-0">
            {field.label}
          </span>
          <div className="flex items-center gap-2 ml-4">
            {field.label === "Blocked" && (
              <Badge className="text-xs">{field.value}</Badge>
            )}
            {field.label === "Email Verified" && (
              <Badge className="text-xs">{field.value}</Badge>
            )}
            {field.label !== "Blocked" && field.label !== "Email Verified" && (
              <span>{field.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
