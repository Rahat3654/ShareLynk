import { Globe, Smartphone } from "lucide-react";

// Monochrome OS/platform glyphs for the download table. These are generic
// platform marks (Android/Windows/Apple/Linux) — NOT the ShareLynk brand logo.
export function PlatformIcon({ icon, className = "h-6 w-6" }: { icon: string; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "currentColor" as const };
  switch (icon) {
    case "android":
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M17.6 9.48l1.84-3.18a.4.4 0 00-.7-.4l-1.86 3.23a11.4 11.4 0 00-9.76 0L5.26 5.9a.4.4 0 10-.7.4L6.4 9.48A10.8 10.8 0 001 18h22a10.8 10.8 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
        </svg>
      );
    case "windows":
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 5.4l7.3-1v7.1H3V5.4zM3 12.6h7.3v7.1L3 18.6v-6zM11.2 4.3L21 3v8.4h-9.8V4.3zM11.2 12.6H21V21l-9.8-1.3v-7.1z" />
        </svg>
      );
    case "apple":
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M16.36 12.9c-.02-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.3 2-1.4 2.43-.36 6.03 1.01 8 .67.96 1.47 2.04 2.51 2 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.98 2.44-1.95.77-1.12 1.09-2.2 1.11-2.26-.02-.01-2.13-.82-2.15-3.24zM14.4 6.62c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.21-.52.6-.98 1.56-.86 2.48.9.07 1.83-.46 2.4-1.13z" />
        </svg>
      );
    case "linux":
      return (
        <svg {...common} xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2c-2.2 0-3.3 1.9-3.3 4 0 1.3.2 2.3.1 3.4-.1.9-.7 1.7-1.3 2.6-.7 1-1.5 2-1.9 3.4-.2.7-.1 1.4.2 1.8-.2.5-.1 1 .3 1.3.5.4 1.3.4 2 .6.7.2 1.2.6 1.9.8.3.1.6 0 .8-.2.8.2 1.7.2 2.5 0 .2.2.5.3.8.2.7-.2 1.2-.6 1.9-.8.7-.2 1.5-.2 2-.6.4-.3.5-.8.3-1.3.3-.4.4-1.1.2-1.8-.4-1.4-1.2-2.4-1.9-3.4-.6-.9-1.2-1.7-1.3-2.6-.1-1.1.1-2.1.1-3.4 0-2.1-1.1-4-3.4-4zm-1.7 4.7c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9zm3.4 0c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9z" />
        </svg>
      );
    case "globe":
      return <Globe className={className} aria-hidden />;
    default:
      return <Smartphone className={className} aria-hidden />;
  }
}
