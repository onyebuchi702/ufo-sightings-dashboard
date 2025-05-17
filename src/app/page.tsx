import { Footer, Header, Dashboard } from "@/components";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto px-4">
        <Dashboard />
      </div>
      <Footer />
    </main>
  );
}
