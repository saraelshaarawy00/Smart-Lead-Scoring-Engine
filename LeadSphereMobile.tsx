import React, { useState, useEffect } from 'react';
import {
    Activity,
    Users,
    Calendar,
    Bell,
    Home,
    Layers,
    Zap,
    ArrowUpRight,
    CheckCircle2,
    AlertCircle,
    PauseCircle,
    MoreHorizontal
} from 'lucide-react';

// --- Types ---

type Tab = 'home' | 'campaigns' | 'feed';

interface Campaign {
    id: number;
    name: string;
    status: 'running' | 'paused' | 'completed' | 'warning';
    sent: number;
    openRate: number;
    replyRate: number;
    meetings: number;
}

interface FeedItem {
    id: number;
    type: 'meeting' | 'reply' | 'revenue' | 'system';
    title: string;
    subtitle: string;
    time: string;
    value?: string;
}

// --- Mock Data ---

const MOCK_CAMPAIGNS: Campaign[] = [
    { id: 1, name: 'Q4 Fintech Outreach', status: 'running', sent: 1240, openRate: 45, replyRate: 12, meetings: 8 },
    { id: 2, name: 'SaaS Founders Nurture', status: 'warning', sent: 850, openRate: 18, replyRate: 2, meetings: 0 },
    { id: 3, name: 'Webinar Invites', status: 'paused', sent: 3200, openRate: 62, replyRate: 5, meetings: 145 },
    { id: 4, name: 'Enterprise Expansion', status: 'running', sent: 410, openRate: 55, replyRate: 22, meetings: 12 },
];

const MOCK_FEED: FeedItem[] = [
    { id: 1, type: 'revenue', title: 'New Opportunity Created', subtitle: 'TechFlow Systems (Series B)', time: '2m ago', value: '$24k' },
    { id: 2, type: 'meeting', title: 'Meeting Booked', subtitle: 'Sarah (Agent) booked with CTO of Nexus', time: '14m ago' },
    { id: 3, type: 'reply', title: 'Positive Reply', subtitle: '"Send me the pricing deck..."', time: '1h ago' },
    { id: 4, type: 'system', title: 'Campaign Auto-Paused', subtitle: 'Low engagement detected on "SaaS Founders"', time: '2h ago' },
    { id: 5, type: 'meeting', title: 'Meeting Booked', subtitle: 'Alex (Agent) booked with VP Sales', time: '3h ago' },
];

// --- Components ---

const StatusBadge = ({ status }: { status: Campaign['status'] }) => {
    const styles = {
        running: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        paused: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        completed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    };

    const icons = {
        running: <Activity className="w-3 h-3 mr-1" />,
        paused: <PauseCircle className="w-3 h-3 mr-1" />,
        completed: <CheckCircle2 className="w-3 h-3 mr-1" />,
        warning: <AlertCircle className="w-3 h-3 mr-1" />,
    };

    return (
        <span className={`flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
            {icons[status]}
            {status.toUpperCase()}
        </span>
    );
};

const ProgressBar = ({ value, colorClass }: { value: number, colorClass: string }) => (
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value}%` }}></div>
    </div>
);

// --- Screens ---

