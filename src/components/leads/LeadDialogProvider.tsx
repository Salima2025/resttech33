import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LeadForm, { LEAD_KINDS, type LeadKind } from "./LeadForm";

const Ctx = createContext<(k: LeadKind) => void>(() => {});
export const useLeadDialog = () => useContext(Ctx);

export default function LeadDialogProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<LeadKind | null>(null);
  const cfg = kind ? LEAD_KINDS[kind] : null;
  return (
    <Ctx.Provider value={setKind}>
      {children}
      <Dialog open={!!kind} onOpenChange={(o) => !o && setKind(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {cfg && kind && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{cfg.title}</DialogTitle>
                <DialogDescription>{cfg.subtitle}</DialogDescription>
              </DialogHeader>
              <LeadForm key={kind} kind={kind} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
