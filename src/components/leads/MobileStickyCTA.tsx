import { Calculator, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "./LeadDialogProvider";

export default function MobileStickyCTA() {
  const open = useLeadDialog();
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur border-t border-border p-3 flex gap-2 print:hidden">
      <Button variant="accent" className="flex-1" onClick={() => open("kit")}>
        <Calculator className="w-4 h-4 mr-2" /> Получить расчёт
      </Button>
      <a href="https://t.me/+gy7lPI6GPDRlNjli" target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram">
        <Button variant="outline" size="icon"><Send className="w-4 h-4" /></Button>
      </a>
    </div>
  );
}
