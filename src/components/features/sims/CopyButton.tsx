"use client";

import { CheckIcon, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button onClick={handleCopy} className="text-muted-foreground">
      {copied ? (
        <CheckIcon className="h-[16px] w-[16px] text-primary" />
      ) : (
        <Copy className="h-[16px] w-[16px]" />
      )}
    </button>
  );
};

export default CopyButton;
