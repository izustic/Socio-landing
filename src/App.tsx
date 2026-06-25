import { useEffect, useRef, type ReactNode } from "react";
import logoPng from "../assets/favicon.png";

/* ---------- Icons (inline SVG) ---------- */
const AppleIcon = ({ color = "#fff" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="M16.365 1.43c0 1.14-.42 2.23-1.18 3.05-.78.86-2.05 1.52-3.1 1.44-.13-1.1.41-2.26 1.13-3.04.81-.88 2.18-1.54 3.15-1.45zM20.5 17.27c-.56 1.3-.83 1.88-1.55 3.02-1.01 1.59-2.43 3.57-4.2 3.58-1.57.02-1.97-1.02-4.1-1.01-2.13.01-2.57 1.03-4.14 1.01-1.77-.02-3.12-1.8-4.13-3.39C-.35 17.13-.65 11.93 1.62 9.13c1.46-1.79 3.77-2.84 5.94-2.84 2.21 0 3.6 1.21 5.43 1.21 1.77 0 2.85-1.21 5.41-1.21 1.94 0 3.99 1.06 5.46 2.88-4.8 2.63-4.02 9.49 1.64 8.1z" />
  </svg>
);

const PlayIcon = ({ color = "#1A1A1A" }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
    <path
      fill={color}
      d="M3.6 1.6a1.8 1.8 0 0 0-.6 1.36v18.08c0 .54.22 1.02.6 1.36L13.7 12 3.6 1.6zm11.5 11.5L5.4 22.86l11.7-6.5-2-3.26zm5.7-3.3-2.5-1.4-2.6 2.6 2.6 2.6 2.5-1.4c1.07-.6 1.07-2.4 0-3zM5.4 1.14l9.7 9.76 2-3.26L5.4 1.14z"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB60C" aria-hidden>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1L12 2z" />
  </svg>
);

const UserPlus = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 8v6M22 11h-6" />
  </svg>
);
const SwapIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M7 4 3 8l4 4" />
    <path d="M3 8h14" />
    <path d="m17 20 4-4-4-4" />
    <path d="M21 16H7" />
  </svg>
);
const CalIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
  </svg>
);
const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
const PhotoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="11" r="2" />
    <path d="m21 17-5-5-9 9" />
  </svg>
);
const PinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFB60C"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

