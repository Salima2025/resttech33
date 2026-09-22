import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Cpu, Wifi, BarChart3, Bell, ArrowRight, AlertTriangle,
  TrendingDown, Eye, Users, LayoutDashboard, Brain, Settings2,
  Building2, Store, Truck, Wine, XCircle,
} from "lucide-react";
import Seo from "@/components/Seo";
import { ORG, service, faq, itemList } from "@/lib/schema";

const stages = [
  { step: "01", title: "Аудит", desc: "Обследуем кухню, определяем точки потерь и приоритеты автоматизации." },
  { step: "02", title: "Проектирование", desc: "Разрабатываем архитектуру датчиков, интеграций и отчётности." },
  { step: "03", title: "Монтаж", desc: "Устанавливаем датчики, подключаем оборудование к платформе." },
  { step: "04", title: "Обучение", desc: "Учим персонал работать с данными и реагировать на тревоги." },
  { step: "05", title: "Сопровождение", desc: "Поддержка, обновления, анализ эффективности на постоянной основе." },
];

const features = [
  { icon: Wifi, title: "Мониторинг оборудования", desc: "Температура, нагрузка, время работы – всё в реальном времени." },
  { icon: Bell, title: "Тревоги и уведомления", desc: "Мгновенные оповещения о сбоях, перегреве, отклонениях." },
  { icon: BarChart3, title: "Аналитика и отчёты", desc: "Дашборды для управляющих: расходы, эффективность, KPI кухни." },
  { icon: Cpu, title: "Интеграция с CRM/POS", desc: "Связь с вашими системами учёта, R-Keeper, iiko и др." },
];

const painPoints = [
  "Вы не знаете, где теряются деньги",
  "Персонал работает «по-своему»",
  "Ошибки и задержки – норма",
  "Контроль = постоянное присутствие",
];

const moneyLeaks = [
  "Списания продуктов",
  "Пересортица",
  "Недовыдача",
  "Медленная кухня = потерянные гости",
];

const howItWorks = [
  { icon: Eye, title: "Контроль процессов", desc: "Отслеживание всех этапов приготовления в реальном времени." },
  { icon: Brain, title: "AI-аналитика", desc: "Где теряются деньги, где допускаются ошибки – без догадок." },
  { icon: Users, title: "Управление персоналом", desc: "Стандарты вместо «как привыкли». Каждый знает свою задачу." },
  { icon: LayoutDashboard, title: "Дашборд собственника", desc: "Все процессы и KPI в одном месте – на телефоне." },
];

const results = [
  { value: "+15–30%", label: "к прибыли" },
  { value: "−40%", label: "списаний и потерь" },
  { value: "100%", label: "прозрачность бизнеса" },
  { value: "24/7", label: "контроль без присутствия" },
];

const audience = [
  { icon: Wine, title: "Рестораны", desc: "Полный контроль кухни и зала." },
  { icon: Truck, title: "Dark kitchen", desc: "Производительность и логистика без сбоев." },
  { icon: Building2, title: "Сети", desc: "Единый стандарт по всем точкам." },
  { icon: Store, title: "Гастробары", desc: "Скорость подачи и контроль расходов." },
];

const cases = [
  {
    title: "Кафе 80–120 мест",
    desc: "IoT‑контроль печей и холодильников, обучение персонала, мобильные тревоги.",
    result: "−25% простоев, окупаемость 6–12 мес.",
    budget: "150–300 тыс ₽",
  },
  {
    title: "Ресторан 120–200 мест",
    desc: "Интеграция с CRM/POS, аналитика расхода продуктов, контроль workflow.",
    result: "−20% ошибок сборки, окупаемость 12–18 мес.",
    budget: "250–500 тыс ₽",
  },
  {
    title: "Сеть 5–10+ точек",
    desc: "Единая платформа: централизованная аналитика, единый стандарт, мониторинг.",
    result: "−30% операционных расходов в сети",
    budget: "1–3 млн ₽",
  },
  {
    title: "Dark kitchen / кухня‑сервис",
    desc: "Мониторинг логистики, контроль workflow, прозрачная производительность.",
    result: "×2 производительность кухни",
    budget: "300–700 тыс ₽",
  },
];

