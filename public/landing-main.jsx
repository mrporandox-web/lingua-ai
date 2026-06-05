// ============================================================
// landing-main.jsx — assembles the Lyra landing
// ============================================================
function LandingApp() {
  useReveal();
  return (
    <>
      <div className="cosmos" />
      <main>
        <Hero />
        <PainSolution />
        <InteractiveDemo />
        <HowItWorks />
        <Inside />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LandingApp />);
