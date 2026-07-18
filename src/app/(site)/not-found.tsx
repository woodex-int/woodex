import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-espresso text-cream">
      <img
        src="/img/cta.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 to-espresso" />
      <div className="relative px-6 text-center">
        <p className="eyebrow eyebrow--plain justify-center">Page Not Found</p>
        <p className="font-display mt-8 text-[clamp(6rem,18vw,12rem)] font-light leading-none italic text-brass-soft/80">
          404
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-cream/65">
          The space you're looking for doesn't exist — but we'd be glad to design one
          that does.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn btn-brass">
            Back to Home
          </Link>
          <Link href="/services" className="btn btn-outline-light">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