const comparison = [
  { name: "iiko", role: "Учёт. Считают прошлое." },
  { name: "r_keeper", role: "Учёт. Считают прошлое." },
  { name: "Poster", role: "Учёт. Считают прошлое." },
];

export default function IoTPage() {
  return (
    <>
      <Seo
        title="Ресторанные технологии и IoT-мониторинг – Rest-Tech"
        description="Операционная система кухни: IoT-датчики, мониторинг оборудования, тревоги, интеграция с iiko, r_keeper, Poster. Окупаемость 6–18 мес."
        path="/solutions/iot"
        jsonLd={[
          service({
            name: "Внедрение IoT-экосистемы для кухни под ключ",
            description:
              "Аудит, проектирование, монтаж датчиков, обучение и сопровождение: мониторинг оборудования, тревоги, аналитика, интеграция с POS и системами учёта.",
            path: "/solutions/iot",
            serviceType: "Внедрение IoT-мониторинга кухни в HoReCa",
            offers: features.map((f) => ({ name: f.title, description: f.desc })),
          }),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Платформа Rest-Tech для мониторинга кухни",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, iOS, Android",
            description:
              "Платформа мониторинга кухонного оборудования в реальном времени: температура, нагрузка, время работы, тревоги, дашборды KPI и интеграции с iiko, r_keeper, Poster.",
            featureList: features.map((f) => f.title),
            provider: ORG,
            offers: { "@type": "Offer", priceCurrency: "RUB", price: "150000" },
          },
          faq([
            { q: "За сколько окупается IoT-система на кухне?", a: "Для кафе – 6–12 месяцев, для ресторана – 12–18 месяцев, в сетях – быстрее за счёт масштаба." },
            { q: "Сколько занимает внедрение?", a: "Пять этапов: аудит, проектирование, монтаж, обучение персонала и сопровождение. Типовой срок – от 2 до 6 недель." },
            { q: "Подходит ли система к уже установленному оборудованию?", a: "Да, датчики устанавливаются на действующее тепловое и холодильное оборудование без его замены." },
            { q: "Как это сочетается с iiko и r_keeper?", a: "Системы учёта считают прошлое, Rest-Tech управляет настоящим. Мы интегрируемся с iiko, r_keeper и Poster." },
          ]),
          itemList(
            "IoT-пакеты Rest-Tech по форматам заведений",
            cases.map((c) => ({ name: c.title, description: `${c.desc} Результат: ${c.result}. Бюджет: ${c.budget}.` }))
          ),
        ]}
      />
      <section className="gradient-hero text-primary-foreground py-14 md:py-20">
        <div className="container-tight px-4 md:px-8">
          <p className="text-accent font-display font-semibold text-sm tracking-wider uppercase mb-4">Rest‑Tech</p>
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-4">Операционная система кухни</h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl">
            Мы превращаем кухню в управляемую систему, где каждый процесс прозрачен, измерим и автоматизирован.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-tight">
          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Effect */}
          <div className="bg-muted/50 rounded-2xl p-8 mb-16">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6 text-center">Эффект для бизнеса</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "15–40%", label: "снижение операционных расходов" },
                { value: "20–30%", label: "сокращение времени простоев" },
                { value: "10–25%", label: "снижение ошибок и перерасхода" },
                { value: "6–18 мес.", label: "срок окупаемости" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-bold text-2xl text-accent">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PAIN BLOCK */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-4">
                <AlertTriangle className="w-3.5 h-3.5" /> ПРОБЛЕМА
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Сейчас кухня работает <span className="text-destructive">против вас</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
              {painPoints.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border"
                >
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{p}</p>
                </motion.div>
              ))}
            </div>
            <div className="max-w-3xl mx-auto bg-destructive/5 border border-destructive/20 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-foreground">
                Важно: чем больше точек – тем больше хаоса.
              </p>
            </div>
          </div>

          {/* COSTS */}
          <div className="mb-16 bg-foreground text-primary-foreground rounded-2xl p-8 md:p-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3 text-center">
              Это стоит вам денег <span className="text-accent">каждый день</span>
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 my-8">
              {moneyLeaks.map((m) => (
                <div key={m} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-4 text-center">
                  <TrendingDown className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm">{m}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
              Вы теряете прибыль не потому что мало гостей,
              <br className="hidden md:block" /> а потому что <span className="text-accent font-semibold">нет системы</span>.
            </p>
          </div>

          {/* SOLUTION / POSITIONING */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
              РЕШЕНИЕ
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Rest‑Tech – операционная система кухни
            </h2>
            <p className="text-muted-foreground text-lg">
              Мы превращаем кухню в управляемую систему, где каждый процесс прозрачен, измерим и автоматизирован.
            </p>
          </div>

          {/* HOW IT WORKS */}
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">Как это работает</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {howItWorks.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 border border-border shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <h.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="font-display font-bold text-foreground mb-2">{h.title}</p>
                <p className="text-sm text-muted-foreground">{h.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* RESULTS */}
          <div className="mb-16 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">Что вы получаете</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((r) => (
                <div key={r.label} className="text-center">
                  <p className="font-display font-bold text-3xl md:text-4xl text-accent">{r.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{r.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stages */}
          <h2 className="font-display font-bold text-2xl text-foreground mb-8 text-center">Этапы внедрения</h2>
          <div className="space-y-4 mb-16 max-w-2xl mx-auto">
            {stages.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <span className="font-display font-bold text-2xl text-accent/30 flex-shrink-0 w-8">{s.step}</span>
                <div className="bg-card rounded-xl p-4 border border-border shadow-card flex-1">
                  <p className="font-semibold text-foreground text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AUDIENCE – кому это нужно */}
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">Кому это нужно</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {audience.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 border border-border shadow-card text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <a.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="font-display font-bold text-foreground mb-1">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* IoT CASES */}
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3 text-center">IoT‑кейсы внедрения Rest‑Tech</h2>
          <p className="text-muted-foreground text-center mb-8 text-sm">Реальные примеры по форматам заведений</p>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-card flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{c.desc}</p>
                <div className="bg-accent/10 rounded-lg px-3 py-2 mb-3">
                  <p className="text-sm font-semibold text-accent">{c.result}</p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Бюджет: <strong className="text-foreground">{c.budget}</strong></p>
                <Link to="/contacts">
                  <Button variant="accent" size="sm" className="w-full">
                    Запросить аналогичный проект <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* COMPARISON: iiko / r_keeper / Poster */}
          <div className="mb-16 bg-muted/40 rounded-2xl p-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3 text-center">
              Новый стандарт управления рестораном
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto text-sm">
              Вы теряете деньги – мы показываем где. Учётные системы считают прошлое, Rest‑Tech управляет настоящим.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="bg-card rounded-xl p-5 border border-border">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Учётные системы</p>
                <div className="space-y-2">
                  {comparison.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-sm">
                      <span className="font-display font-bold text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.role}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  Считают прошлое – отчёт за вчерашний день.
                </p>
              </div>
              <div className="bg-foreground text-primary-foreground rounded-xl p-5 border border-accent/30 shadow-elevated">
                <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Rest‑Tech</p>
                <p className="font-display font-bold text-xl mb-2">Контроль + деньги</p>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Мы управляем настоящим: показываем где теряются деньги в момент потерь, а не через неделю.
                </p>
                <div className="space-y-1.5 text-sm">
                  <p className="flex items-center gap-2"><Settings2 className="w-4 h-4 text-accent" /> Контроль процессов</p>
                  <p className="flex items-center gap-2"><Brain className="w-4 h-4 text-accent" /> AI‑аналитика потерь</p>
                  <p className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-accent" /> Дашборд собственника</p>
                </div>
              </div>
            </div>
          </div>

          {/* OFFER – Try free */}
          <div className="mb-16 gradient-hero text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <p className="text-accent font-display font-semibold text-sm tracking-wider uppercase mb-3">Оффер</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Попробуйте бесплатно</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Запустим пилот и покажем, где вы теряете деньги уже в первые 7 дней.
            </p>
            <Link to="/contacts">
              <Button variant="hero" size="lg">Запросить демо <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </div>

          {/* FINAL – дожим */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
              Вы можете продолжать управлять кухней <span className="text-muted-foreground">вручную</span>
              <br />
              или превратить её в систему, <span className="text-accent">которая зарабатывает</span>.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacts">
                <Button variant="accent" size="lg">Запросить IoT‑аудит <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline" size="lg">Рассчитать экономию</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
