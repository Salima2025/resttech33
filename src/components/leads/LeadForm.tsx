import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type LeadKind = "kit" | "project24" | "audit" | "iot" | "estimate" | "turnkey" | "callback";

export const LEAD_KINDS: Record<LeadKind, { title: string; subtitle: string; tag: string; cta: string }> = {
  kit: { title: "Рассчитать комплектацию кухни", subtitle: "Подберём оборудование под формат, площадь и меню. Спецификация и смета – за 1 рабочий день.", tag: "РАСЧЁТ КОМПЛЕКТА", cta: "Получить расчёт" },
  project24: { title: "Проект кухни за 24 часа", subtitle: "Расстановка оборудования, расчёт мощностей кВт, подводка воды и вентиляции.", tag: "ПРОЕКТ ЗА 24 ЧАСА", cta: "Заказать проект" },
  audit: { title: "Аудит существующей кухни", subtitle: "Покажем, где кухня теряет деньги: списания, энергия, простои оборудования.", tag: "АУДИТ", cta: "Заказать аудит" },
  iot: { title: "Получить расчёт IoT-системы", subtitle: "Датчики, уведомления, интеграция с POS/CRM и расчёт окупаемости.", tag: "IoT-КОНСУЛЬТАЦИЯ", cta: "Получить расчёт" },
  estimate: { title: "Запросить смету", subtitle: "Пришлите список или планировку – подготовим смету с поставкой и монтажом.", tag: "СМЕТА", cta: "Запросить смету" },
  turnkey: { title: "Оснащение кухни под ключ", subtitle: "Проект, поставка, монтаж, обучение и сервис – один подрядчик и одна гарантия.", tag: "ОСНАЩЕНИЕ ПОД КЛЮЧ", cta: "Обсудить проект" },
  callback: { title: "Заказать обратный звонок", subtitle: "Инженер перезвонит в рабочее время и ответит на вопросы.", tag: "ОБРАТНЫЙ ЗВОНОК", cta: "Жду звонка" },
};

const VENUES = ["Кафе", "Ресторан", "Сеть", "Доставка / Dark kitchen", "Пекарня", "Бар", "Кофейня", "Отель", "Столовая / кухня-сервис"];
const STAGES = ["Идея / поиск помещения", "Помещение есть, ремонт", "Модернизация действующего", "Открытие новой точки сети"];

const schema = z.object({
  name: z.string().trim().min(1, "Укажите имя").max(100),
  contact: z.string().trim().min(5, "Укажите телефон или Telegram").max(100),
  venue: z.string().min(1, "Выберите тип заведения"),
  city: z.string().trim().min(1, "Укажите город").max(100),
  stage: z.string().min(1, "Выберите стадию проекта"),
  area: z.string().trim().max(20).optional(),
  budget: z.string().trim().max(50).optional(),
  comment: z.string().trim().max(1500).optional(),
});

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";

export default function LeadForm({ kind, onDone, compact, defaultVenue = "" }: { kind: LeadKind; onDone?: () => void; compact?: boolean; defaultVenue?: string }) {
  const cfg = LEAD_KINDS[kind];
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const d = parsed.data;
    const isEmail = d.contact.includes("@") && !d.contact.startsWith("@");
    setSending(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const { error } = await supabase.functions.invoke("send-lead", {
        body: {
          source: `[${cfg.tag}] ${cfg.title}`,
          name: d.name,
          phone: isEmail ? "" : d.contact,
          email: isEmail ? d.contact : "",
          message: d.comment,
          website: raw.website,
          fields: {
            "Тип заведения": d.venue,
            "Город": d.city,
            "Стадия проекта": d.stage,
            "Площадь, м²": d.area,
            "Бюджет": d.budget,
            "Страница": window.location.pathname,
            "UTM": ["utm_source", "utm_medium", "utm_campaign"].map((k) => params.get(k)).filter(Boolean).join(" / "),
          },
        },
      });
      if (error) throw error;
      setDone(true);
      onDone?.();
    } catch (err) {
      console.error("send-lead failed:", err);
      toast.error("Не удалось отправить заявку. Позвоните нам: +7 (916) 603-40-63");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-foreground mb-2">Заявка принята</h3>
        <p className="text-sm text-muted-foreground">Инженер Rest-Tech свяжется с вами в течение рабочего дня.</p>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="text-xs text-destructive mt-1 block">{errors[k]}</span>;

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={compact ? "grid gap-4" : "grid sm:grid-cols-2 gap-4"}>
        <label className="block"><span className="text-sm font-medium text-foreground">Имя *</span>
          <input name="name" maxLength={100} placeholder="Алексей" className={input} />{err("name")}</label>
        <label className="block"><span className="text-sm font-medium text-foreground">Телефон или Telegram *</span>
          <input name="contact" maxLength={100} placeholder="+7 999 123-45-67 или @nick" className={input} />{err("contact")}</label>
        <label className="block"><span className="text-sm font-medium text-foreground">Тип заведения *</span>
          <select name="venue" defaultValue={defaultVenue} className={input}><option value="">Выберите</option>{VENUES.map((v) => <option key={v}>{v}</option>)}</select>{err("venue")}</label>
        <label className="block"><span className="text-sm font-medium text-foreground">Город *</span>
          <input name="city" maxLength={100} placeholder="Москва" className={input} />{err("city")}</label>
        <label className="block"><span className="text-sm font-medium text-foreground">Стадия проекта *</span>
          <select name="stage" defaultValue="" className={input}><option value="">Выберите</option>{STAGES.map((v) => <option key={v}>{v}</option>)}</select>{err("stage")}</label>
        <label className="block"><span className="text-sm font-medium text-foreground">Площадь кухни, м²</span>
          <input name="area" inputMode="numeric" maxLength={20} placeholder="40" className={input} /></label>
      </div>
      <label className="block"><span className="text-sm font-medium text-foreground">Комментарий</span>
        <textarea name="comment" rows={3} maxLength={1500} placeholder="Формат меню, сроки запуска, бюджет…" className={`${input} resize-none`} /></label>
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 w-4 h-4 accent-accent flex-shrink-0" />
        <span className="text-xs text-muted-foreground leading-relaxed">
          Я даю согласие на обработку персональных данных в соответствии с{" "}
          <a href="/legal/privacy" className="text-accent hover:underline">политикой обработки ПДн</a> и{" "}
          <a href="/legal/personal-data-consent" className="text-accent hover:underline">согласием на обработку ПДн</a>.
        </span>
      </label>
      <Button variant="accent" size="lg" className="w-full" type="submit" disabled={!consent || sending}>
        <Send className="w-4 h-4 mr-2" /> {sending ? "Отправляем…" : cfg.cta}
      </Button>
    </form>
  );
}
