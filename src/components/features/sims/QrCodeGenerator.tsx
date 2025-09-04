"use client";

import { Download, Share2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

interface QrCodeGeneratorProps {
  qrCodeValue: string | null;
  isShareable?: boolean;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  qrCodeValue,
  isShareable,
}) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const scaleFactor = 6; // high-resolution scale factor
  const padding = 10; // padding (in original SVG units) around the QR code

  const downloadQrCode = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current.querySelector("svg.qr-code-svg");
    if (!svg) {
      toast.error("QR Code could not be found.");
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // Create a canvas with extra padding.
      const canvas = document.createElement("canvas");
      canvas.width = (img.width + 2 * padding) * scaleFactor;
      canvas.height = (img.height + 2 * padding) * scaleFactor;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to get canvas context.");
        return;
      }
      // Fill the canvas with a white background.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Scale and draw the image with padding.
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, padding, padding);

      const pngDataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngDataUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      toast.error("Failed to generate PNG.");
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const shareQrCode = async () => {
    if (!navigator.share) {
      toast.error("Sharing is not supported on this browser.");
      return;
    }
    if (!svgRef.current) {
      toast.error("QR Code could not be found.");
      return;
    }

    const svg = svgRef.current.querySelector("svg.qr-code-svg");
    if (!svg) {
      toast.error("QR Code could not be found.");
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = (img.width + 2 * padding) * scaleFactor;
      canvas.height = (img.height + 2 * padding) * scaleFactor;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to get canvas context.");
        URL.revokeObjectURL(url);
        return;
      }
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, padding, padding);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Failed to convert QR code to PNG.");
          URL.revokeObjectURL(url);
          return;
        }
        const file = new File([blob], "qrcode.png", { type: "image/png" });
        try {
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "QR Code",
              text: "Here is the QR code.",
              files: [file],
            });
          } else {
            toast.error("Sharing files is not supported on this device.");
          }
        } catch (error) {
          console.error("Error sharing:", error);
          toast.error("An error occurred while sharing.");
        }
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    img.onerror = () => {
      toast.error("Failed to load QR code for sharing.");
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const fallbackDownload = () => {
    downloadQrCode();
    toast.error("Sharing not supported. QR Code has been downloaded instead.");
  };

  return (
    <div>
      {qrCodeValue ? (
        <div className="flex flex-col gap-3">
          <div ref={svgRef}>
            <QRCode value={qrCodeValue} size={70} className="qr-code-svg" />
          </div>
          {isShareable && (
            <div className="flex items-center gap-2 text-primary">
              <Download onClick={downloadQrCode} />
              <Share2 onClick={() => shareQrCode().catch(fallbackDownload)} />
            </div>
          )}
        </div>
      ) : (
        <p className="rounded bg-info/10 p-2 text-xs text-info">
          Package activation is in process...
        </p>
      )}
    </div>
  );
};

export default QrCodeGenerator;
