import { ReceiptData } from "@/types/billing";

// Dynamic import for html2pdf to avoid SSR issues
let html2pdf: typeof import("html2pdf.js") | null = null;
if (typeof window !== "undefined") {
  import("html2pdf.js").then((html2pdfModule) => {
    html2pdf = html2pdfModule.default;
  });
}

export interface PDFOptions {
  filename?: string;
  margin?: number[];
  scale?: number;
  quality?: number;
}

export async function generatePDF(
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<boolean> {
  try {
    // Ensure html2pdf is loaded
    if (!html2pdf) {
      const html2pdfModule = await import("html2pdf.js");
      html2pdf = html2pdfModule.default;
    }

    const {
      filename = "receipt.pdf",
      margin = [10, 10],
      scale = 2,
      quality = 0.98,
    } = options;

    const opt = {
      margin,
      filename,
      image: { type: "jpeg", quality },
      html2canvas: {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        removeContainer: true,
        letterRendering: true,
        foreignObjectRendering: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
    };

    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (error) {
    console.error("PDF generation error:", error);
    return false;
  }
}

export function generateReceiptFilename(receiptData: ReceiptData): string {
  const date = receiptData.date.replace(/-/g, "");
  return `receipt-${receiptData.invoiceNumber}-${date}.pdf`;
}

// Regular expression to match unsupported modern color functions like oklch(), lab(), and lch()
const unsupportedColorRegex = /oklch\(|lab\(|lch\(|color\(/i;

// Helper function to safely fallback unsupported colors to black or white
function safeColor(color: string) {
  if (!color || color === "none" || color === "transparent") return color;
  if (unsupportedColorRegex.test(color)) return "#000000"; // fallback to black
  return color;
}

export function prepareElementForPDF(element: HTMLElement): HTMLElement {
  // Create a temporary container to avoid visible changes
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  // Clone the element so the original is untouched
  const clonedElement = element.cloneNode(true) as HTMLElement;
  container.appendChild(clonedElement);

  // Recursive function to process all elements and fix styles
  const processElement = (el: Element) => {
    if (el instanceof HTMLElement) {
      // Fix color related CSS properties
      [
        "color",
        "background-color",
        "border-color",
        "outline-color",
        "text-decoration-color",
      ].forEach((prop) => {
        try {
          const styles = window.getComputedStyle(el);
          const color = styles.getPropertyValue(prop);
          el.style.setProperty(prop, safeColor(color));
        } catch (e) {
          // Fallback colors if any error occurs
          if (prop === "background-color")
            el.style.setProperty(prop, "#ffffff");
          if (prop === "color") el.style.setProperty(prop, "#000000");
        }
      });
    }

    // Process all child elements recursively
    Array.from(el.children).forEach(processElement);
  };

  processElement(clonedElement);

  // Basic styling to ensure consistent font
  clonedElement.style.fontFamily = "Arial, sans-serif";

  // Cleanup: remove the container from the DOM
  container.removeChild(clonedElement);
  document.body.removeChild(container);

  return clonedElement;
}
