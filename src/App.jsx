import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";

// ── Components ──────────────────────────────────────────────────────────────
import { Navbar } from "./components/Navbar";
import { HeroHalfAdder } from "./components/HeroHalfAdder";
import { ConceptCard } from "./components/ConceptCard";
import { InteractiveShowcaseSlider } from "./components/InteractiveShowcaseSlider";
import { GatePlaygroundSection } from "./components/GatePlaygroundSection";
import { SimulationWorkbench } from "./components/SimulationWorkbench";
import { Footer } from "./components/Footer";
import CircuitLabPage from "./pages/topics/CircuitLabPage";

// ── Pages ───────────────────────────────────────────────────────────────────
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TopicsPage, { TOPICS_TREE } from "./pages/TopicsPage";

// ── Topic Main Pages ─────────────────────────────────────────────────────────
import NumberSystemsPage from "./pages/topics/NumberSystemsPage";
import LogicGatesPage from "./pages/topics/LogicGatesPage";
import CodeConvertersPage from "./pages/topics/CodeConvertersPage";
import BooleanAlgebraPage from "./pages/topics/BooleanAlgebraPage";
import AddersPage from "./pages/topics/AddersPage";
import SubtractorsPage from "./pages/topics/SubtractorsPage";
import FlipFlopsPage from "./pages/topics/FlipFlopsPage";
import RegistersPage from "./pages/topics/RegistersPage";
import CountersPage from "./pages/topics/CountersPage";
import PLDPage from "./pages/topics/PLDPage";

// ── Number Systems sub-pages ─────────────────────────────────────────────────
import BinToDecPage from "./pages/topics/NumberSystems/BinToDecPage";
import DecToBinPage from "./pages/topics/NumberSystems/DecToBinPage";
import BinToHexPage from "./pages/topics/NumberSystems/BinToHexPage";
import HexToBinPage from "./pages/topics/NumberSystems/HexToBinPage";
import BinToOctPage from "./pages/topics/NumberSystems/BinToOctPage";
import OctToBinPage from "./pages/topics/NumberSystems/OctToBinPage";
import DecToHexPage from "./pages/topics/NumberSystems/DecToHexPage";
import BCDPage from "./pages/topics/NumberSystems/BCDPage";
import GrayCodePage from "./pages/topics/NumberSystems/GrayCodePage";
import Excess3Page from "./pages/topics/NumberSystems/Excess3Page";

// ── Logic Gates sub-pages ─────────────────────────────────────────────────────
import ANDPage from "./pages/topics/LogicGates/ANDPage";
import ORPage from "./pages/topics/LogicGates/ORPage";
import NOTPage from "./pages/topics/LogicGates/NOTPage";
import NANDPage from "./pages/topics/LogicGates/NANDPage";
import NORPage from "./pages/topics/LogicGates/NORPage";
import XORPage from "./pages/topics/LogicGates/XORPage";
import XNORPage from "./pages/topics/LogicGates/XNORPage";
import UniversalPage from "./pages/topics/LogicGates/UniversalPage";

// ── Code Converters sub-pages ─────────────────────────────────────────────────
import BinToGrayPage from "./pages/topics/CodeConverters/BinToGrayPage";
import GrayToBinPage from "./pages/topics/CodeConverters/GrayToBinPage";
import XS3ToBCDPage from "./pages/topics/CodeConverters/XS3ToBCDPage";
import BCDToXS3Page from "./pages/topics/CodeConverters/BCDToXS3Page";

// ── Boolean Algebra sub-pages ─────────────────────────────────────────────────
import LawsPage from "./pages/topics/BooleanAlgebra/LawsPage";
import DeMorganPage from "./pages/topics/BooleanAlgebra/DeMorganPage";
import SOPPOSPage from "./pages/topics/BooleanAlgebra/SOPPOSPage";
import KMapPage from "./pages/topics/BooleanAlgebra/KMapPage";

// ── Adders sub-pages ──────────────────────────────────────────────────────────
import HalfAdderPage from "./pages/topics/Adders/HalfAdderPage";
import FullAdderPage from "./pages/topics/Adders/FullAdderPage";
import BCDAdderPage from "./pages/topics/Adders/BCDAdderPage";

// ── Subtractors sub-pages ─────────────────────────────────────────────────────
import HalfSubPage from "./pages/topics/Subtractors/HalfSubPage";
import FullSubPage from "./pages/topics/Subtractors/FullSubPage";

