export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-primary px-6 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              ZephorTech
            </span>
          </h1>
          <p className="mb-8 text-lg text-blue-100 md:text-xl lg:text-2xl">
            Cutting-edge IT Solutions & Digital Transformation
          </p>
          <p className="mx-auto max-w-2xl text-base text-blue-50 md:text-lg">
            We deliver innovative technology solutions including web & mobile development, AI
            agents, SaaS products, e-commerce solutions, and comprehensive digital transformation
            services.
          </p>
        </div>
      </section>
    </main>
  );
}

