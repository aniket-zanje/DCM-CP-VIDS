import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { TOPICS_TREE } from '../pages/TopicsPage';

export const Navbar = ({ onSearchClick, onLoginClick, session, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topicsDropdownOpen, setTopicsDropdownOpen] = useState(false);

  const topicsList = TOPICS_TREE.map((topic) => ({
    title: topic.title,
    desc: topic.subtitle,
    icon: topic.icon,
    path: topic.path,
  }));

  return (
    <header className="sticky top-0 z-50 bg-vids-ivory/90 backdrop-blur-md border-b border-vids-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name (Exact match to reference image with elevated finish) */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none select-none">
            {/* Geometric Circuit Microchip with letter V */}
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-vids-sage-600 flex items-center justify-center p-1.5 shadow-chip group-hover:scale-105 group-hover:border-vids-sage-700 transition-all">
              <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                <rect x="8" y="8" width="32" height="32" rx="6" fill="#F3F7F4" stroke="#376241" strokeWidth="2.5"/>
                <path d="M12 4v4M18 4v4M24 4v4M30 4v4M36 4v4M12 40v4M18 40v4M24 40v4M30 40v4M36 40v4" stroke="#467652" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M4 12h4M4 18h4M4 24h4M4 30h4M4 36h4M40 12h4M40 18h4M40 24h4M40 30h4M40 36h4" stroke="#467652" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M16 18L24 30L32 18" stroke="#16201A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="30" r="2.2" fill="#467652"/>
              </svg>
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-2xl tracking-tight text-vids-charcoal-900 group-hover:text-vids-sage-700 transition-colors">
                VIDS
              </span>
              <div className="h-5 w-[1.5px] bg-vids-border hidden sm:block"></div>
              <span className="text-xs font-semibold text-vids-charcoal-600 max-w-[130px] leading-tight hidden sm:block">
                Visual Interactive Digital Systems
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Matching reference image) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {/* Active Home Pill (Warm sand background matching reference) */}
            <a
              href="#home"
              className="px-4 py-2 rounded-full text-xs font-extrabold bg-vids-sand text-vids-sand-text shadow-xs transition-all hover:bg-vids-sand/80"
            >
              Home
            </a>

            {/* Topics Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTopicsDropdownOpen(!topicsDropdownOpen)}
                onBlur={() => setTimeout(() => setTopicsDropdownOpen(false), 200)}
                className="px-3.5 py-2 rounded-full text-xs font-bold text-vids-charcoal-700 hover:text-vids-charcoal-900 hover:bg-vids-sage-100/70 inline-flex items-center gap-1 transition-all"
              >
                <span>Topics</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${topicsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {topicsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-clay-hover border border-vids-border p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-vids-border text-[10px] font-bold uppercase tracking-wider text-vids-charcoal-400 flex items-center justify-between">
                    <span>Digital Systems Syllabus</span>
                    <span className="text-vids-sage-600 font-mono">B.Tech</span>
                  </div>
                  <div className="py-1">
                    {topicsList.map((t) => (
                      <Link
                        key={t.path}
                        to={t.path}
                        onClick={() => setTopicsDropdownOpen(false)}
                        className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-vids-sage-50 group transition-colors"
                      >
                        <span className="w-8 h-8 rounded-lg bg-vids-sand/50 text-vids-sand-text font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-vids-sage-100 group-hover:text-vids-sage-800 transition-colors">
                          {t.icon}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-vids-charcoal-900 group-hover:text-vids-sage-700">
                            {t.title}
                          </div>
                          <div className="text-[11px] text-vids-charcoal-500 line-clamp-1">
                            {t.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to="/topics"
                      onClick={() => setTopicsDropdownOpen(false)}
                      className="mt-1 block px-3 py-2.5 rounded-xl text-xs font-extrabold text-vids-sage-700 hover:bg-vids-sage-50"
                    >
                      See all topics
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#tools"
              className="px-3.5 py-2 rounded-full text-xs font-bold text-vids-charcoal-700 hover:text-vids-charcoal-900 hover:bg-vids-sage-100/70 transition-all"
            >
              Tools
            </a>

            <a
              href="#simulation-workbench"
              className="px-3.5 py-2 rounded-full text-xs font-bold text-vids-charcoal-700 hover:text-vids-charcoal-900 hover:bg-vids-sage-100/70 transition-all"
            >
              Simulations
            </a>

            <a
              href="#core-concepts"
              className="px-3.5 py-2 rounded-full text-xs font-bold text-vids-charcoal-700 hover:text-vids-charcoal-900 hover:bg-vids-sage-100/70 transition-all"
            >
              Practice
            </a>
          </nav>

          {/* Right Action Buttons (Matching reference image) */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              onClick={onSearchClick}
              title="Search digital concepts, gates & ICs"
              className="w-10 h-10 rounded-full flex items-center justify-center text-vids-charcoal-700 hover:text-vids-charcoal-900 hover:bg-vids-sage-100/80 transition-all border border-transparent hover:border-vids-border"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Login Pill Button (Sage green pill with user icon, matching screenshot) */}
            {session ? (
              <div className="inline-flex items-center gap-2">
                <span className="hidden sm:inline max-w-[120px] truncate text-xs font-bold text-vids-charcoal-800">
                  {session.fullName}
                </span>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-vids-border hover:bg-vids-sage-100 text-vids-charcoal-800 text-xs font-bold transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-vids-sage-500 hover:bg-vids-sage-600 text-white text-xs font-bold shadow-sm hover:shadow transition-all group"
              >
                <User className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl text-vids-charcoal-700 hover:bg-vids-sage-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-vids-border bg-vids-ivory px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-bold text-vids-charcoal-800 hover:bg-vids-sage-100"
          >
            Home
          </a>
          <Link
            to="/topics"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-bold text-vids-charcoal-800 hover:bg-vids-sage-100"
          >
            All Topics
          </Link>
          {!session && (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-vids-charcoal-800 hover:bg-vids-sage-100"
            >
              Login
            </Link>
          )}
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-bold text-vids-charcoal-800 hover:bg-vids-sage-100"
          >
            Circuit Simulations Slider
          </a>
          <a
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-bold text-vids-charcoal-800 hover:bg-vids-sage-100"
          >
            Logic Tools & Playground
          </a>
        </div>
      )}
    </header>
  );
};
