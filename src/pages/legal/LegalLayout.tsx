import { ReactNode } from "react";
import Seo from "@/components/Seo";

export default function LegalLayout({
  title,
  children,
  seoTitle,
  seoDescription,
  path,
}: {
  title: string;
  children: ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  path?: string;
}) {
  return (
    <>
      {path && (
        <Seo
          title={seoTitle ?? `${title} — Rest-Tech`}
          description={seoDescription ?? `${title}. Правовые документы Rest-Tech — интегратора умной кухни для HoReCa.`}
          path={path}
        />
      )}
      <section className="gradient-hero text-primary-foreground py-12 md:py-16">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-2xl md:text-4xl">{title}</h1>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container-tight max-w-3xl">
          <article className="prose prose-sm md:prose-base max-w-none text-foreground space-y-4 [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted-foreground [&_li]:mb-1.5">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}