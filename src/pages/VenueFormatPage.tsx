import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Seo from "@/components/Seo";
import LeadForm from "@/components/leads/LeadForm";
import FormatLinks from "@/components/FormatLinks";
import { venueFormats } from "@/lib/venue-formats";
import { faq, service, SITE } from "@/lib/schema";
import NotFound from "@/pages/NotFound";

export default function VenueFormatPage({ formatId }: { formatId: string }) {
  const format = venueFormats.find((item) => item.id === formatId);
  useEffect(() => { window.scrollTo(0, 0); }, [formatId]);
  if (!format) return <NotFound />;
  const scrollToForm = () => document.getElementById("format-enquiry")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return <>
    <Seo title={`${format.title} – Rest-Tech`} description={format.description} path={format.path} jsonLd={[
      service({ name: format.title, description: format.description, path: format.path, serviceType: "Комплексное оснащение кухни", offers: format.equipment.map((item) => ({ name: item.name, description: item.detail })) }),
      faq(format.faqs),
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: SITE },
        { "@type": "ListItem", position: 2, name: "Оснащение под ключ", item: `${SITE}/osnashchenie-pod-klyuch` },
        { "@type": "ListItem", position: 3, name: format.name, item: `${SITE}${format.path}` },
      ] },
    ]} />
    <section className="relative overflow-hidden text-primary-foreground">
      <img src={format.image} alt={format.imageAlt} width={1536} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-foreground/75" />
      <div className="relative container-tight px-4 md:px-8 py-12 md:py-20">
        <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 text-xs text-primary-foreground/90 mb-10">
          <Link to="/" className="hover:underline">Главная</Link><ChevronRight className="w-3 h-3" />
          <Link to="/osnashchenie-pod-klyuch" className="hover:underline">Оснащение под ключ</Link><ChevronRight className="w-3 h-3" /><span aria-current="page">{format.name}</span>
        </nav>
        <p className="font-display font-semibold text-sm text-accent mb-3">REST-TECH / {format.focus}</p>
        <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight max-w-3xl mb-5">{format.title}</h1>
        <p className="max-w-2xl text-base md:text-lg text-primary-foreground/90 mb-8">{format.description}</p>
        <div className="flex flex-wrap gap-3"><Button variant="hero" size="lg" onClick={scrollToForm}>Рассчитать комплект <ArrowRight className="w-4 h-4 ml-2" /></Button><Button variant="heroOutline" size="lg" asChild><Link to="/solutions/design">Проектирование кухни</Link></Button></div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-8">{["Проект и спецификация", "Поставка и монтаж", "Обучение и сервис"].map((text) => <li className="flex items-center gap-2" key={text}><CheckCircle2 className="h-4 w-4 text-accent" />{text}</li>)}</ul>
      </div>
    </section>
    <section className="section-padding bg-background">
      <div className="container-tight">
        <p className="text-accent text-sm font-semibold mb-3">01 / Задачи формата</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Что учитываем до закупки</h2>
        <div className="grid md:grid-cols-3 gap-8">{format.challenges.map((item) => <div key={item.title} className="border-t-2 border-accent pt-5"><h3 className="font-display font-semibold text-lg mb-3">{item.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p></div>)}</div>
      </div>
    </section>
    <section className="section-padding bg-muted">
      <div className="container-tight">
        <p className="text-accent text-sm font-semibold mb-3">02 / Комплектация</p>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Оборудование под ваши процессы</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">Состав ниже – основа для обсуждения, а не фиксированный набор. Модели, количество и подключения определяем по заданию.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{format.equipment.map((item, index) => <article key={item.name} className="rounded-lg border border-border bg-card p-6"><span className="font-display text-accent text-sm font-semibold">0{index + 1}</span><h3 className="font-display font-semibold text-lg mt-3 mb-2">{item.name}</h3><p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p></article>)}</div>
        <Button variant="outline" asChild className="mt-6"><Link to="/solutions/equipment">Всё оборудование <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
      </div>
    </section>
    <section id="format-enquiry" className="section-padding bg-background scroll-mt-20">
      <div className="container-tight grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-accent text-sm font-semibold mb-3">03 / Расчёт проекта</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Смета под меню, помещение и бюджет</h2>
          <p className="text-muted-foreground mb-6">Стоимость, мощность и сроки рассчитываем индивидуально. В смете отдельно показываем оборудование, доставку, монтаж и согласованные дополнительные работы.</p>
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><ClipboardList className="h-5 w-5 text-accent" />Исходные данные</h3>
          <ul className="space-y-3 mb-6">{format.inputs.map((text) => <li key={text} className="flex gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-accent shrink-0" />{text}</li>)}</ul>
          <p className="text-sm text-muted-foreground mb-8">Если данных пока нет, укажите стадию проекта – определим следующий шаг вместе.</p>
          <h3 className="font-display font-semibold text-lg mb-3">Что получите после обсуждения</h3>
          <p className="text-sm text-muted-foreground">Согласованное задание, подбор оборудования с параметрами подключения и состав работ. Возможность поэтапной закупки обсуждаем под ваш бюджет.</p>
          <Button variant="link" asChild className="px-0 mt-4"><Link to="/calculator">Калькулятор инвестиций <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
        </div>
        <div className="border border-border rounded-lg bg-card p-5 md:p-8">
          <h2 className="font-display text-xl font-bold mb-2">Расчёт комплекта: {format.name.toLowerCase()}</h2>
          <p className="text-sm text-muted-foreground mb-6">Укажите параметры объекта и способ связи.</p>
          <LeadForm key={format.id} kind="kit" defaultVenue={format.venue} />
        </div>
      </div>
    </section>
    <section className="section-padding bg-muted">
      <div className="container-tight max-w-3xl"><h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Вопросы об оснащении</h2><Accordion type="single" collapsible>{format.faqs.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger className="text-left">{item.q}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent></AccordionItem>)}</Accordion></div>
    </section>
    <section className="section-padding bg-background"><div className="container-tight"><h2 className="font-display font-bold text-2xl mb-6">Другие форматы заведений</h2><FormatLinks current={format.id} /></div></section>
  </>;
}