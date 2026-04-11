import { Building2 } from "lucide-react";
import type { CalcFormData } from "@/pages/CalculatorPage";

const formats = [
  "Кафе 40–120 мест",
  "Ресторан 120–250 мест",
  "Сеть 5–10+ точек",
  "Кухня‑сервис / столовая",
];

interface Props {
  form: CalcFormData;
  setForm: React.Dispatch<React.SetStateAction<CalcFormData>>;
}

export default function CalculatorStepFormat({ form, setForm }: Props) {
  return (
    <div>
      <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Выберите формат заведения</h2>
      <p className="text-muted-foreground mb-6 text-sm">Для какого заведения вы хотите рассчитать экономику?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
  );
}