// ── Flip-Flops sub-pages ──────────────────────────────────────────────────────
import SRPage from "./pages/topics/FlipFlops/SRPage";
import JKPage from "./pages/topics/FlipFlops/JKPage";
import DPage from "./pages/topics/FlipFlops/DPage";
import TPage from "./pages/topics/FlipFlops/TPage";
import MasterSlavePage from "./pages/topics/FlipFlops/MasterSlavePage";

// ── Registers sub-pages ───────────────────────────────────────────────────────
import SISOPage from "./pages/topics/Registers/SISOPage";
import SIPOPage from "./pages/topics/Registers/SIPOPage";
import PISOPage from "./pages/topics/Registers/PISOPage";
import PIPOPage from "./pages/topics/Registers/PIPOPage";

// ── Counters sub-pages ────────────────────────────────────────────────────────
import SyncUpPage from "./pages/topics/Counters/SyncUpPage";
import SyncDownPage from "./pages/topics/Counters/SyncDownPage";
import SyncUpDownPage from "./pages/topics/Counters/SyncUpDownPage";
import AsyncUpPage from "./pages/topics/Counters/AsyncUpPage";
import AsyncDownPage from "./pages/topics/Counters/AsyncDownPage";
import AsyncUpDownPage from "./pages/topics/Counters/AsyncUpDownPage";
import RingPage from "./pages/topics/Counters/RingPage";
import JohnsonPage from "./pages/topics/Counters/JohnsonPage";
import ModPage from "./pages/topics/Counters/ModPage";

// ── PLD sub-pages ─────────────────────────────────────────────────────────────
import PLAPage from "./pages/topics/PLD/PLAPage";
import PALPage from "./pages/topics/PLD/PALPage";

// ── Auth ──────────────────────────────────────────────────────────────────────
import { getSession, logoutUser } from "./utils/auth";

