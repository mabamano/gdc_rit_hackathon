
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ShoppingBag, Leaf, Gift, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function RewardsPage() {
    const currentPoints = 1250;
    const nextTier = 2000;
    const progress = (currentPoints / nextTier) * 100;

    const rewards = [
        {
            id: 1,
            title: 'Municipal Tax Rebate',
            description: 'Get 5% off on your next property tax payment',
            cost: 5000,
            icon: <BuildingIcon className="w-10 h-10 text-primary" />,
            color: 'bg-blue-500/10 text-blue-600',
        },
        {
            id: 2,
            title: 'Organic Compost Pack',
            description: '5kg pack of high-quality organic compost',
            cost: 800,
            icon: <Leaf className="w-10 h-10 text-green-600" />,
            color: 'bg-green-500/10 text-green-600',
        },
        {
            id: 3,
            title: 'Shopping Voucher',
            description: '₹500 voucher for partner grocery stores',
            cost: 1500,
            icon: <ShoppingBag className="w-10 h-10 text-orange-600" />,
            color: 'bg-orange-500/10 text-orange-600',
        },
        {
            id: 4,
            title: 'Movie Tickets',
            description: '2 Tickets to local cinema',
            cost: 1200,
            icon: <Gift className="w-10 h-10 text-purple-600" />,
            color: 'bg-purple-500/10 text-purple-600',
        },
    ];

    const history = [
        { id: 1, action: 'Proper Segregation', points: '+50', date: 'Today, 9:00 AM' },
        { id: 2, action: 'Organic Compost Redemption', points: '-800', date: 'Yesterday' },
        { id: 3, action: 'Weekly Streak Bonus', points: '+100', date: 'Dec 05, 2025' },
        { id: 4, action: 'Proper Segregation', points: '+50', date: 'Dec 04, 2025' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold">Green Rewards</h1>
                    <p className="text-muted-foreground">Earn points for segregation and redeem them for benefits</p>
                </div>

                {/* Current Balance */}
                <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <p className="text-primary-foreground/80 mb-1">Available Points</p>
                                <h2 className="text-5xl font-bold font-display">{currentPoints}</h2>
                            </div>

                            <div className="flex-1 w-full max-w-sm bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Silver Tier</span>
                                    <span>Gold Tier</span>
                                </div>
                                <Progress value={progress} className="h-3 bg-white/20" />
                                <p className="text-xs mt-2 text-primary-foreground/80">{nextTier - currentPoints} points to reach Gold Tier</p>
                            </div>

                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                <Award className="w-8 h-8" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Available Rewards */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Gift className="w-5 h-5" /> Available Rewards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {rewards.map(reward => (
                            <Card key={reward.id} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${reward.color}`}>
                                        {reward.icon}
                                    </div>
                                    <CardTitle className="text-lg">{reward.title}</CardTitle>
                                    <CardDescription>{reward.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-bold text-primary">{reward.cost} pts</span>
                                        <Button size="sm" variant={currentPoints >= reward.cost ? "default" : "outline"} disabled={currentPoints < reward.cost}>
                                            {currentPoints >= reward.cost ? 'Redeem' : 'Need Points'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Points History */}
                <Card variant="stat">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" /> Points History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {history.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.points.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {item.points.startsWith('+') ? <Leaf className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.action}</p>
                                            <p className="text-xs text-muted-foreground">{item.date}</p>
                                        </div>
                                    </div>
                                    <span className={`font-bold ${item.points.startsWith('+') ? 'text-green-600' : 'text-orange-600'}`}>
                                        {item.points} pts
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}

// Helper icon
function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    )
}
