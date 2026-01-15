import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Trophy, Medal, Star } from "lucide-react";

interface LeaderboardEntry {
    rank: number;
    name: string;
    points: number;
    badges: string[];
    change: 'up' | 'down' | 'same';
}

const MOCK_DATA: Record<string, LeaderboardEntry[]> = {
    street: [
        { rank: 1, name: "Thiru. Ramesh", points: 2450, badges: ["Green Hero", "Composter"], change: "same" },
        { rank: 2, name: "You", points: 2100, badges: ["Consistent"], change: "up" },
        { rank: 3, name: "Tmt. Lakshmi", points: 1950, badges: [], change: "down" },
        { rank: 4, name: "Mr. Abdul", points: 1800, badges: ["Recycler"], change: "same" },
        { rank: 5, name: "Dr. Sarah", points: 1650, badges: [], change: "up" },
    ],
    ward: [
        { rank: 1, name: "Green Apartments", points: 15400, badges: ["Zero Waste"], change: "same" },
        { rank: 12, name: "Your Household", points: 2100, badges: [], change: "up" },
        { rank: 2, name: "Sunshine Villas", points: 14200, badges: ["Composter"], change: "up" },
    ],
    city: [
        { rank: 1, name: "Ward 12 (Adyar)", points: 89000, badges: ["Platinum Ward"], change: "same" },
        { rank: 2, name: "Ward 45 (Anna Nagar)", points: 85000, badges: ["Gold Ward"], change: "up" },
        { rank: 3, name: "Ward 23 (T. Nagar)", points: 81000, badges: ["Silver Ward"], change: "down" },
    ]
};

export function Leaderboard() {
    return (
        <Card className="shadow-lg border-t-4 border-t-yellow-500">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Green Champions Leaderboard
                </CardTitle>
                <CardDescription>
                    Earn points by segregating waste correctly and reporting issues.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="street" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="street">My Street</TabsTrigger>
                        <TabsTrigger value="ward">Ward 12</TabsTrigger>
                        <TabsTrigger value="city">Chennai</TabsTrigger>
                    </TabsList>

                    {Object.entries(MOCK_DATA).map(([key, data]) => (
                        <TabsContent key={key} value={key} className="space-y-4">
                            {data.map((entry) => (
                                <div
                                    key={entry.rank}
                                    className={`flex items-center justify-between p-3 rounded-lg border ${entry.name === 'You' || entry.name === 'Your Household'
                                            ? 'bg-primary/10 border-primary/50'
                                            : 'bg-card border-border hover:bg-muted/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            flex items-center justify-center w-8 h-8 rounded-full font-bold
                                            ${entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                                entry.rank === 2 ? 'bg-slate-100 text-slate-700' :
                                                    entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                                        'bg-muted text-muted-foreground'}
                                        `}>
                                            {entry.rank <= 3 ? <Medal className="w-4 h-4" /> : entry.rank}
                                        </div>
                                        <div>
                                            <p className="font-medium flex items-center gap-2">
                                                {entry.name}
                                                {entry.name === 'You' && <Badge variant="secondary" className="text-xs">Me</Badge>}
                                            </p>
                                            <div className="flex gap-1 mt-1">
                                                {entry.badges.map(b => (
                                                    <span key={b} className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full border border-green-200 flex items-center gap-1">
                                                        <Star className="w-3 h-3" /> {b}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">{entry.points.toLocaleString()}</p>
                                        <p className="text-xs text-muted-foreground">points</p>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}
