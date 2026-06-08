import yoji from "@/assets/clients/yoji.jpg.asset.json";
import dubai from "@/assets/clients/dubai.jpg.asset.json";
import dostoevsky from "@/assets/clients/dostoevsky.jpg.asset.json";
import rockets from "@/assets/clients/rockets.jpg.asset.json";
import onion from "@/assets/clients/onion.jpg.asset.json";
import dominos from "@/assets/clients/dominos.jpg.asset.json";
import myata from "@/assets/clients/myata.jpg.asset.json";
import rukiVverh from "@/assets/clients/ruki-vverh.jpg.asset.json";
import soho from "@/assets/clients/soho.jpg.asset.json";
import mossovet from "@/assets/clients/mossovet.jpg.asset.json";
import kfc from "@/assets/clients/kfc.jpg.asset.json";
import commode from "@/assets/clients/commode.jpg.asset.json";
import lepimVarim from "@/assets/clients/lepim-varim.jpg.asset.json";
import foodband from "@/assets/clients/foodband.jpg.asset.json";
import rostics from "@/assets/clients/rostics.jpg.asset.json";

const logos = [
  { src: yoji.url, alt: "YOJI" },
  { src: dubai.url, alt: "Dubai Boutique Restaurant" },
  { src: dostoevsky.url, alt: "Достоевский" },
  { src: rockets.url, alt: "Rockets.Coffee" },
  { src: onion.url, alt: "Onion" },
  { src: dominos.url, alt: "Domino's Pizza" },
  { src: myata.url, alt: "Мята Lounge" },
  { src: rukiVverh.url, alt: "Руки Вверх Бар" },
  { src: soho.url, alt: "Soho Rooms" },
  { src: mossovet.url, alt: "Театр Моссовета" },
  { src: kfc.url, alt: "KFC" },
  { src: commode.url, alt: "Commode club & bar" },
  { src: lepimVarim.url, alt: "Лепим и Варим" },
  { src: foodband.url, alt: "Food Band" },
  { src: rostics.url, alt: "Rostic's" },
];

export default function ClientsMarquee() {
  const track = [...logos, ...logos];
  return (
    <div className="relative w-full overflow-hidden marquee-mask" aria-label="Логотипы клиентов">
      <div
        className="flex w-max animate-marquee gap-8 md:gap-14 hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as never]: "45s" }}
      >
        {track.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex h-20 md:h-24 w-32 md:w-44 shrink-0 items-center justify-center rounded-xl bg-card px-4 py-3 border border-border shadow-card opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}