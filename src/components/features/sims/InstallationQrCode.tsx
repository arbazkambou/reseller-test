"use client";

import { Download, Share2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import QRCode from "react-qr-code";

interface QrCodeGeneratorProps {
  qrCodeValue: string;
  isShareable?: boolean;
}

const InstallationQrCode: React.FC<QrCodeGeneratorProps> = ({
  qrCodeValue,
}) => {
  const svgRef = useRef<HTMLDivElement>(null);

  // Define a scale factor to increase the PNG resolution.
  const scaleFactor = 6; // Increase this number for higher resolution
  const padding = 10; // Padding (in original SVG units) around the QR code

  // Function to convert the SVG to a PNG and trigger download.
  const downloadQrCode = () => {
    if (!svgRef.current) return;

    const svg = svgRef.current.querySelector("svg.qr-code-svg");
    if (!svg) {
      toast.error("QR Code could not be found.");
      return;
    }

    // Serialize the SVG element.
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // Create a canvas with dimensions increased by padding.
      const canvas = document.createElement("canvas");
      canvas.width = (img.width + 2 * padding) * scaleFactor;
      canvas.height = (img.height + 2 * padding) * scaleFactor;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to get canvas context.");
        return;
      }
      // Fill canvas with a white background.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Scale the context so that the image is drawn with higher resolution.
      ctx.scale(scaleFactor, scaleFactor);
      // Draw the image with a padding offset.
      ctx.drawImage(img, padding, padding);

      // Convert canvas to PNG data URL.
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
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

  // Function to share the QR code as a PNG.
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

    // Serialize the SVG.
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

      // Convert canvas content to a PNG blob.
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

  // Fallback to download if sharing fails.
  const fallbackDownload = () => {
    downloadQrCode();
    toast.error("Sharing not supported. QR Code has been downloaded instead.");
  };

  return (
    <div>
      {qrCodeValue ? (
        <div className="flex flex-col items-center gap-[28px]">
          <p className="text-foreground-light">Scan the QR Code</p>
          <div ref={svgRef}>
            <QRCode
              value={qrCodeValue}
              size={200}
              className="qr-code-svg"
              fgColor="hsla(var(--primary))"
            />
          </div>
          <p className="max-w-[370px] text-justify text-[13.4px] text-foreground-light">
            Scan the QR code by printing out or displaying the code on another
            device to install your eSIM. Make sure your device has a stable
            internet connection before installing.
          </p>
          <div className="flex w-full flex-col items-center gap-2 xs:flex-row xs:justify-center">
            <div
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-muted p-2 transition-all hover:bg-primary xs:w-max"
              onClick={downloadQrCode}
            >
              <Download
                className="text-primary transition-all group-hover:text-background"
                size={20}
              />
              <p className="text-[13px] text-foreground-light transition-all group-hover:text-background">
                Download QR Code
              </p>
            </div>
            <div
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-muted p-2 transition-all hover:bg-primary xs:w-max"
              onClick={() => shareQrCode().catch(fallbackDownload)}
            >
              <Share2
                className="text-primary transition-all group-hover:text-background"
                size={20}
              />
              <p className="text-[13px] text-foreground-light transition-all group-hover:text-background">
                Share QR Code
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs">Processing QR code...</p>
      )}
    </div>
  );
};

export default InstallationQrCode;
