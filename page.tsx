"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Brain, GitBranch, BarChart3, MessageSquare, Shield, Star, ChevronRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Sprint Planning",
    desc: "Intelligent backlog analysis with automated sprint generation and capacity optimization.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: MessageSquare,
    title: "Meeting Intelligence",
    desc: "Upload transcripts and get AI summaries, action items, and Jira tickets instantly.",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: GitBranch,
    title: "Jira Automation",
    desc: "Auto-create and manage Jira tickets with AI-driven workflow synchronization.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: BarChart3,
    title: "Agile Analytics",
    desc: "Real-time sprint performance, velocity trends, and team productivity insights.",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: Zap,
    title: "Backlog Prioritization",
    desc: "RICE + WSJF scoring powered by LLMs to rank what matters most.",
    color: "from-pink-500 to-rose-400",
  },
  {
    icon: Shield,
    title: "Stakeholder Reports",
    desc: "AI-generated executive summaries and KPI dashboards on demand.",
    color: "from-indigo-500 to-blue-400",
  },
];

const stats = [
  { value: "10x", label: "Faster sprint planning" },
  { value: "85%", label: "Meeting summary accuracy" },
  { value: "3hrs", label: "Saved per week per PM" },
  { value: "99.9%", label: "API uptime SLA" },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer"
  >
    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg`}>
      <feature.icon className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-base font-semibold text-white mb-2 font-display">{feature.title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
         style={{ background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 70%)" }} />
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060913] text-white overflow-hidden">
      {/* Background grid + gradient */}
      <div className="fixed inset-0 grid-bg opacity-40" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20"
           style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.4) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold font-display tracking-tight">ProductOps AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#analytics" className="hover:text-white transition-colors">Analytics</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/auth/login" className="text-white hover:text-blue-400 transition-colors">Sign in</Link>
        </div>
        <Link
          href="/auth/register"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Autonomous AI for Product Teams
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-5xl md:text-7xl font-black font-display leading-[1.05] mb-6 tracking-tight"
        >
          <span className="text-white">Your AI</span>
          <br />
          <span className="gradient-text">Product Operations</span>
          <br />
          <span className="text-white">Co-Pilot</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Automate sprint planning, generate meeting summaries, create Jira tickets,
          and get AI-powered insights — all in one intelligent platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/auth/register"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-base font-semibold hover:opacity-90 transition-opacity shadow-xl shadow-blue-500/25"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 text-base font-medium hover:bg-white/5 transition-all"
          >
            View Demo <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[#060913] bg-gradient-to-br from-blue-400 to-violet-400" />
            ))}
          </div>
          <span>Trusted by 2,000+ product teams</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
          </div>
        </motion.div>
      </section>

      {/* Dashboard Preview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-8 mb-28"
      >
        <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-xs text-gray-500 font-mono">productops.ai/dashboard</span>
          </div>
          <div className="bg-[#0d1117] p-8 min-h-[400px] flex items-center justify-center">
            {/* Mock dashboard preview */}
            <div className="w-full grid grid-cols-4 gap-4">
              {[
                { label: "Sprint Velocity", value: "42 pts", trend: "+18%", color: "blue" },
                { label: "Backlog Items", value: "87", trend: "12 critical", color: "violet" },
                { label: "AI Summaries", value: "24", trend: "this week", color: "emerald" },
                { label: "Team Health", value: "94%", trend: "excellent", color: "orange" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold font-display text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
                </div>
              ))}
              <div className="col-span-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-3">Sprint Velocity Trend</p>
                <div className="flex items-end gap-2 h-20">
                  {[28, 35, 32, 41, 38, 42, 45].map((v, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400 opacity-80"
                         style={{ height: `${(v / 50) * 100}%` }} />
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-3">AI Status</p>
                <div className="space-y-2">
                  {["Sprint Plan", "Summaries", "Prioritization"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-black font-display gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-8 mb-24">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black font-display text-white mb-4"
          >
            Everything your product team needs
          </motion.h2>
          <p className="text-gray-400 text-lg">AI-powered tools built for modern product operations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => <FeatureCard key={i} feature={f} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/50 to-violet-950/50 backdrop-blur-sm"
        >
          <h2 className="text-4xl font-black font-display text-white mb-4">
            Ready to automate your product ops?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of product teams using AI to ship faster.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start Building <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>© 2025 ProductOps AI. Built with LLMs, FastAPI, and Next.js.</p>
      </footer>
    </div>
  );
}
