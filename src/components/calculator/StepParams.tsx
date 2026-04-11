import { Users, DollarSign } from "lucide-react";
import type { CalcFormData } from "@/pages/CalculatorPage";

interface Props {
  form: CalcFormData;
  setForm: React.Dispatch<React.SetStateAction<CalcFormData>>;
}

const inputClass = "w-full mt-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";

export default function CalculatorStepParams({ form, setForm }: Props) {
  const isNetwork = form.format.includes("Сеть");

  return (
    <div>
      <h2 className="font-display font-bold text-2xl mb-2 text-foreground">Параметры вашего заведения</h2>
      <p className="text-muted-foreground mb-6 text-sm">Расскажите о вашей кухне за один день. Если не знаете точные цифры, выберите ближайший диапазон.</p>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Количество гостей в день
          </span>
          <input type="number" value={form.guests} onChange={(e) => setForm((d) => ({ ...d, guests: e.target.value }))} placeholder="150" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent" /> Количество заказов в день
          </span>
          <input type="number" value={form.orders} onChange={(e) => setForm((d) => ({ ...d, orders: e.target.value }))} placeholder="200" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground mb-1">Средний чек, ₽</span>
          <input type="number" value={form.avgCheck} onChange={(e) => setForm((d) => ({ ...d, avgCheck: e.target.value }))} placeholder="800" className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground mb-1">Средний чек «на кухне», ₽</span>
          <input type="number" value={form.kitchenCheck} onChange={(e) => setForm((d) => ({ ...d, kitchenCheck: e.target.value }))} placeholder="500" className={inputClass} />
        </label>
        {isNetwork && (
          <label className="block">
            <span className="text-sm font-medium text-foreground mb-1">Количество точек</span>
            <input type="number" value={form.points} onChange={(e) => setForm((d) => ({ ...d, points: e.target.value }))} placeholder="8" className={inputClass} />
          </label>
        )}
      </div>
    </div>
  );
}
