import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { venueFormats } from "@/lib/venue-formats";

export default function FormatLinks({ current }: { current?: string }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {venueFormats.filter((format) => format.id !== current).map((format) => (
      <Link key={format.id} to={format.path} className="group rounded-lg border border-border bg-card p-5 hover:border-accent transition-colors">
        <div className="flex justify-between gap-3 mb-2"><span className="font-display font-semibold text-lg text-foreground">{format.name}</span><ArrowUpRight className="h-5 w-5 shrink-0 text-accent" /></div>
        <p className="text-sm text-muted-foreground">{format.focus}</p>
      </Link>
    ))}
  </div>;
}