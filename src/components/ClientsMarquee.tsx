import yoji from "@/assets/clients/yoji.jpg";
import dubai from "@/assets/clients/dubai.jpg";
import dostoevsky from "@/assets/clients/dostoevsky.jpg";
import rockets from "@/assets/clients/rockets.jpg";
import onion from "@/assets/clients/onion.jpg";
import dominos from "@/assets/clients/dominos.jpg";
import myata from "@/assets/clients/myata.jpg";
import rukiVverh from "@/assets/clients/ruki-vverh.jpg";
import soho from "@/assets/clients/soho.jpg";
import mossovet from "@/assets/clients/mossovet.jpg";
import kfc from "@/assets/clients/kfc.jpg";
import commode from "@/assets/clients/commode.jpg";
import lepimVarim from "@/assets/clients/lepim-varim.jpg";
import foodband from "@/assets/clients/foodband.jpg";
import rostics from "@/assets/clients/rostics.jpg";

const logos = [
  { src: yoji, alt: "YOJI" },
  { src: dubai, alt: "Dubai Boutique Restaurant" },
  { src: dostoevsky, alt: "Достоевский" },
  { src: rockets, alt: "Rockets.Coffee" },
  { src: onion, alt: "Onion" },
  { src: dominos, alt: "Domino's Pizza" },
  { src: myata, alt: "Мята Lounge" },
  { src: rukiVverh, alt: "Руки Вверх Бар" },
  { src: soho, alt: "Soho Rooms" },
  { src: mossovet, alt: "Театр Моссовета" },
  { src: kfc, alt: "KFC" },
  { src: commode, alt: "Commode club и bar" },
  { src: lepimVarim, alt: "Лепим и Варим" },
  { src: foodband, alt: "Food Band" },
  { src: rostics, alt: "Rostic's" },
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
              width={400}
              height={200}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}