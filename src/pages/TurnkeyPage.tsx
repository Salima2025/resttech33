import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { service, faq } from "@/lib/schema";
import LeadForm from "@/components/leads/LeadForm";
import { useLeadDialog } from "@/components/leads/LeadDialogProvider";
import WorkProcess from "@/components/home/WorkProcess";

const includes = [
  { t: "Аудит и технологическое задание", d: "Обмеры, анализ меню и потоков, расчёт производительности кухни." },
  { t: "Проект кухни", d: "Расстановка, электрика (кВт), вода, канализация, вентиляция, спецификация." },
  { t: "Подбор и поставка оборудования", d: "Тепловое, холодильное, моечное, нейтральное – прямые контракты с производителями." },
  { t: "Монтаж и пусконаладка", d: "Доставка, подъём, подключение и запуск сертифицированными инженерами." },
  { t: "Обучение персонала", d: "Работа на оборудовании, регламенты мойки и ежедневного ухода." },
  { t: "Сервис и IoT-мониторинг", d: "Гарантийное обслуживание, контроль температур и энергопотребления." },
];

const kits = [
  { name: "Кафе 40–120 мест", area: "25–45 м²", power: "от 30 кВт", term: "от 21 дня" },
  { name: "Ресторан 120–250 мест", area: "60–120 м²", power: "от 60 кВт", term: "от 35 дней" },
  { name: "Доставка / Dark kitchen", area: "30–60 м²", power: "от 25 кВт", term: "от 14 дней" },
  { name: "Столовая / кухня-сервис", area: "80–200 м²", power: "от 80 кВт", term: "от 30 дней" },
];

const results = [
  "Один подрядчик и один договор вместо 5–7 поставщиков",
  "Единая гарантия на оборудование и монтаж",
  "Фиксированная смета и график поставки",
  "Кухня проходит проверки Роспотребнадзора и МЧС",
  "Снижение операционных расходов на 15–40% за счёт правильного парка и IoT",
];

const faqs = [
  { q: "Сколько времени занимает оснащение под ключ?", a: "От 14 дней для доставки до 35+ дней для ресторана на 120–250 мест. Точный график фиксируется в договоре после аудита." },
  { q: "Можно ли оснащать поэтапно?", a: "Да. Проект делается на весь объём, а оборудование поставляется очередями под ваш бюджет и сроки открытия." },
  { q: "Работаете ли вы в регионах?", a: "Да, поставляем и монтируем оборудование по России; проектирование выполняется дистанционно по обмерам." },
  { q: "Что входит в гарантию?", a: "Гарантия производителя на оборудование и гарантия Rest-Tech на монтажные работы, сервисное обслуживание по регламенту." },
];

export default function TurnkeyPage() {
  const open = useLeadDialog();
  return (
    <>
      <Seo
        title="Оснащение кухни ресторана под ключ – Rest-Tech"
        description="Оснащение кафе, ресторанов, доставки и столовых под ключ: проект, поставка оборудования, монтаж, обучение, сервис и IoT. Один подрядчик, единая гарантия."
        path="/osnashchenie-pod-klyuch"
        jsonLd={[
          service({ name: "Оснащение кухни под ключ", description: "Проектирование, поставка, монтаж, обучение и сервис оборудования для HoReCa", path: "/osnashchenie-pod-klyuch", serviceType: "Комплексное оснащение предприятий общественного питания" }),
          faq(faqs),
        ]}
      />
      <section className="gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container-tight px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Single Window</p>
            <h1 className="font-display font-bold text-3xl md:text-5xl mb-5">Оснащение кухни под ключ</h1>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Проектируем, поставляем, монтируем, обучаем персонал и обслуживаем. Одна ответственность за результат – от пустого помещения до работающей кухни.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={() => open("turnkey")}>Обсудить проект <ArrowRight className="w-4 h-4 ml-1" /></Button>
              <Button variant="heroOutline" size="lg" onClick={() => open("project24")}>Проект за 24 часа</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">Что входит в услугу</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {includes.map((x, i) => (
              <div key={x.t} className="bg-card rounded-2xl p-6 border border-border shadow-card">
                <span className="font-display font-bold text-accent text-sm">0{i + 1}</span>
                <h3 className="font-display font-semibold text-lg text-foreground mt-2 mb-2">{x.t}</h3>
                <p className="text-sm text-muted-foreground">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkProcess />

      <section className="section-padding bg-background">
        <div className="container-tight">
          <h2 className="font-display font-bold text-3xl text-foreground mb-3">Примеры комплектаций</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">Ориентиры по площади, мощности и срокам. Точные значения – после аудита помещения.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kits.map((k) => (
              <div key={k.name} className="bg-card rounded-2xl p-6 border border-border shadow-card flex flex-col">
                <h3 className="font-display font-semibold text-foreground mb-4">{k.name}</h3>
                <dl className="text-sm space-y-2 mb-6 flex-1">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Площадь</dt><dd className="font-medium text-foreground">{k.area}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Мощность</dt><dd className="font-medium text-foreground">{k.power}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Срок</dt><dd className="font-medium text-foreground">{k.term}</dd></div>
                </dl>
                <Button variant="outline" onClick={() => open("kit")}>Рассчитать комплект</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-tight grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display font-bold text-3xl text-foreground mb-6">Результат для клиента</h2>
            <ul className="space-y-3 mb-8">
              {results.map((r) => (
                <li key={r} className="flex gap-3 text-foreground"><CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />{r}</li>
              ))}
            </ul>
            <div className="flex gap-3 items-start bg-card rounded-xl p-5 border border-border">
              <ShieldCheck className="w-6 h-6 text-accent flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Гарантия и сервис: гарантийное и постгарантийное обслуживание, регламентное ТО, запчасти и расходники.</p>
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground mt-10 mb-4">Частые вопросы</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q}><h3 className="font-semibold text-foreground">{f.q}</h3><p className="text-sm text-muted-foreground">{f.a}</p></div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-card md:sticky md:top-24">
            <h2 className="font-display font-bold text-xl text-foreground mb-1">Заявка на оснащение под ключ</h2>
            <p className="text-sm text-muted-foreground mb-5">Ответим в течение рабочего дня.</p>
            <LeadForm kind="turnkey" compact />
          </div>
        </div>
      </section>
    </>
  );
}
