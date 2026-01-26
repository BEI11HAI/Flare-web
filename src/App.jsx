import React, { useState, useEffect } from 'react';
import { Github, Youtube, Check, Copy, ExternalLink, Play, Cpu, Activity, Zap, Flag, Target, Layers } from 'lucide-react';

// --- FLARE 论文数据配置 ---
const paperData = {
  title: "FLARE: Agile Flights for Quadrotor Cable-Suspended Payload System via Reinforcement Learning",
  publication: "IEEE Robotics and Automation Letters (RA-L), Accepted January 2026", 
  authors: [
    { name: "Dongcheng Cao", url: "#" },
    { name: "Jin Zhou", url: "#" },
    { name: "Xian Wang", url: "#" },
    { name: "Shuo Li", url: "#" },
  ],
  affiliations: [
    { name: "College of Control Science and Engineering, Zhejiang University" },
  ],
  abstract: `
    Agile flight for the quadrotor cable-suspended payload system is a formidable challenge due to its underactuated, highly nonlinear, and hybrid dynamics. 
    In this letter, we present FLARE, a reinforcement learning (RL) framework that directly learns an agile navigation policy from high-fidelity simulation. 
    Our method is validated across three designed challenging scenarios: agile waypoint passing, payload targeting, and gate traversal. 
    Notably, our method outperforms a state-of-the-art optimization-based approach (Impactor) by a 3x speedup during gate traversal maneuvers. 
    Furthermore, the learned policies achieve successful zero-shot sim-to-real transfer, demonstrating remarkable agility and safety in real-world experiments.
  `,
  bibtex: `@article{cao2026flare,
  title={FLARE: Agile Flights for Quadrotor Cable-Suspended Payload System via Reinforcement Learning},
  author={Cao, Dongcheng and Zhou, Jin and Wang, Xian and Li, Shuo},
  journal={IEEE Robotics and Automation Letters},
  year={2026},
  publisher={IEEE}
}`,
  links: {
    pdf: "#", // PDF 链接
    arxiv: "#", // ArXiv 链接
    code: "https://github.com/BEI11HAI/Flare",
    youtube: "https://youtu.be/CASn9SbnMHo", // YouTube 链接
    bilibili: "#", // Bilibili 链接
  }
};

// --- 配色常量 ---
const COLORS = {
  primary: "bg-[#003f88]", 
  primaryHover: "hover:bg-[#002a5c]",
  textLink: "text-[#003f88]",
};

// --- 官方品牌图标组件 (SVG Paths) ---

// 1. PDF (Adobe Acrobat Official Icon)
const PdfIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M23.63 15.3c-.71-.77-5.4-6.57-5.4-11.4A3.9 3.9 0 0 0 14.33 0c-3.1 0-3.33 3.97-3.33 4.6 0 .34.25 3.9 3.2 7.7.74.96 1.95 2.15 4.93 2.9h.03c1.78.48 4.5 1.53 4.5 3.32 0 3.34-5.6 5.46-8.24 5.46-4.5 0-9.42-3.38-9.42-9.62 0-2.8 1.6-5.4 4.38-7.1 1.72-1.05 3.4-1.4 3.4-1.4.67-.14 1-.84.77-1.4-.22-.54-.92-.83-1.63-.66-.1.02-3.37 1.05-6.07 3.36C2.2 10.15 0 13.56 0 17.38c0 7.8 7.3 6.6 8.5 6.6 11.23.1 15.5-8.58 15.13-8.68z"/>
  </svg>
);

// 2. ArXiv (Official Logomark - The "X")
const ArxivIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.48 9.53L12.88 10.05L7.11 18.4H5.11L9.2 11.2L8.83 10.72L3.25 2.24H5.26L9.6 8.05L9.96 8.53L15.57 2.24H17.57L12.48 9.53Z"/>
  </svg>
);

// 3. Bilibili (Official TV Icon)
const BilibiliIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.813 4.653h.854c1.51.054 2.769.76 3.46 1.943.52 1.13.418 2.306.417 2.31v6.967c-.002 1.576-1.072 2.768-2.73 3.097-1.08.16-2.613.06-2.613.06l-9.975.053c-1.89 0-3.08-1.28-3.155-2.825V8.92c-.004-1.12.35-2.31 1.258-3.08 1.12-.86 2.593-.763 2.73-.75l.937-.02L7.33 2.95l1.622-.55 2.59 4.02c3.41-.39 5.676-1.253 6.27-1.767zM7.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  </svg>
);

// --- 组件部分 ---

