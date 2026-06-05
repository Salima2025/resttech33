import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { CalcFormData } from "@/pages/CalculatorPage";

interface Props {
  form: CalcFormData;
}

export default function CalculatorResult({ form }: Props) {
  const orders = parseInt(form.orders) || 200;
  const avgCheck = parseInt(form.avgCheck) || 800;
  const problemCount = form.problems.length;
  const points = parseInt(form.points) || 1;
  const savingsPercent = Math.min(15 + problemCount * 5, 40);
  const monthlySavings = Math.round(orders * 30 * avgCheck * (savingsPercent / 100) * 0.15 * points);
  const paybackMonths = Math.max(6, Math.round(18 - problemCount * 2));

  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-accent" />
      </div>
      <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Вот какую экономию может обеспечить Rest‑Tech</h2>
      <p className="text-muted-foreground mb-8 text-sm">{form.format} · {form.orders} заказов/день · {form.problems.length} проблем</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <p className="text-3xl font-display font-bold text-accent">{savingsPercent}%</p>
          <p className="text-sm text-muted-foreground mt-1">снижение операционных расходов</p>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <p className="text-3xl font-display font-bold text-foreground">{monthlySavings.toLocaleString("ru")} ₽</p>
          <p className="text-sm text-muted-foreground mt-1">экономия в месяц</p>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <p className="text-3xl font-display font-bold text-foreground">{paybackMonths} мес.</p>
          <p className="text-sm text-muted-foreground mt-1">срок окупаемости IoT‑системы</p>
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
        PDF‑отчёт и коммерческое предложение направлены на <strong className="text-foreground">{form.email}</strong>
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/contacts">
          <Button variant="accent" size="lg">Запросить коммерческое предложение</Button>
        </Link>
        <Link to="/contacts">
          <Button variant="outline" size="lg">Связаться с Rest‑Tech</Button>
        </Link>
      </div>
    </div>
  );
}
