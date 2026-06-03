import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "rt_cookie_consent_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-[100]"
          role="dialog"
          aria-label="Согласие на использование cookie"
        >
          <div className="mx-auto max-w-4xl bg-card border border-border shadow-elevated rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              Мы используем файлы cookie для повышения качества обслуживания. Нажимая кнопку «Принять», вы принимаете{" "}
              <Link to="/legal/terms" className="text-accent hover:underline">условия пользовательского соглашения</Link>,{" "}
              <Link to="/legal/privacy" className="text-accent hover:underline">политику конфиденциальности</Link> и{" "}
              <Link to="/legal/personal-data-consent" className="text-accent hover:underline">согласие на обработку персональных данных</Link>.
            </p>
            <Button variant="accent" onClick={accept} className="w-full md:w-auto shrink-0">
              Принять
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}