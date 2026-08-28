"use client";

import { apiGet } from "@/lib/api";
import type { PlatformDownload } from "@/lib/types";
import { fallbackDownloads } from "@/data/fallback-downloads";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DownloadTable } from "./DownloadTable";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";
import { useEffect, useState } from "react";

export function Downloads() {
  const { language } = useLanguage();
  const t = translations[language].downloadsPage;
  const [platforms, setPlatforms] = useState<PlatformDownload[]>(fallbackDownloads);

  useEffect(() => {
    async function loadPlatforms() {
      try {
        const res = await apiGet<PlatformDownload[]>("/downloads");
        if (res?.length) setPlatforms(res);
      } catch {
        setPlatforms(fallbackDownloads);
      }
    }
    loadPlatforms();
  }, []);

  return (
    <section id="downloads" className="section scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleStart} <span className="text-gradient">{t.titleGradient}</span>
            </>
          }
          description={t.description}
        />
        <DownloadTable platforms={platforms} />
      </div>
    </section>
  );
}
