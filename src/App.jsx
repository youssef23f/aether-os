import FloatingOrb from './components/FloatingOrb';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickActions from './components/QuickActions';
import Workspace from './components/Workspace';
import ModelsSection from './components/ModelsSection';

export default function App() {
  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden bg-[#030712]">
      <FloatingOrb />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <QuickActions />
        <Workspace />
        <ModelsSection />
      </main>
    </div>
  );
}