const Button = ({ icon: Icon, text, href }) => (
  <a 
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-white ${COLORS.primary} ${COLORS.primaryHover}`}
  >
    {Icon && <Icon size={18} />}
    <span>{text}</span>
  </a>
);

const Section = ({ title, children, className = "", id = "" }) => (
  <section id={id} className={`mb-20 scroll-mt-24 ${className}`}>
    <div className="flex items-center gap-4 mb-8 border-b border-slate-200 pb-2">
      <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
    </div>
    {children}
  </section>
);

const AuthorBlock = () => (
  <div className="text-center mb-6">
    <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-lg font-medium text-slate-800 mb-4">
      {paperData.authors.map((author, idx) => (
        <span key={idx} className="relative">
          <a href={author.url} className={`${COLORS.textLink} hover:underline`}>
            {author.name}
          </a>
        </span>
      ))}
    </div>
    <div className="flex flex-col items-center gap-1 text-slate-600 text-sm">
      {paperData.affiliations.map((aff, idx) => (
        <div key={idx} className="italic">
          {aff.name}
        </div>
      ))}
    </div>
  </div>
);

// 视频/图片占位符
const MediaPlaceholder = ({ height = "h-64", label = "Visual", type = "generic", caption = "" }) => (
  <div className="flex flex-col gap-2">
    <div className={`w-full ${height} bg-slate-100 rounded-lg border border-slate-300 flex items-center justify-center relative overflow-hidden group shadow-inner`}>
      {/* 网格背景 */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             opacity: 0.3
           }}>
      </div>
      
      {/* 模拟内容 */}
      <div className="z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-md border border-slate-200 shadow-sm flex flex-col items-center text-center">
        {label.toLowerCase().includes("video") ? <Play size={40} className="text-[#003f88] mb-2 fill-current opacity-80" /> : <Activity size={32} className="text-slate-800 mb-2" />}
        <span className="font-mono text-sm font-bold text-slate-700 uppercase tracking-wide">{label}</span>
        <span className="text-xs text-slate-500 mt-1">(Replace with &lt;video&gt; or &lt;img&gt;)</span>
      </div>
    </div>
    {caption && <p className="text-sm text-slate-600 italic text-center px-4">{caption}</p>}
  </div>
);

// 核心场景展示组件
const ScenarioShowcase = () => {
  return (
    <div className="space-y-16">
      
      {/* Scenario 1 */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full text-[#003f88]"><Flag size={24} /></div>
            <h3 className="text-xl font-bold text-slate-800">Scenario I: Agile Waypoint Passing</h3>
          </div>
          <p className="text-slate-700 leading-relaxed mb-4">
            The policy learns to navigate the quadrotor through a sequence of waypoints at high speeds. 
            Unlike single-drone policies that fail under payload dynamics, <strong>FLARE</strong> accounts for the coupled system, ensuring stability even during aggressive maneuvers.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <li className="flex justify-between">
              <span>Avg. Velocity (Simulation):</span>
              <span className="font-mono font-bold">5.40 m/s</span>
            </li>
            <li className="flex justify-between">
              <span>Max. Velocity (Real-world):</span>
              <span className="font-mono font-bold text-[#003f88]">5.80 m/s</span>
            </li>
          </ul>
        </div>
        <MediaPlaceholder height="h-64" label="Scenario I Video (Real-world Flight)" type="video" />
      </div>

      {/* Scenario 2 */}
      <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
        <div className="md:order-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-full text-purple-700"><Target size={24} /></div>
            <h3 className="text-xl font-bold text-slate-800">Scenario II: Payload Targeting</h3>
          </div>
          <p className="text-slate-700 leading-relaxed mb-4">
            The objective shifts from guiding the drone to directing the <strong>payload</strong> to specific coordinates. 
            The policy actively exploits the cable's swing dynamics, allowing the drone to brake early and "throw" the payload towards the target efficiently.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
             <li className="flex justify-between">
              <span>Targeting Error:</span>
              <span className="font-mono font-bold">0.12 m</span>
            </li>
            <li className="flex justify-between">
              <span>Payload Max Velocity:</span>
              <span className="font-mono font-bold text-purple-700">3.74 m/s</span>
            </li>
          </ul>
        </div>
        <MediaPlaceholder height="h-64" label="Scenario II Video (Payload Throwing)" type="video" className="md:order-1"/>
      </div>

      {/* Scenario 3 */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full text-red-700"><Layers size={24} /></div>
            <h3 className="text-xl font-bold text-slate-800">Scenario III: Agile Gate Traversal</h3>
          </div>
          <p className="text-slate-700 leading-relaxed mb-4">
            The most challenging scenario: traversing a narrow circular gate where the system size exceeds the gate diameter.
            <strong>FLARE</strong> achieves this 3x faster than the optimization-based baseline (Impactor).
          </p>
          <ul className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
             <li className="flex justify-between border-b border-slate-200 pb-1">
              <span>Method</span>
              <span>Max Velocity</span>
            </li>
            <li className="flex justify-between opacity-75">
              <span>Impactor (Baseline)</span>
              <span className="font-mono">1.28 m/s</span>
            </li>
            <li className="flex justify-between font-bold text-red-700 bg-red-50 -mx-2 px-2 py-1 rounded">
              <span>FLARE (Ours)</span>
              <span className="font-mono">3.67 m/s (3x Faster)</span>
            </li>
          </ul>
        </div>
        <MediaPlaceholder height="h-64" label="Scenario III Video (Gate Traversal)" type="video" />
      </div>

    </div>
  );
};

const BibTeXBlock = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(paperData.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 border border-slate-300 rounded p-4 relative font-mono text-sm text-slate-700 max-w-5xl mx-auto">
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded text-slate-500 transition-colors"
        title="Copy BibTeX"
      >
        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
      </button>
      <pre className="overflow-x-auto whitespace-pre-wrap pr-10">
        {paperData.bibtex}
      </pre>
    </div>
  );
};

export default function RobotPaperPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-slate-800 flex items-center gap-2">
            <span className="bg-[#003f88] text-white px-2 py-0.5 rounded font-serif">ZJU</span>
            <span>NESC</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#abstract" className="hover:text-[#003f88]">Abstract</a>
            <a href="#video" className="hover:text-[#003f88]">Video</a>
            <a href="#method" className="hover:text-[#003f88]">Method</a>
            <a href="#scenarios" className="hover:text-[#003f88]">Scenarios</a>
            <a href="#bibtex" className="hover:text-[#003f88]">BibTeX</a>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 max-w-6xl mx-auto leading-tight">
            {paperData.title}
          </h1>
          <p className="text-lg md:text-xl text-[#003f88] font-medium mb-8 font-serif">
            {paperData.publication}
          </p>
          
          <AuthorBlock />

          {/* 统一风格的按钮区域 */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button icon={PdfIcon} text="Paper" href={paperData.links.pdf} />
            <Button icon={ArxivIcon} text="ArXiv" href={paperData.links.arxiv} />
            <Button icon={Github} text="Code" href={paperData.links.code} />
            <Button icon={Youtube} text="Video" href={paperData.links.youtube} />
            <Button icon={BilibiliIcon} text="Bilibili" href={paperData.links.bilibili} />
          </div>
        </div>

        {/* Teaser Video */}
        <div className="mb-16" id="video">
          <div className="max-w-4xl mx-auto">
            <iframe 
              className="w-full aspect-video rounded-xl shadow-2xl border border-slate-200"
              src="https://www.youtube.com/embed/CASn9SbnMHo" 
              title="FLARE Main Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Abstract */}
        <Section title="Abstract" id="abstract">
          <div className="bg-slate-50 p-8 rounded-xl border-l-4 border-[#003f88] max-w-5xl mx-auto shadow-sm">
            <p className="text-base md:text-lg leading-relaxed text-slate-800 text-justify font-serif">
              {paperData.abstract}
            </p>
          </div>
        </Section>

        {/* Method Overview */}
        <Section title="Methodology: FLARE Framework" id="method">
          {/* 修改 grid-cols 比例，从 grid-cols-2 改为 grid-cols-3。文字占1份，图片占2份 */}
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Direct Sim-to-Real RL Policy</h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                We formulate the problem as a Markov Decision Process (MDP) and train a neural network policy using <strong>PPO</strong> in the high-fidelity <strong>Genesis</strong> simulator.
              </p>
              <ul className="space-y-3 mb-6 text-slate-700">
                <li className="flex items-start">
                  <Zap className="text-[#003f88] mt-1 mr-3 flex-shrink-0" size={18} />
                  <span><strong>Model-Free:</strong> Eliminates reliance on complex gradients of hybrid dynamics (slack/taut cables).</span>
                </li>
                <li className="flex items-start">
                  <Cpu className="text-[#003f88] mt-1 mr-3 flex-shrink-0" size={18} />
                  <span><strong>Real-Time Inference:</strong> Runs efficiently on onboard computers (Cool Pi) at 100Hz.</span>
                </li>
                <li className="flex items-start">
                  <Activity className="text-[#003f88] mt-1 mr-3 flex-shrink-0" size={18} />
                  <span><strong>Zero-Shot Transfer:</strong> Domain randomization ensures robustness against real-world disturbances.</span>
                </li>
              </ul>
            </div>
            
            {/* 修改区域：跨两列 (md:col-span-2) */}
            <div className="md:col-span-2 w-full bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 p-2">
               <img 
                 src="./methodology.png" 
                 className="w-full h-auto" 
                 alt="Methodology Framework" 
               />
            </div>
          </div>
        </Section>

        {/* Three Scenarios Section */}
        <Section title="Three Challenging Scenarios" id="scenarios">
          <p className="mb-10 text-slate-600 max-w-3xl">
            We validate FLARE across three distinct tasks that require exploiting the full potential of the underactuated system dynamics.
          </p>
          <ScenarioShowcase />
        </Section>

        {/* BibTeX */}
        <Section title="Citation" id="bibtex">
          <BibTeXBlock />
        </Section>

        {/* Footer */}
        <footer className="mt-24 py-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          <div className="mb-2">
            <span className="font-bold text-slate-700">College of Control Science and Engineering</span> | Zhejiang University
          </div>
          <p>
            © 2026 {paperData.authors[0].name} et al.
          </p>
        </footer>

      </div>
    </div>
  );
}