// ── Icons ─────────────────────────────────────────────────────────────────────
import {
  Play,
  Cpu,
  GitBranch,
  Zap,
  ShieldCheck,
  Presentation,
  X,
  Search,
  User,
  Lock,
  ArrowRight,
  ChevronRight,
  CircuitBoard,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════════
// HOMEPAGE
// ══════════════════════════════════════════════════════════════════════════════
function HomePage({ session, onLoginClick, onSearchClick, onLogout }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConceptInfo, setActiveConceptInfo] = useState(null);

  const concepts = TOPICS_TREE.map((topic) => ({
    id: topic.id,
    title: topic.title,
    subtitle: topic.subtitle,
    path: topic.path,
    details: topic.desc,
  }));

  const searchable = TOPICS_TREE.flatMap((topic) => [
    {
      id: topic.id,
      title: topic.title,
      subtitle: topic.subtitle,
      path: topic.path,
    },
    ...topic.sub.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: topic.title,
      path: item.path,
    })),
  ]);

  const searchResults =
    searchQuery.trim() === ""
      ? concepts
      : searchable.filter(
          (c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141E18] flex flex-col font-sans relative overflow-x-hidden">
      {/* BG waves */}
      <div className="absolute top-0 left-0 w-[480px] h-[400px] pointer-events-none -z-10 overflow-hidden">
        <svg viewBox="0 0 680 400" className="w-full h-full" fill="none">
          <path
            d="M -40 -40 L 480 -40 C 440 140 320 220 200 180 C 80 140 -20 280 -40 340 Z"
            fill="url(#wl)"
          />
          <defs>
            <linearGradient id="wl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D1FAE5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FAF9F5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[550px] pointer-events-none -z-10 overflow-hidden">
        <svg viewBox="0 0 750 550" className="w-full h-full" fill="none">
          <path
            d="M 780 -40 L 780 480 C 620 460 480 340 450 220 C 420 100 520 20 580 -40 Z"
            fill="url(#wr)"
          />
          <defs>
            <linearGradient id="wr" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FAF9F5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <Navbar
        onSearchClick={() => setSearchModalOpen(true)}
        onLoginClick={() => setLoginModalOpen(true)}
        session={session}
        onLogout={onLogout}
      />

      <main className="flex-1">
        {/* HERO */}
        <section
          id="home"
          className="relative pt-8 sm:pt-14 pb-14 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EDE4] border border-[#E8DED2] shadow-xs text-xs font-bold text-[#4A3A2A]">
                  <Cpu className="w-3.5 h-3.5 text-[#386641]" />
                  Digital Systems Learning Platform
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#141E18] tracking-tight leading-[1.12]">
                  Learn, Visualize and
                  <br />
                  Explore Digital Systems.
                </h1>
                <p className="text-base sm:text-lg text-[#4B5B51] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  A simple and powerful platform to understand Digital
                  Electronics with clear explanations, circuit diagrams and
                  interactive simulations.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/topics"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#95C798] hover:bg-[#84B987] text-[#133019] font-extrabold text-xs sm:text-sm shadow-sm hover:shadow transition-all"
                  >
                    <Play className="w-4 h-4 fill-[#133019] text-[#133019]" />
                    Explore Topics
                  </Link>
                  {/* NEW: Circuit Lab */}
                  <Link
                    to="/simulator/editor"
                    className="group relative inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full overflow-hidden
             bg-gradient-to-r from-[#386641] to-[#4C8A58] hover:from-[#2F5738] hover:to-[#386641]
             text-[#FAF8F4] font-extrabold text-xs sm:text-sm
             shadow-md shadow-[#386641]/25 hover:shadow-lg hover:shadow-[#386641]/40
             hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    {/* shine that sweeps across on hover */}
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0
                   group-hover:opacity-100 group-hover:translate-x-[400%] transition-all duration-700"
                    />

                    {/* icon badge */}
                    <span className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#FAF8F4] ring-2 ring-[#95C798]/70">
                      <CircuitBoard className="w-4 h-4 text-[#386641]" />
                    </span>

                    <span className="relative">VIDS Lab</span>

                    <ArrowRight className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <a
                    href="#simulation-workbench"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FAF8F4] hover:bg-white text-[#3C2E21] font-extrabold text-xs sm:text-sm border border-[#D8CEBF] shadow-xs hover:shadow transition-all"
                  >
                    <GitBranch className="w-4 h-4 text-[#386641]" />
                    Try Basic Simulations
                  </a>
                </div>
                <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-[11px] text-[#6D7E73] font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    100% Real Logic
                  </span>
                  <span>•</span>
                  <span>Curriculum Oriented</span>
                </div>
              </div>
              <div className="lg:col-span-6 flex justify-center">
                <HeroHalfAdder />
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE CORE CONCEPTS */}
        <section
          id="core-concepts"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-12"
        >
          <div className="text-center space-y-2 mb-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 sm:w-28 bg-[#E2EBE5]"></div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#141E18] tracking-tight">
                Explore Core Concepts
              </h2>
              <div className="h-[1px] w-16 sm:w-28 bg-[#E2EBE5]"></div>
            </div>
            <div className="flex justify-center pt-1">
              <div className="w-6 h-6 rounded-md bg-[#FAF6F0] border border-[#E8DED2] flex items-center justify-center shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-[#4A3A2A]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {concepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                id={concept.id}
                title={concept.title}
                subtitle={concept.subtitle}
                path={concept.path}
                onClick={() => setActiveConceptInfo(concept)}
              />
            ))}
          </div>

          {/* See All Topics Button */}
          <div className="text-center mt-8">
            <Link
              to="/topics"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white border border-[#D8CEBF] hover:border-[#C9E2CE] hover:bg-[#F3F8F4] text-[#2F3E34] font-extrabold text-sm shadow-xs hover:shadow transition-all"
            >
              See All Topics
              <ChevronRight className="w-4 h-4 text-[#386641]" />
            </Link>
          </div>
        </section>

        {/* SLIDER */}
        <InteractiveShowcaseSlider />

        {/* SIMULATION WORKBENCH */}
        <SimulationWorkbench />

        {/* WHY VIDS */}
        <section className="bg-white/80 border-y border-[#E8EDE8] py-16 my-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-extrabold text-[#386641] uppercase tracking-wider">
                Engineering Pedagogical Approach
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141E18]">
                Why Students & Teachers Prefer VIDS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Zap className="w-5 h-5 text-[#386641]" />,
                  title: "100% Mathematically Authentic",
                  desc: "No pre-rendered or fake animations. All logic gates, adders, counters, and K-maps compute genuine Boolean states in JavaScript.",
                },
                {
                  icon: <Presentation className="w-5 h-5 text-[#386641]" />,
                  title: "Classroom Demonstration Ready",
                  desc: "Perfect for instructors to project during lectures and step through clock pulses one-by-one in real time.",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-[#386641]" />,
                  title: "Standard TTL 7400 IC Integration",
                  desc: "Maps switching theory to 7408, 7432, 74LS283, 7490, and 74194 ICs used in university lab experiments.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E8EDE8] space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E4F0E7] flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="font-extrabold text-base text-[#141E18]">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#4B5B51] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GatePlaygroundSection />
      </main>

      <Footer />

      {/* SEARCH MODAL */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#141E18]/40 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E8EDE8] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3.5 border-b border-[#E8EDE8] gap-3">
              <Search className="w-4 h-4 text-[#96A59C] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search concepts, logic gates, K-maps, counters..."
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#141E18] placeholder:text-[#96A59C] focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg text-[#96A59C] hover:text-[#141E18] hover:bg-[#E4F0E7] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#E8EDE8]/50">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setSearchModalOpen(false)}
                  className="p-3 rounded-xl hover:bg-[#F3F8F4] transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#141E18]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#6D7E73]">
                      {item.subtitle}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#386641]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141E18]/40 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setLoginModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl border border-[#E8EDE8] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E4F0E7] flex items-center justify-center font-bold text-sm text-[#2C5234]">
                  V
                </div>
                <h3 className="font-extrabold text-lg text-[#141E18]">
                  Sign In
                </h3>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="p-1 rounded-lg text-[#96A59C] hover:text-[#141E18] hover:bg-[#E4F0E7] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#6D7E73]">
              Use your VIDS account or browse all topics as a guest.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setLoginModalOpen(false)}
                className="w-full py-3 rounded-xl bg-[#386641] hover:bg-[#2C5234] text-white font-extrabold text-sm text-center transition-all cursor-pointer shadow-xs"
              >
                Sign In to VIDS
              </Link>
              <Link
                to="/register"
                onClick={() => setLoginModalOpen(false)}
                className="w-full py-3 rounded-xl bg-white border border-[#E2EBE5] hover:bg-[#F3F8F4] text-[#141E18] font-extrabold text-sm text-center transition-all cursor-pointer"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CONCEPT PREVIEW MODAL */}
      {activeConceptInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141E18]/40 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setActiveConceptInfo(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-[#E8EDE8] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E8EDE8]">
              <span className="text-xs font-bold text-[#386641] uppercase tracking-wider">
                Module Overview
              </span>
              <button
                onClick={() => setActiveConceptInfo(null)}
                className="p-1 rounded-lg text-[#96A59C] hover:text-[#141E18] hover:bg-[#E4F0E7] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-extrabold text-[#141E18]">
              {activeConceptInfo.title}
            </h3>
            <p className="text-xs text-[#2C5234] font-semibold bg-[#F3F8F4] p-2.5 rounded-xl border border-[#C9E2CE]">
              {activeConceptInfo.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-[#4B5B51] leading-relaxed">
              {activeConceptInfo.details}
            </p>
            <div className="flex gap-3 pt-1">
              <Link
                to={activeConceptInfo.path}
                onClick={() => setActiveConceptInfo(null)}
                className="flex-1 py-2.5 rounded-full bg-[#386641] hover:bg-[#2C5234] text-white font-bold text-xs text-center shadow-sm transition-all cursor-pointer"
              >
                Open Topic
              </Link>
              <button
                onClick={() => setActiveConceptInfo(null)}
                className="flex-1 py-2.5 rounded-full border border-[#E2EBE5] hover:bg-[#FAF9F5] text-[#141E18] font-bold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP with Router
// ══════════════════════════════════════════════════════════════════════════════
export function App() {
  const [session, setSession] = useState(() => getSession());

  const handleLogin = (user) => setSession(user);
  const handleLogout = () => {
    logoutUser();
    setSession(null);
  };

  return (
    <Routes>
      {/* Auth pages */}
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Topics - TOC */}
      <Route path="/topics" element={<TopicsPage />} />

      {/* Number Systems */}
      <Route path="/topics/number-systems" element={<NumberSystemsPage />} />
      <Route
        path="/topics/number-systems/bin-to-dec"
        element={<BinToDecPage />}
      />
      <Route
        path="/topics/number-systems/dec-to-bin"
        element={<DecToBinPage />}
      />
      <Route
        path="/topics/number-systems/bin-to-hex"
        element={<BinToHexPage />}
      />
      <Route
        path="/topics/number-systems/hex-to-bin"
        element={<HexToBinPage />}
      />
      <Route
        path="/topics/number-systems/bin-to-oct"
        element={<BinToOctPage />}
      />
      <Route
        path="/topics/number-systems/oct-to-bin"
        element={<OctToBinPage />}
      />
      <Route
        path="/topics/number-systems/dec-to-hex"
        element={<DecToHexPage />}
      />
      <Route path="/topics/number-systems/bcd" element={<BCDPage />} />
      <Route
        path="/topics/number-systems/gray-code"
        element={<GrayCodePage />}
      />
      <Route path="/topics/number-systems/excess-3" element={<Excess3Page />} />

      {/* Logic Gates */}
      <Route path="/topics/logic-gates" element={<LogicGatesPage />} />
      <Route path="/topics/logic-gates/and" element={<ANDPage />} />
      <Route path="/topics/logic-gates/or" element={<ORPage />} />
      <Route path="/topics/logic-gates/not" element={<NOTPage />} />
      <Route path="/topics/logic-gates/nand" element={<NANDPage />} />
      <Route path="/topics/logic-gates/nor" element={<NORPage />} />
      <Route path="/topics/logic-gates/xor" element={<XORPage />} />
      <Route path="/topics/logic-gates/xnor" element={<XNORPage />} />
      <Route path="/topics/logic-gates/universal" element={<UniversalPage />} />

      {/* Code Converters */}
      <Route path="/topics/code-converters" element={<CodeConvertersPage />} />
      <Route
        path="/topics/code-converters/bin-to-gray"
        element={<BinToGrayPage />}
      />
      <Route
        path="/topics/code-converters/gray-to-bin"
        element={<GrayToBinPage />}
      />
      <Route
        path="/topics/code-converters/xs3-to-bcd"
        element={<XS3ToBCDPage />}
      />
      <Route
        path="/topics/code-converters/bcd-to-xs3"
        element={<BCDToXS3Page />}
      />

      {/* Boolean Algebra */}
      <Route path="/topics/boolean-algebra" element={<BooleanAlgebraPage />} />
      <Route path="/topics/boolean-algebra/laws" element={<LawsPage />} />
      <Route
        path="/topics/boolean-algebra/demorgan"
        element={<DeMorganPage />}
      />
      <Route path="/topics/boolean-algebra/sop-pos" element={<SOPPOSPage />} />
      <Route path="/topics/boolean-algebra/kmap" element={<KMapPage />} />

      {/* Adders */}
      <Route path="/topics/adders" element={<AddersPage />} />
      <Route path="/topics/adders/half-adder" element={<HalfAdderPage />} />
      <Route path="/topics/adders/full-adder" element={<FullAdderPage />} />
      <Route path="/topics/adders/bcd-adder" element={<BCDAdderPage />} />

      {/* Subtractors */}
      <Route path="/topics/subtractors" element={<SubtractorsPage />} />
      <Route path="/topics/subtractors/half-sub" element={<HalfSubPage />} />
      <Route path="/topics/subtractors/full-sub" element={<FullSubPage />} />

      {/* Flip-Flops */}
      <Route path="/topics/flip-flops" element={<FlipFlopsPage />} />
      <Route path="/topics/flip-flops/sr" element={<SRPage />} />
      <Route path="/topics/flip-flops/jk" element={<JKPage />} />
      <Route path="/topics/flip-flops/d" element={<DPage />} />
      <Route path="/topics/flip-flops/t" element={<TPage />} />
      <Route
        path="/topics/flip-flops/master-slave"
        element={<MasterSlavePage />}
      />

      {/* Registers */}
      <Route path="/topics/registers" element={<RegistersPage />} />
      <Route path="/topics/registers/siso" element={<SISOPage />} />
      <Route path="/topics/registers/sipo" element={<SIPOPage />} />
      <Route path="/topics/registers/piso" element={<PISOPage />} />
      <Route path="/topics/registers/pipo" element={<PIPOPage />} />

      {/* Counters */}
      <Route path="/topics/counters" element={<CountersPage />} />
      <Route path="/topics/counters/sync-up" element={<SyncUpPage />} />
      <Route path="/topics/counters/sync-down" element={<SyncDownPage />} />
      <Route path="/topics/counters/sync-updown" element={<SyncUpDownPage />} />
      <Route path="/topics/counters/async-up" element={<AsyncUpPage />} />
      <Route path="/topics/counters/async-down" element={<AsyncDownPage />} />
      <Route
        path="/topics/counters/async-updown"
        element={<AsyncUpDownPage />}
      />
      <Route path="/topics/counters/ring" element={<RingPage />} />
      <Route path="/topics/counters/johnson" element={<JohnsonPage />} />
      <Route path="/topics/counters/mod" element={<ModPage />} />

      {/* PLD */}
      <Route path="/topics/pld" element={<PLDPage />} />
      <Route path="/topics/pld/pla" element={<PLAPage />} />
      <Route path="/topics/pld/pal" element={<PALPage />} />

      <Route path="/simulator" element={<CircuitLabPage />} />
      <Route path="/simulator/:tab" element={<CircuitLabPage />} />

      {/* Homepage */}
      <Route
        path="/"
        element={
          <HomePage
            session={session}
            onLoginClick={() => {}}
            onSearchClick={() => {}}
            onLogout={handleLogout}
          />
        }
      />
    </Routes>
  );
}

export default App;