const HomeScreen = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider">Today's Pulse</h2>
                <h1 className="text-2xl font-bold text-white">Good Morning, Boss</h1>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 relative border border-slate-700">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800"></span>
            </div>
        </div>

        {/* Primary Metric Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 shadow-xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center text-indigo-100 text-sm font-medium">
                        <Zap className="w-4 h-4 mr-1 text-yellow-300 fill-yellow-300" /> Pipeline Generated
                    </span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white">LIVE</span>
                </div>
                <div className="text-4xl font-bold text-white mb-1">$42,500</div>
                <div className="flex items-center text-indigo-200 text-xs">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    <span>+$8.2k since yesterday</span>
                </div>
            </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">TODAY</span>
                </div>
                <div className="text-2xl font-bold text-white">8</div>
                <div className="text-xs text-slate-400">Meetings Booked</div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                        <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">TODAY</span>
                </div>
                <div className="text-2xl font-bold text-white">142</div>
                <div className="text-xs text-slate-400">New Leads</div>
            </div>
        </div>

        {/* Recent Activity Teaser */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Live Feed</h3>
                <span className="text-xs text-indigo-400 font-medium">View All</span>
            </div>
            <div className="space-y-3">
                {MOCK_FEED.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className={`w-2 h-2 mt-2 rounded-full mr-3 ${item.type === 'revenue' ? 'bg-green-500' :
                                item.type === 'meeting' ? 'bg-indigo-500' : 'bg-slate-500'
                            }`}></div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <p className="text-sm font-medium text-white">{item.title}</p>
                                <span className="text-[10px] text-slate-500">{item.time}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CampaignsScreen = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Active Campaigns</h1>
            <div className="p-2 text-slate-500 border border-slate-700 rounded-lg">
                <MoreHorizontal className="w-5 h-5" />
            </div>
        </div>

        <div className="space-y-4">
            {MOCK_CAMPAIGNS.map((campaign) => (
                <div key={campaign.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-white font-bold text-base">{campaign.name}</h3>
                            <p className="text-xs text-slate-500 mt-1">{campaign.sent} Leads • AI Agent: Alex</p>
                        </div>
                        <StatusBadge status={campaign.status} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-4">
                        <div className="text-center p-2 bg-slate-900/50 rounded-lg">
                            <div className="text-indigo-400 text-lg font-bold">{campaign.openRate}%</div>
                            <div className="text-[10px] text-slate-500 uppercase">Open Rate</div>
                        </div>
                        <div className="text-center p-2 bg-slate-900/50 rounded-lg">
                            <div className="text-emerald-400 text-lg font-bold">{campaign.replyRate}%</div>
                            <div className="text-[10px] text-slate-500 uppercase">Reply Rate</div>
                        </div>
                        <div className="text-center p-2 bg-slate-900/50 rounded-lg">
                            <div className="text-white text-lg font-bold">{campaign.meetings}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Booked</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Goal Progress</span>
                            <span>{Math.round((campaign.meetings / 20) * 100)}%</span>
                        </div>
                        <ProgressBar value={(campaign.meetings / 20) * 100} colorClass="bg-indigo-500" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const FeedScreen = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Transaction Log</h1>
            <div className="bg-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
                Last 24h
            </div>
        </div>

        <div className="relative border-l border-slate-800 ml-4 space-y-8">
            {MOCK_FEED.map((item) => (
                <div key={item.id} className="relative pl-8">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-slate-950 ${item.type === 'revenue' ? 'bg-emerald-500' :
                            item.type === 'meeting' ? 'bg-indigo-500' :
                                item.type === 'system' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-bold uppercase tracking-wider ${item.type === 'revenue' ? 'text-emerald-400' :
                                    item.type === 'meeting' ? 'text-indigo-400' :
                                        item.type === 'system' ? 'text-red-400' : 'text-blue-400'
                                }`}>
                                {item.type}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">{item.time}</span>
                        </div>

                        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-start">
                                <h3 className="text-white font-medium">{item.title}</h3>
                                {item.value && (
                                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">
                                        {item.value}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.subtitle}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Main Layout ---

export default function LeadSphereMobile() {
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [loading, setLoading] = useState(true);

    // Simulate initial load
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 text-sm font-mono animate-pulse">Establishing Secure Uplink...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* Mobile Frame Content */}
            <div className="max-w-md mx-auto min-h-screen relative bg-slate-950 overflow-hidden">

                {/* Status Bar Shim */}
                <div className="h-12 w-full bg-slate-950/80 backdrop-blur-md sticky top-0 z-50"></div>

                <div className="px-5">
                    {activeTab === 'home' && <HomeScreen />}
                    {activeTab === 'campaigns' && <CampaignsScreen />}
                    {activeTab === 'feed' && <FeedScreen />}
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 pointer-events-none flex justify-center">
                    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl shadow-black/50 p-1 pointer-events-auto flex items-center justify-between w-full max-w-xs">

                        <button
                            onClick={() => setActiveTab('home')}
                            className={`flex-1 flex flex-col items-center justify-center h-14 rounded-xl transition-all duration-200 ${activeTab === 'home' ? 'text-indigo-400 bg-white/5' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <Home className={`w-6 h-6 mb-1 ${activeTab === 'home' ? 'fill-indigo-500/10' : ''}`} />
                            <span className="text-[10px] font-medium">Home</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('campaigns')}
                            className={`flex-1 flex flex-col items-center justify-center h-14 rounded-xl transition-all duration-200 ${activeTab === 'campaigns' ? 'text-indigo-400 bg-white/5' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <Layers className={`w-6 h-6 mb-1 ${activeTab === 'campaigns' ? 'fill-indigo-500/10' : ''}`} />
                            <span className="text-[10px] font-medium">Campaigns</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('feed')}
                            className={`flex-1 flex flex-col items-center justify-center h-14 rounded-xl transition-all duration-200 ${activeTab === 'feed' ? 'text-indigo-400 bg-white/5' : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <Activity className={`w-6 h-6 mb-1 ${activeTab === 'feed' ? 'fill-indigo-500/10' : ''}`} />
                            <span className="text-[10px] font-medium">Feed</span>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
}
