import type { CalcFormData } from "@/pages/CalculatorPage";

export type Scenario = "conservative" | "base" | "optimistic";

export const scenarioFactor: Record<Scenario, number> = {
  conservative: 0.7,
  base: 1,
  optimistic: 1.3,
};

export const scenarioLabel: Record<Scenario, string> = {
  conservative: "Консервативный",
  base: "Базовый",
  optimistic: "Оптимистичный",
};

export interface RoiBreakdown {
  savingsPercent: number;
  monthlyRevenue: number;
  monthlySavings: number;
  yearlySavings: number;
  foodCost: number;
  opex: number;
  labor: number;
  paybackMonths: number;
  investment: number;
  ready: boolean;
}

export function calcRoi(form: CalcFormData, scenario: Scenario = "base"): RoiBreakdown {
  const orders = parseInt(form.orders) || 0;
  const avgCheck = parseInt(form.avgCheck) || 0;
  const points = Math.max(parseInt(form.points) || 1, 1);
  const problemCount = form.problems.length;
  const k = scenarioFactor[scenario];

  const savingsPercent = Math.round(Math.min(15 + problemCount * 5, 40) * k);
  const monthlyRevenue = orders * 30 * avgCheck * points;
  const monthlySavings = Math.round(monthlyRevenue * (savingsPercent / 100) * 0.15);

  // Декомпозиция экономии по статьям затрат
  const foodCost = Math.round(monthlySavings * 0.45);
  const opex = Math.round(monthlySavings * 0.3);
  const labor = monthlySavings - foodCost - opex;

  const investment = Math.round((450000 + points * 180000) * (scenario === "optimistic" ? 0.9 : scenario === "conservative" ? 1.1 : 1));
  const paybackMonths = monthlySavings > 0 ? Math.max(3, Math.min(36, Math.round(investment / monthlySavings))) : 0;

  return {
    savingsPercent,
    monthlyRevenue,
    monthlySavings,
    yearlySavings: monthlySavings * 12,
    foodCost,
    opex,
    labor,
    paybackMonths,
    investment,
    ready: orders > 0 && avgCheck > 0,
  };
}

export const money = (v: number) => `${Math.round(v).toLocaleString("ru-RU")} ₽`;
