import React, { useState, useEffect } from 'react';
import { FileText, Github, Youtube, Database, Copy, Check, ExternalLink, ChevronRight, Play, Cpu, Activity, Zap } from 'lucide-react';

// --- 机器人领域论文数据配置 (模拟 RA-L / T-RO 风格) ---
const paperData = {
  title: "Agile Flights for Quadrotor Cable-Suspended Payload System via Reinforcement Learning",
  // 机器人论文通常会标注具体的期刊或会议，有时会加上 "Accepted to..."
  publication: "Accepted to IEEE Robotics and Automation Letters (RA-L), January 2026", 
  // 许多机器人主页会展示 Lab Logo，这里用文字模拟
  authors: [
    // { name: "Dongcheng Cao", url: "#", affiliation: 1, isEqual: true },
    { name: "Dongcheng Cao", url: "#"},
    { name: "Jin Zhou", url: "#"},
    { name: "Xian Wang", url: "#"},
    { name: "Shuo Li", url: "#"},
  ],
  affiliations: [
    { id: 1, name: "College of Control Science and Engineering, Zhejiang University" }, // 典型的机器人实验室命名格式
    // { id: 2, name: "ETH Zurich, Systems Group" },
  ],
  abstract: `
    Agile flight for the quadrotor cable-suspended payload system is a formidable challenge due to its underactuated, 
    highly nonlinear, and hybrid dynamics. Traditional optimization-based methods often struggle with high computational 
    costs and the complexities of cable mode transitions, limiting their real-time applicability and maneuverability exploitation. 
    In this letter, we present FLARE, a reinforcement learning (RL) framework that directly learns an agile navigation policy from high-fidelity simulation. 
    Our method is validated across three designed challenging scenarios, notably outperforming a state-of-the-art optimization-based approach by a 3x speedup during gate traversal maneuvers. 
    Furthermore, the learned policies achieve successful zero-shot sim-to-real transfer, demonstrating remarkable agility and safety in real-world experiments, running in real time on an onboard computer.
  `,
  bibtex: `@article{cao2025flare,
  title={FLARE: Agile Flights for Quadrotor Cable-Suspended Payload System via Reinforcement Learning},
  author={Cao, Dongcheng and Zhou, Jin and Wang, Xian and Li, Shuo},
  journal={arXiv preprint arXiv:2508.09797},
  year={2025}
}`
};

// --- IEEE / Robotics 风格配色常量 ---
const COLORS = {
  primary: "bg-[#00629B]", // IEEE Blue
  primaryHover: "hover:bg-[#004e7a]",
  textLink: "text-[#00629B]",
  secondaryBg: "bg-slate-50",
  heading: "text-slate-900",
};

// --- 组件部分 ---

