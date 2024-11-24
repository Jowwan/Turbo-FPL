import CardSection from "./components/CardSection";
import Exp from "./components/Exp";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="bg-gradient-to-t from-stone-950 to-black py-28">
        <Exp />
        <CardSection />
      </div>
    </main>
  );
}
