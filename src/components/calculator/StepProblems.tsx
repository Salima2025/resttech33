import { AlertTriangle } from "lucide-react";
import type { CalcFormData } from "@/pages/CalculatorPage";

const problemOptions = [
  "Частые простои на кухне из‑за перегрева оборудования",
  "Ошибки сборки и перерасход продуктов",
  "Недостаток времени персонала из‑за рутинных задач",
  "Отсутствие контроля и аналитики по кухне",
  "Высокие расходы на электроэнергию",
  "Медленная отдача блюд в пиковые часы",
];

interface Props {
  form: CalcFormData;
  toggleProblem: (p: string) => void;
}

export default function CalculatorStepProblems({ form, toggleProblem }: Props) {
  return (
    <div>
      <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Текущие IoT‑боли и простои</h2>
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
  );
}
