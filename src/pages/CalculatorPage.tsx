import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Building2, Users, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";

type FormData = {
  format: string;
  guests: string;
  orders: string;
  avgCheck: string;
  kitchenType: string;
  problems: string[];
  name: string;
  email: string;
  phone: string;
};

const formats = ["Кафе", "Ресторан", "Бар", "Сеть ресторанов", "Кухня-сервис"];
const kitchenTypes = ["Европейская", "Азиатская", "Смешанная", "Фаст-фуд", "Кондитерская"];
const problemOptions = [
  "Простои оборудования",
  "Перегрев кухни",
  "Ошибки сборки заказов",
  "Перерасход продуктов",
  "Медленная отдача блюд",
  "Высокие расходы на электроэнергию",
];

const steps = ["Формат", "Параметры", "Проблемы", "Контакты", "Результат"];

export default function CalculatorPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    format: "",
    guests: "",
    orders: "",
    avgCheck: "",
    kitchenType: "",
    problems: [],
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
    if (step === 3) return !!form.name && !!form.email;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setStep(4);
  };

  // Fake ROI calculation
  const orders = parseInt(form.orders) || 200;
  const avgCheck = parseInt(form.avgCheck) || 800;
  const problemCount = form.problems.length;
  const savingsPercent = Math.min(15 + problemCount * 5, 42);
  const monthlySavings = Math.round(orders * 30 * avgCheck * (savingsPercent / 100) * 0.15);
  const paybackMonths = Math.max(2, Math.round(8 - problemCount));

  return (
    <>
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Калькулятор ROI</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Рассчитайте потенциальную экономию от оптимизации вашей кухни за 2 минуты.
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
              {step === 0 && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Выберите формат заведения</h2>
                  <p className="text-muted-foreground mb-6 text-sm">Это поможет нам точнее рассчитать экономику.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formats.map((f) => (
                      <button
                        key={f}
                        onClick={() => setForm((d) => ({ ...d, format: f }))}
                        className={`p-4 rounded-xl border text-sm font-medium text-left transition-all ${
                          form.format === f
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-accent/40"
                        }`}
                      >
                        <Building2 className="w-5 h-5 mb-2 text-accent" />
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Параметры заведения</h2>
                  <p className="text-muted-foreground mb-6 text-sm">Укажите основные метрики для расчёта.</p>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" /> Количество гостей в день
                      </span>
                      <input
                        type="number"
                        value={form.guests}
                        onChange={(e) => setForm((d) => ({ ...d, guests: e.target.value }))}
                        placeholder="150"
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent" /> Количество заказов в день
                      </span>
                      <input
                        type="number"
                        value={form.orders}
                        onChange={(e) => setForm((d) => ({ ...d, orders: e.target.value }))}
                        placeholder="200"
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-foreground mb-1">Средний чек (₽)</span>
                      <input
                        type="number"
                        value={form.avgCheck}
                        onChange={(e) => setForm((d) => ({ ...d, avgCheck: e.target.value }))}
                        placeholder="800"
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-foreground mb-1">Тип кухни</span>
                      <select
                        value={form.kitchenType}
                        onChange={(e) => setForm((d) => ({ ...d, kitchenType: e.target.value }))}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Выберите тип</option>
                        {kitchenTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Текущие проблемы</h2>
                  <p className="text-muted-foreground mb-6 text-sm">Отметьте, с чем вы сталкиваетесь на кухне.</p>
                  <div className="space-y-3">
                    {problemOptions.map((p) => (
                      <button
                        key={p}
                        onClick={() => toggleProblem(p)}
                        className={`flex items-center gap-3 w-full p-4 rounded-xl border text-sm text-left transition-all ${
                          form.problems.includes(p)
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-accent/40"
                        }`}
                      >
                        <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${form.problems.includes(p) ? "text-accent" : "text-muted-foreground"}`} />
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Ваши контакты</h2>
                  <p className="text-muted-foreground mb-6 text-sm">Для получения персонального отчёта.</p>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-sm font-medium text-foreground">Имя *</span>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((d) => ({ ...d, name: e.target.value }))}
                        placeholder="Алексей Иванов"
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-foreground">Email *</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((d) => ({ ...d, email: e.target.value }))}
                        placeholder="alex@restaurant.ru"
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-foreground">Телефон</span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((d) => ({ ...d, phone: e.target.value }))}
                        placeholder="+7 (999) 123-45-67"
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                  </div>
                </div>
              )}

              {step === 4 && submitted && (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Ваш результат</h2>
                  <p className="text-muted-foreground mb-8 text-sm">{form.format} · {form.orders} заказов/день · {form.problems.length} проблем</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                      <p className="text-3xl font-display font-bold text-accent">{savingsPercent}%</p>
                      <p className="text-sm text-muted-foreground mt-1">потенциальная экономия</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                      <p className="text-3xl font-display font-bold text-foreground">{monthlySavings.toLocaleString("ru")} ₽</p>
                      <p className="text-sm text-muted-foreground mt-1">экономия в месяц</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                      <p className="text-3xl font-display font-bold text-foreground">{paybackMonths} мес.</p>
                      <p className="text-sm text-muted-foreground mt-1">срок окупаемости</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-6 text-left mb-8">
                    <h3 className="font-display font-semibold text-foreground mb-3">Рекомендации:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {form.problems.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{p} — решается с помощью {p.includes("оборудов") || p.includes("Простои") ? "модернизации оборудования" : p.includes("электро") ? "IoT-мониторинга" : "автоматизации процессов"}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Подробный PDF-отчёт отправлен на <strong className="text-foreground">{form.email}</strong>
                  </p>
                  <Button variant="accent" size="lg">Заказать консультацию</Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
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
                <Button variant="hero" onClick={handleSubmit} disabled={!canNext()}>
                  Получить результат <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