const Button = ({ icon: Icon, text, href, primary = false }) => (
  <a 
    href={href}
    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all shadow-sm ${
      primary 
        ? `${COLORS.primary} text-white ${COLORS.primaryHover}` 
        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
    }`}
  >
    {Icon && <Icon size={16} />}
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
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-lg font-medium text-slate-800 mb-4">
      {paperData.authors.map((author, idx) => (
        <span key={idx} className="relative">
          <a href={author.url} className={`${COLORS.textLink} hover:underline`}>
            {author.name}
          </a>
          <sup className="ml-1 text-xs text-slate-500">{author.affiliation}</sup>
          {author.isEqual && <sup className="ml-0.5 text-xs text-slate-500">*</sup>}
        </span>
      ))}
    </div>
    <div className="flex flex-col items-center gap-1 text-slate-600 text-sm">
      {paperData.affiliations.map((aff) => (
        <div key={aff.id} className="italic">
          <sup className="mr-1">{aff.id}</sup>{aff.name}
        </div>
      ))}
    </div>
    <div className="mt-3 text-xs text-slate-500">
      {/* * Equal contribution */}
    </div>
  </div>
);

// 机器人风格的占位符：更偏向于CAD图或实机照片的风格
const MediaPlaceholder = ({ height = "h-64", label = "Visual", type = "generic" }) => (
  <div className={`w-full ${height} bg-slate-100 rounded-lg border border-slate-300 flex items-center justify-center relative overflow-hidden group shadow-inner`}>
    
    {/* 网格背景，模拟工程制图/仿真环境 */}
    <div className="absolute inset-0" 
         style={{
           backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
           backgroundSize: '40px 40px',
           opacity: 0.3
         }}>
    </div>

    {type === 'sim' && (
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-32 h-32 border-4 border-slate-400 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>
        <div className="absolute w-48 h-48 border border-dashed border-slate-400 rounded-full"></div>
      </div>
    )}

    <div className="z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-md border border-slate-200 shadow-sm flex flex-col items-center">
      {label.includes("Video") ? <Play size={32} className="text-slate-800 mb-2" /> : <Cpu size={32} className="text-slate-800 mb-2" />}
      <span className="font-mono text-sm font-semibold text-slate-700">{label}</span>
    </div>
  </div>
);

// Sim-to-Real 或 鲁棒性对比组件
const ExperimentViewer = () => {
  const [activeTab, setActiveTab] = useState('stairs'); 

  const tabs = [
    { id: 'stairs', label: 'Stair Climbing' },
    { id: 'slippery', label: 'Slippery Slope (Oil)' },
    { id: 'outdoor', label: 'Outdoor Gravel' },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-200 bg-slate-50">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab.id 
                ? 'bg-white text-[#00629B] border-t-2 border-t-[#00629B] border-b-transparent' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 bg-slate-100 min-h-[350px] flex gap-4">
         {/* Left: Baseline */}
         <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1 bg-slate-200 rounded border border-slate-300 flex items-center justify-center relative">
               <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold">Baseline</span>
               <div className="text-slate-400 text-sm font-mono flex flex-col items-center">
                 <Activity size={32} className="mb-2 text-red-400" />
                 Robot Falls
               </div>
            </div>
         </div>
         {/* Right: Ours */}
         <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1 bg-white rounded border border-green-500/30 flex items-center justify-center relative shadow-md">
               <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded font-bold">Ours (Proprioceptive)</span>
               <div className="text-slate-600 text-sm font-mono flex flex-col items-center">
                 <Activity size={32} className="mb-2 text-green-500" />
                 Stable Traversal
               </div>
            </div>
         </div>
      </div>
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
        Video x4 Speed. Comparison of standard MPC (Left) vs. Our Learning Policy (Right).
      </div>
    </div>
  );
}

const BibTeXBlock = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(paperData.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 border border-slate-300 rounded p-4 relative font-mono text-sm text-slate-700">
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
      
      {/* 顶部导航 - 更加紧凑和实用 */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-slate-800 flex items-center gap-2">
            <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-sm">NESC</span>
            <span>Unstructured Locomotion</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#abstract" className="hover:text-[#00629B]">Abstract</a>
            <a href="#video" className="hover:text-[#00629B]">Video</a>
            <a href="#system" className="hover:text-[#00629B]">System</a>
            <a href="#experiments" className="hover:text-[#00629B]">Experiments</a>
            <a href="#bibtex" className="hover:text-[#00629B]">BibTeX</a>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Header 区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 max-w-5xl mx-auto leading-tight">
            {paperData.title}
          </h1>
          <p className="text-lg md:text-xl text-[#00629B] font-medium mb-6 font-serif italic">
            {paperData.publication}
          </p>
          
          <AuthorBlock />

          {/* Links - 更加工程化的按钮风格 */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button icon={FileText} text="Paper (PDF)" href="#" primary />
            <Button icon={Github} text="Code" href="#" />
            <Button icon={Youtube} text="Presentation" href="#" />
            <Button icon={ExternalLink} text="Project Site" href="#" />
          </div>
        </div>

        {/* Video Highlight - 机器人论文通常把最重要的 Demo 放在摘要上方或紧接着摘要 */}
        <div className="mb-12" id="video">
          <MediaPlaceholder height="h-[500px]" label="Main Project Video (YouTube Embed)" type="sim" />
          <p className="text-sm text-slate-600 text-center mt-2 italic">
            Video 1: Demonstration of the quadruped traversing stairs, oily surfaces, and loose gravel in real-world scenarios.
          </p>
        </div>

        {/* Abstract - 更加正式的排版 */}
        <Section title="Abstract" id="abstract">
          <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-[#00629B]">
            <p className="text-base md:text-lg leading-relaxed text-slate-800 text-justify font-serif">
              {paperData.abstract}
            </p>
          </div>
        </Section>

        {/* System Overview - 替代原来的 Methodology */}
        <Section title="System Overview" id="system">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Cpu size={20} className="text-[#00629B]" />
                Hardware & Sensing
              </h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                The system is deployed on an ANYmal C quadruped robot. The core of our approach relies exclusively on 
                onboard proprioceptive sensors (joint encoders and IMU).
              </p>
              
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Zap size={20} className="text-[#00629B]" />
                Control Policy
              </h3>
              <p className="text-slate-700 leading-relaxed">
                The control policy is a Temporal Convolutional Network (TCN) trained via Proximal Policy Optimization (PPO).
                We utilize a massive parallel simulation environment (Isaac Gym) to train over 4000 agents simultaneously on randomized terrains.
              </p>
            </div>
            <div className="md:col-span-2">
               {/* 架构图占位符 */}
               <div className="h-full bg-white border border-slate-200 rounded p-2 shadow-sm">
                  <div className="h-full bg-slate-100 rounded flex items-center justify-center text-xs text-slate-500 font-mono text-center">
                    [System Architecture Diagram]
                    <br/>
                    Sensors &rarr; State Est &rarr; Policy &rarr; Torque
                  </div>
               </div>
            </div>
          </div>
        </Section>

        {/* Experiments - 重点展示 */}
        <Section title="Real-world Experiments" id="experiments">
          <p className="mb-6 text-slate-700">
             We evaluate the robustness of our controller in three distinct challenging environments where vision-based methods typically fail due to feature-poor textures or transparent surfaces.
          </p>
          <ExperimentViewer />
        </Section>

        {/* BibTeX */}
        <Section title="BibTeX" id="bibtex">
          <BibTeXBlock />
        </Section>

        {/* Footer - 典型的学术页脚 */}
        <footer className="mt-20 py-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          <div className="mb-2">
            <span className="font-bold text-slate-700">Robotics and Perception Group</span> | University of Zurich
          </div>
          <p>
            For questions, please contact <a href="mailto:david.lee@example.edu" className="text-[#00629B] hover:underline">David Lee</a>.
          </p>
        </footer>

      </div>
    </div>
  );
}