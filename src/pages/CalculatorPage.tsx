import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Building2, Users, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";
import CalculatorStepFormat from "@/components/calculator/StepFormat";
import CalculatorStepParams from "@/components/calculator/StepParams";
import CalculatorStepProblems from "@/components/calculator/StepProblems";
import CalculatorStepContacts from "@/components/calculator/StepContacts";
import CalculatorResult from "@/components/calculator/Result";
import LiveEstimate from "@/components/calculator/LiveEstimate";
import { ORG, faq } from "@/lib/schema";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type CalcFormData = {
  format: string;
  guests: string;
  orders: string;
  avgCheck: string;
  kitchenCheck: string;
  points: string;
  problems: string[];
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

const steps = ["Формат", "Параметры", "Проблемы", "Контакты", "Результат"];

export default function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CalcFormData>({
    format: "",
    guests: "",
    orders: "",
    avgCheck: "",
    kitchenCheck: "",
    points: "",
    problems: [],
    name: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const toggleProblem = (p: string) => {
    setForm((f) => ({
      ...f,
      problems: f.problems.includes(p) ? f.problems.filter((x) => x !== p) : [...f.problems, p],
    }));
  };

  const canNext = () => {
    if (step === 0) return !!form.format;
    if (step === 1) return !!form.guests && !!form.orders && !!form.avgCheck;
    if (step === 2) return form.problems.length > 0;
    if (step === 3) return !!form.name && !!form.email && form.consent;
    return true;
  };

  const handleSubmit = async () => {
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-lead", {
        body: {
          source: "Калькулятор инвестиций",
          name: form.name,
          email: form.email,
          phone: form.phone,
          fields: {
            "Формат": form.format,
            "Гостей в день": form.guests,
            "Заказов в день": form.orders,
            "Средний чек": form.avgCheck,
            "Себестоимость кухни": form.kitchenCheck,
            "Точек": form.points,
            "Проблемы": form.problems,
          },
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error("send-lead failed:", err);
      toast.error("Заявка не ушла в отдел продаж, но расчёт доступен. Свяжитесь с нами по телефону.");
    } finally {
      setSending(false);
      setSubmitted(true);
      setStep(4);
    }
  };

  return (
    <>
      <Seo
        title="Калькулятор инвестиций в умную кухню – Rest-Tech"
        description="Рассчитайте окупаемость оборудования и IoT для ресторана за 2 минуты. Прогноз экономии 15–40% операционных расходов."
        path="/calculator"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Калькулятор окупаемости умной кухни Rest-Tech",
            url: "https://resttech33.lovable.app/calculator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Интерактивный B2B-инструмент финансового моделирования для предприятий общепита: расчёт экономии по Food Cost, энергии и трудозатратам, срок окупаемости оборудования и IoT.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
            provider: ORG,
          },
          faq([
            { q: "Сколько занимает расчёт окупаемости?", a: "Около 2 минут: формат заведения, параметры трафика, текущие проблемы кухни." },
            { q: "Что я получу по итогам расчёта?", a: "Технологическую карту сокращения издержек и расчёт окупаемости оборудования в трёх сценариях в течение 1 рабочего дня." },
            { q: "Насколько снижаются операционные расходы?", a: "От 15 до 40 % в зависимости от формата, количества точек и выявленных точек потерь." },
          ]),
        ]}
      />
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Рассчитайте экономию с Rest‑Tech</h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Получите расчёт снижения операционных расходов и срок окупаемости за 2 минуты.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight max-w-2xl">
          {/* Steps indicator */}
          <div className="flex items-center gap-1 mb-10 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  i === step ? "bg-accent text-accent-foreground" : i < step ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                }`}>
                  <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold">
                    {i < step ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && <div className="w-6 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && <CalculatorStepFormat form={form} setForm={setForm} />}
              {step === 1 && <><CalculatorStepParams form={form} setForm={setForm} /><LiveEstimate form={form} /></>}
              {step === 2 && <><CalculatorStepProblems form={form} toggleProblem={toggleProblem} /><LiveEstimate form={form} /></>}
              {step === 3 && <CalculatorStepContacts form={form} setForm={setForm} />}
              {step === 4 && submitted && <CalculatorResult form={form} />}
            </motion.div>
          </AnimatePresence>

          {step < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Назад
              </Button>
              {step < 3 ? (
                <Button variant="accent" onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
                  Далее <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button variant="hero" onClick={handleSubmit} disabled={!canNext() || sending}>
                  {sending ? "Отправляем…" : "Получить расчет"} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
