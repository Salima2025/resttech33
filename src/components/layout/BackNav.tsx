import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

/** Back / home navigation shown on every page except the home page. */
const BackNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (pathname === "/") return null;

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) navigate(-1);
    else navigate("/");
  };

  return (
    <nav aria-label="Навигация назад" className="border-b border-border bg-muted/40">
      <div className="container-tight flex items-center gap-4 h-11 px-4 md:px-8 text-sm">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Назад
        </button>
        <span className="text-border" aria-hidden="true">|</span>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          На главную
        </Link>
      </div>
    </nav>
  );
};

export default BackNav;