/* ---------- Logo ---------- */
const Logo = () => (
  <div className="flex items-center gap-2">
    <img src={logoPng} alt="socio logo" width={32} height={32} />
    <span className="text-[20px] font-extrabold tracking-tight text-[#1A1A1A]">socio</span>
  </div>
);

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Phone mockup ---------- */
function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[44px] bg-[#1A1A1A] p-[10px] ${className}`}
      style={{ width: 280, height: 580 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-white">
        <div className="absolute left-1/2 top-2 z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-[#1A1A1A]" />
        {children}
      </div>
    </div>
  );
}

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full bg-[#FFF4DD] px-2.5 py-1 text-[10px] font-semibold text-[#D98F00]">
    {children}
  </span>
);

function SwipeScreen() {
  return (
    <div className="flex h-full flex-col px-4 pt-10">
      <div className="flex items-center justify-between pb-3">
        <span className="text-[12px] font-bold text-[#1A1A1A]">Discover</span>
        <div className="h-7 w-7 rounded-full bg-[#FFF4DD]" />
      </div>
      <div className="relative flex-1 rounded-[22px] bg-[#FAFAFA] p-3">
        <div className="h-[260px] w-full rounded-[18px] bg-gradient-to-br from-[#FFE5A8] via-[#FFB60C] to-[#D98F00]" />
        <div className="mt-3">
          <div className="text-[15px] font-extrabold text-[#1A1A1A]">Amara, 27</div>
          <div className="text-[11px] text-[#6B6B6B]">2.4 km away · Lagos</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip>Hiking</Chip>
            <Chip>Coffee</Chip>
            <Chip>Books</Chip>
            <Chip>Yoga</Chip>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EFEFEF] text-[#6B6B6B]">
          ✕
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFB60C] text-2xl font-bold text-[#1A1A1A] shadow-[0_6px_20px_rgba(255,182,12,0.4)]">
          ✓
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EFEFEF] text-[#FFB60C]">
          ★
        </div>
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-[#EFEFEF] px-4 pb-3 pt-10">
        <div className="flex -space-x-2">
          <div className="h-7 w-7 rounded-full border-2 border-white bg-[#FFB60C]" />
          <div className="h-7 w-7 rounded-full border-2 border-white bg-[#D98F00]" />
          <div className="h-7 w-7 rounded-full border-2 border-white bg-[#FFE5A8]" />
        </div>
        <div className="flex-1">
          <div className="text-[12px] font-extrabold text-[#1A1A1A]">Lagos Hikers</div>
          <div className="text-[10px] text-[#6B6B6B]">5 members · active now</div>
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden bg-[#FAFAFA] px-3 py-4">
        <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[12px] text-[#1A1A1A]">
          Sunday hike at Lekki Conservation? ☀️
        </div>
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-[#FFB60C] px-3 py-2 text-[12px] font-medium text-[#1A1A1A]">
          I'm in! 7am meet?
        </div>
        <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[12px] text-[#1A1A1A]">
          Perfect. Pinning the spot now.
        </div>
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-[#FFB60C] px-3 py-2 text-[12px] font-medium text-[#1A1A1A]">
          Bringing coffee for everyone ☕
        </div>
        <div className="max-w-[60%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[12px] text-[#1A1A1A]">
          Legend 🙌
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-[#EFEFEF] bg-white px-3 py-3">
        <div className="h-8 flex-1 rounded-full bg-[#FAFAFA]" />
        <div className="h-8 w-8 rounded-full bg-[#FFB60C]" />
      </div>
    </div>
  );
}

function CreateCircleScreen() {
  return (
    <div className="flex h-full flex-col px-4 pt-10">
      <div className="pb-3 text-[13px] font-extrabold text-[#1A1A1A]">Create your Circle</div>
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
            Age range
          </div>
          <div className="relative h-1.5 rounded-full bg-[#EFEFEF]">
            <div className="absolute left-[15%] right-[30%] h-1.5 rounded-full bg-[#FFB60C]" />
            <div className="absolute left-[15%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-[#FFB60C]" />
            <div className="absolute left-[70%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-[#FFB60C]" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-[#6B6B6B]">
            <span>23</span>
            <span>31</span>
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
            Gender
          </div>
          <div className="flex gap-1.5">
            <span className="rounded-full bg-[#FFB60C] px-3 py-1 text-[11px] font-semibold text-[#1A1A1A]">
              All
            </span>
            <span className="rounded-full bg-[#FAFAFA] px-3 py-1 text-[11px] font-medium text-[#6B6B6B]">
              Women
            </span>
            <span className="rounded-full bg-[#FAFAFA] px-3 py-1 text-[11px] font-medium text-[#6B6B6B]">
              Men
            </span>
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
            Interests
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Hiking", "Coffee", "Books", "Yoga", "Food", "Music", "Art", "Gym"].map((t, i) => (
              <span
                key={t}
                className={`rounded-full px-3 py-1 text-[11px] font-medium ${i < 3 ? "bg-[#FFF4DD] text-[#D98F00]" : "bg-[#FAFAFA] text-[#6B6B6B]"}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B]">
            Circle size
          </div>
          <div className="flex gap-1.5">
            {[3, 4, 5, 6, 7, 8].map((n) => (
              <span
                key={n}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${n === 5 ? "bg-[#FFB60C] text-[#1A1A1A]" : "bg-[#FAFAFA] text-[#6B6B6B]"}`}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto pb-4 pt-4">
        <div className="flex h-12 items-center justify-center rounded-full bg-[#FFB60C] text-[13px] font-bold text-[#1A1A1A]">
          Create Circle
        </div>
      </div>
    </div>
  );
}

function CircleCardScreen() {
  return (
    <div className="flex h-full flex-col px-4 pt-10">
      <div className="flex items-center justify-between pb-3">
        <span className="text-[12px] font-bold text-[#1A1A1A]">Circles near you</span>
        <span className="rounded-full bg-[#FFF4DD] px-2 py-0.5 text-[10px] font-semibold text-[#D98F00]">
          2 km
        </span>
      </div>
      <div className="rounded-[22px] bg-[#FAFAFA] p-4">
        <div className="h-[180px] rounded-[16px] bg-gradient-to-br from-[#FFE5A8] to-[#FFB60C]" />
        <div className="mt-3 flex items-start justify-between">
          <div>
            <div className="text-[15px] font-extrabold text-[#1A1A1A]">Sunday Brunch Club</div>
            <div className="text-[11px] text-[#6B6B6B]">Hosted by Tobi · Yaba</div>
          </div>
          <span className="rounded-full bg-[#1A1A1A] px-2.5 py-1 text-[10px] font-bold text-white">
            3/5
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-2">
            <div className="h-7 w-7 rounded-full border-2 border-white bg-[#FFB60C]" />
            <div className="h-7 w-7 rounded-full border-2 border-white bg-[#D98F00]" />
            <div className="h-7 w-7 rounded-full border-2 border-white bg-[#FFE5A8]" />
          </div>
          <div className="flex gap-1.5">
            <Chip>Food</Chip>
            <Chip>Chill</Chip>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EFEFEF] text-[#6B6B6B]">
          ✕
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFB60C] text-2xl font-bold text-[#1A1A1A] shadow-[0_6px_20px_rgba(255,182,12,0.4)]">
          ✓
        </div>
      </div>
      <div className="text-center text-[11px] text-[#6B6B6B]">Swipe right to request a spot</div>
    </div>
  );
}

/* ---------- CTA Buttons ---------- */
const cta =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-transform duration-150 hover:scale-[1.03]";

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="font-[Inter,-apple-system,BlinkMacSystemFont,sans-serif] bg-white text-[#1A1A1A]">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-[1280px] flex-col items-center gap-12 px-5 py-16 md:flex-row md:py-20">
          <div className="w-full md:w-[55%]">
            <Reveal>
              <span className="inline-block rounded-full bg-[#FFF4DD] px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[1px] text-[#D98F00]">
                Now available on iOS &amp; Android
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1
                className="mt-6 font-extrabold leading-[1.05] text-[#1A1A1A]"
                style={{ fontSize: "clamp(48px,8vw,80px)", letterSpacing: "-2px" }}
              >
                One Circle.
                <br />
                Real
                <br />
                Friendships.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-[480px] text-[18px] leading-[1.6] text-[#6B6B6B]">
                Stop collecting followers. Start building the one group that actually shows up.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#download"
                  className={`${cta} bg-[#1A1A1A] px-7 py-3.5 text-[15px] text-white`}
                >
                  <AppleIcon /> Download on iOS
                </a>
                <a
                  href="https://expo.dev/artifacts/eas/a88RUU_DAJcbLWIfvp4S17OEjRFBFuSUrabKmyim0q0.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cta} bg-[#FFB60C] px-7 py-3.5 text-[15px] text-[#1A1A1A] hover:bg-[#E0A800]`}
                >
                  <PlayIcon /> Get it on Android
                </a>
              </div>
              <p className="mt-5 text-[13px] text-[#AAAAAA]">
                Trusted by 10,000+ people finding their Circle
              </p>
            </Reveal>
          </div>

          <div className="relative w-full md:w-[45%]">
            <div className="absolute -right-10 top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#FFF4DD] blur-[2px]" />
            <div className="absolute right-20 top-10 -z-10 h-[180px] w-[180px] rounded-[60px] bg-[#FFB60C]/30" />
            <Reveal delay={200}>
              <div className="relative flex items-center justify-center" style={{ minHeight: 600 }}>
                <div
                  className="absolute right-2 top-6 origin-bottom"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <PhoneFrame className="scale-[0.85] md:scale-90">
                    <ChatScreen />
                  </PhoneFrame>
                </div>
                <div className="absolute left-0 top-0" style={{ transform: "rotate(-4deg)" }}>
                  <PhoneFrame>
                    <SwipeScreen />
                  </PhoneFrame>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1280px] px-5 py-24">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[1px] text-[#FFB60C]">
              How it works
            </div>
            <h2
              className="mt-4 max-w-[640px] font-extrabold leading-[1.05] text-[#1A1A1A]"
              style={{ fontSize: "clamp(34px,5vw,48px)", letterSpacing: "-1.5px" }}
            >
              Finding your people has never been this intentional.
            </h2>
          </Reveal>

          <div className="relative mt-16 grid gap-12 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-8 -z-0 hidden border-t-2 border-dashed border-[#EFEFEF] md:block" />
            {[
              {
                n: "01",
                t: "Build your profile",
                b: "Add photos, pick your interests, and describe your vibe. We keep it honest — no filters, no followers.",
                I: UserPlus,
              },
              {
                n: "02",
                t: "Create or join a Circle",
                b: "Start your own Circle and pick who joins, or find an existing Circle that fits. One Circle at a time. Always.",
                I: SwapIcon,
              },
              {
                n: "03",
                t: "Meet in real life",
                b: "Your Circle unlocks group chat once it's full. Then you set a meetup goal and actually show up.",
                I: CalIcon,
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative z-10 text-left">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF4DD]">
                    <s.I />
                  </div>
                  <div className="mt-5 text-[13px] font-bold text-[#FFB60C]">{s.n}</div>
                  <div className="mt-2 text-[20px] font-extrabold text-[#1A1A1A]">{s.t}</div>
                  <p className="mt-3 text-[16px] leading-[1.6] text-[#6B6B6B]">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHT */}
      <section>
        <div className="mx-auto max-w-[1280px] space-y-24 px-5 py-24">
          <FeatureRow
            tag="For Circle Creators"
            title="You choose who's in your Circle."
            body="Set your Circle size (3 to 8 people), define your filters — age, location, interests, vibe — and swipe through people who actually match. No random strangers. No algorithm surprises."
            bullets={[
              "Set age range and location radius",
              "Filter by shared interests and personality traits",
              "Swipe right to invite, left to skip",
              "Mutual match required to join",
            ]}
            phone={<CreateCircleScreen />}
            reverse={false}
          />
          <FeatureRow
            tag="For Circle Joiners"
            title="Find a Circle that's already forming."
            body="Browse Circles near you, see who's already in them, and swipe to request a spot. The host reviews your profile and lets you in. No ghosting, no awkward DMs."
            bullets={[
              "Browse Circles by distance and vibe",
              "See member avatars before you join",
              "Host approves — so everyone actually wants you there",
              "Get notified the moment you're accepted",
            ]}
            phone={<CircleCardScreen />}
            reverse
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#FFF4DD]">
        <div className="mx-auto max-w-[1280px] px-5 py-24">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[1px] text-[#D98F00]">
              Real Circles, real stories
            </div>
            <h2
              className="mt-4 max-w-[640px] font-extrabold leading-[1.05] text-[#1A1A1A]"
              style={{ fontSize: "clamp(34px,5vw,48px)", letterSpacing: "-1.5px" }}
            >
              People are actually meeting.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "We met through Socio three months ago. We've had six meetups since. I've never made friends this fast in my life.",
                n: "Adaeze O.",
                t: "Lagos, Nigeria",
              },
              {
                q: "I was skeptical at first. But my Circle planned a hike two weeks after we matched. These are real friends now.",
                n: "Kofi A.",
                t: "Accra, Ghana",
              },
              {
                q: "What I love is that everyone has to agree to be there. No fake profiles, no ghosting. We all actually showed up.",
                n: "Chisom E.",
                t: "Abuja, Nigeria",
              },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 80}>
                <div className="h-full rounded-[24px] bg-white p-7">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <StarIcon key={k} />
                    ))}
                  </div>
                  <p className="mt-4 text-[16px] italic leading-[1.6] text-[#1A1A1A]">"{c.q}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFB60C] to-[#D98F00]" />
                    <div>
                      <div className="text-[14px] font-bold text-[#1A1A1A]">{c.n}</div>
                      <div className="text-[12px] text-[#6B6B6B]">{c.t}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section>
        <div className="mx-auto max-w-[1280px] px-5 py-24">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[1px] text-[#FFB60C]">
              Everything you need
            </div>
            <h2
              className="mt-4 max-w-[720px] font-extrabold leading-[1.05] text-[#1A1A1A]"
              style={{ fontSize: "clamp(34px,5vw,48px)", letterSpacing: "-1.5px" }}
            >
              Built for real connection, not endless scrolling.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                I: LockIcon,
                t: "E2EE Group Calls",
                b: "Every voice and video call in your Circle is end-to-end encrypted. What happens in your Circle, stays there.",
              },
              {
                I: PhotoIcon,
                t: "Rich Group Chat",
                b: "Share photos, short videos, voice notes, and polls. Full media support built into every Circle chat.",
              },
              {
                I: PinIcon,
                t: "Find people near you",
                b: "Socio shows you people and Circles within your area. The closer they are, the easier it is to actually meet up.",
              },
              {
                I: UsersIcon,
                t: "One Circle at a Time",
                b: "Intentionally limited. You can only be in one active Circle at a time. Depth over breadth, always.",
              },
              {
                I: ClockIcon,
                t: "Meetup Goals",
                b: "Set a meetup goal when you create your Circle — coffee, study, gym, food, or outdoors. Real life, on purpose.",
              },
              {
                I: ShieldIcon,
                t: "Safe by Design",
                b: "Moderation, reporting, and role-based admin tools built in. Hosts control who enters their Circle.",
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 60}>
                <div className="h-full rounded-[20px] bg-[#FAFAFA] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4DD]">
                    <f.I />
                  </div>
                  <div className="mt-5 text-[18px] font-extrabold text-[#1A1A1A]">{f.t}</div>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#6B6B6B]">{f.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="download" className="bg-[#FFB60C]">
        <div className="mx-auto max-w-[1280px] px-5 py-28 text-center">
          <Reveal>
            <h2
              className="mx-auto max-w-[900px] font-extrabold leading-[1.05] text-[#1A1A1A]"
              style={{ fontSize: "clamp(44px,7vw,72px)", letterSpacing: "-2px" }}
            >
              Your Circle is waiting.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-[1.6] text-[#1A1A1A]/65">
              Download Socio and start building the friendships that actually last.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#download"
                className={`${cta} bg-[#1A1A1A] px-8 py-4 text-[16px] text-white`}
              >
                <AppleIcon /> Download on iOS
              </a>
              <a
                href="https://expo.dev/artifacts/eas/a88RUU_DAJcbLWIfvp4S17OEjRFBFuSUrabKmyim0q0.apk"
                target="_blank"
                rel="noopener noreferrer"
                className={`${cta} bg-white px-8 py-4 text-[16px] text-[#1A1A1A]`}
              >
                <PlayIcon /> Get it on Android
              </a>
            </div>
            <p className="mt-6 text-[13px] text-[#1A1A1A]/50">
              Free to download. No ads. No subscriptions to start.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#EFEFEF] bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
          <div className="flex items-center gap-3 text-[13px] text-[#AAAAAA]">
            <span className="font-extrabold text-[#1A1A1A]">socio</span>
            <span>© 2026 Socio. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-[13px] text-[#6B6B6B]">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureRow({
  tag,
  title,
  body,
  bullets,
  phone,
  reverse,
}: {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  phone: ReactNode;
  reverse: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-12 md:grid-cols-2 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
    >
      <Reveal>
        <div>
          <Chip>{tag}</Chip>
          <h3
            className="mt-4 font-extrabold leading-[1.05] text-[#1A1A1A]"
            style={{ fontSize: "clamp(30px,4.4vw,44px)", letterSpacing: "-1.5px" }}
          >
            {title}
          </h3>
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-[#6B6B6B]">{body}</p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[16px] text-[#1A1A1A]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FFB60C]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className="flex justify-center">
          <PhoneFrame>{phone}</PhoneFrame>
        </div>
      </Reveal>
    </div>
  );
}

function Nav() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => {
      if (window.scrollY > 8) el.style.borderBottomColor = "#EFEFEF";
      else el.style.borderBottomColor = "transparent";
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur"
      style={{ borderBottomColor: "transparent", transition: "border-color 200ms ease" }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5">
        <Logo />
        <a
          href="#download"
          className="inline-flex items-center justify-center rounded-full bg-[#FFB60C] px-6 py-2.5 text-[14px] font-bold text-[#1A1A1A] transition-colors duration-150 hover:bg-[#E0A800]"
        >
          Download the app
        </a>
      </div>
    </header>
  );
}
