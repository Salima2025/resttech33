import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Printer, Send, Utensils, Zap, Users } from "lucide-react";
import type { CalcFormData } from "@/pages/CalculatorPage";
import { calcRoi, money, scenarioLabel, type Scenario } from "@/lib/roi";

interface Props {
  form: CalcFormData;
}

const scenarios: Scenario[] = ["conservative", "base", "optimistic"];

export default function CalculatorResult({ form }: Props) {
  const [scenario, setScenario] = useState<Scenario>("base");
  const r = calcRoi(form, scenario);

  const tgText = encodeURIComponent(
    `Расчёт Rest-Tech: ${form.format}, ${form.orders} заказов/день, экономия ~${money(r.monthlySavings)}/мес, окупаемость ${r.paybackMonths} мес.`
  );

  return (
    <div className="text-center print:text-left">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 print:hidden">
        <CheckCircle className="w-8 h-8 text-accent" />
      </div>
      <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Вот какую экономию может обеспечить Rest‑Tech</h2>
      <p className="text-muted-foreground mb-6 text-sm">{form.format} · {form.orders} заказов/день · {form.problems.length} проблем</p>

      {/* Сценарии */}
      <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-xl bg-muted mb-8 print:hidden">
        {scenarios.map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              scenario === s ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {scenarioLabel[s]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <p className="text-3xl font-display font-bold text-accent">{r.savingsPercent}%</p>
          <p className="text-sm text-muted-foreground mt-1">снижение операционных расходов</p>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <p className="text-3xl font-display font-bold text-foreground">{money(r.monthlySavings)}</p>
          <p className="text-sm text-muted-foreground mt-1">экономия в месяц</p>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <p className="text-3xl font-display font-bold text-foreground">{r.paybackMonths} мес.</p>
          <p className="text-sm text-muted-foreground mt-1">срок окупаемости IoT‑системы</p>
        </div>
      </div>

      {/* Декомпозиция */}
      <div className="bg-card rounded-2xl border border-border p-6 text-left mb-8">
        <h3 className="font-display font-semibold text-foreground mb-4">Из чего складывается экономия</h3>
        <div className="space-y-4">
          {[
            { icon: Utensils, label: "Food Cost: списания, брак, пересортица", value: r.foodCost, share: 45 },
            { icon: Zap, label: "OpEx: электроэнергия и аварии оборудования", value: r.opex, share: 30 },
            { icon: Users, label: "Labor Cost: рутинные трудозатраты персонала", value: r.labor, share: 25 },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <row.icon className="w-4 h-4 text-accent flex-shrink-0" />
                  {row.label}
                </span>
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">{money(row.value)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${row.share}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t border-border mt-5 pt-4 text-sm">
          <span className="text-muted-foreground">Экономия за год</span>
          <span className="font-display font-bold text-foreground">{money(r.yearlySavings)}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-muted-foreground">Ориентировочные инвестиции</span>
          <span className="font-semibold text-foreground">{money(r.investment)}</span>
        </div>
      </div>

      <div className="bg-muted/50 rounded-2xl p-6 text-left mb-8">
        <h3 className="font-display font-semibold text-foreground mb-3">Рекомендации Rest‑Tech:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <span>Сокращение времени персонала на рутину: 20–30 %</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <span>Снижение потерь заказов и перерасхода продуктов: 10–25 %</span>
          </li>
          {form.problems.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>{p} – решается с помощью {p.includes("оборудов") || p.includes("простои") || p.includes("Простои") ? "модернизации оборудования и IoT‑контроля" : p.includes("электро") ? "IoT‑мониторинга энергопотребления" : "автоматизации процессов Rest‑Tech"}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Технологическая карта сокращения издержек и расчёт окупаемости будут направлены на{" "}
        <strong className="text-foreground">{form.email}</strong> в течение 1 рабочего дня.
      </p>
      <div className="flex flex-wrap justify-center gap-3 print:hidden">
        <Link to="/contacts">
          <Button variant="accent" size="lg">Запросить коммерческое предложение</Button>
        </Link>
        <a href={`https://t.me/info_resttech_bot?text=${tgText}`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg">
            <Send className="w-4 h-4 mr-2" /> Обсудить в Telegram
          </Button>
        </a>
        <Button variant="ghost" size="lg" onClick={() => window.print()}>
          <Printer className="w-4 h-4 mr-2" /> Сохранить расчёт в PDF
        </Button>
      </div>
    </div>
  );
}
