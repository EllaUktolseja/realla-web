import Footer from "@/sections/Footer";

function NotFoundPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">This page doesn’t exist.</h1>
        <p className="mt-4 max-w-xl leading-7 text-muted-foreground">The page you’re looking for may have moved or the URL may be incorrect.</p>
        <a href="/" className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Back home</a>
      </section>
      <Footer />
    </>
  );
}

export default NotFoundPage;
