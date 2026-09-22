import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { CalcFormData } from "@/pages/CalculatorPage";
import { calcRoi, money } from "@/lib/roi";

interface Props {
  form: CalcFormData;
}

export default function LiveEstimate({ form }: Props) {
  const low = calcRoi(form, "conservative");
  const high = calcRoi(form, "optimistic");

  if (!low.ready) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-2xl border border-accent/40 bg-accent/5 p-5"
    >
      <div className="flex items-start gap-3">
        <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Предварительная оценка</p>
          <p className="font-display font-bold text-xl text-foreground">
            {money(low.monthlySavings)} – {money(high.monthlySavings)} <span className="text-sm font-normal text-muted-foreground">в месяц</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Отметьте больше проблем – расчёт станет точнее. Полная детализация на последнем шаге.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
