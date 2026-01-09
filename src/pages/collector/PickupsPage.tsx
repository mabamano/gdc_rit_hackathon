
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface Pickup {
    id: number;
    house: string;
    owner: string;
    status: 'Pending' | 'Completed';
    type: 'Segregated' | 'Mixed';
}

export default function PickupsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pickups, setPickups] = useState<Pickup[]>([
        { id: 1, house: 'H-101', owner: 'Ramesh Das', status: 'Pending', type: 'Segregated' },
        { id: 2, house: 'H-102', owner: 'Sita Devi', status: 'Pending', type: 'Mixed' },
        { id: 3, house: 'H-103', owner: 'M. Khan', status: 'Completed', type: 'Segregated' },
        { id: 4, house: 'H-104', owner: 'A. Singh', status: 'Completed', type: 'Segregated' },
        { id: 5, house: 'H-105', owner: 'P. Jena', status: 'Pending', type: 'Segregated' },
        { id: 6, house: 'H-106', owner: 'B. Patnaik', status: 'Pending', type: 'Segregated' },
        { id: 7, house: 'H-107', owner: 'K. Sahoo', status: 'Pending', type: 'Mixed' },
    ]);

    const handleMarkCollected = (id: number) => {
        setPickups(prev => prev.map(pickup =>
            pickup.id === id ? { ...pickup, status: 'Completed' } : pickup
        ));
        toast.success(`Pickup for House H-10${id} marked as collected`);
    };

    const filteredPickups = pickups.filter(p =>
        p.house.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const completedCount = pickups.filter(p => p.status === 'Completed').length;
    const progress = (completedCount / pickups.length) * 100;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">Daily Pickups</h1>
                        <p className="text-muted-foreground">Manage and record household waste collection</p>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search house or owner..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <Card className="bg-muted/50 border-none">
                    <CardContent className="py-4 flex items-center gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Progress</span>
                                <span className="text-muted-foreground">{completedCount} / {pickups.length} Collected</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pickup List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            {filteredPickups.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No records found matching "{searchTerm}"
                                </div>
                            ) : (
                                filteredPickups.map(pickup => (
                                    <div key={pickup.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border hover:bg-muted/40 transition-colors gap-4">
                                        <div className="flex items-center gap-4">
                                            <Checkbox
                                                checked={pickup.status === 'Completed'}
                                                onCheckedChange={() => pickup.status !== 'Completed' && handleMarkCollected(pickup.id)}
                                                disabled={pickup.status === 'Completed'}
                                            />
                                            <div>
                                                <p className="font-semibold">{pickup.house}</p>
                                                <p className="text-sm text-muted-foreground">{pickup.owner}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 justify-between sm:justify-end">
                                            <div className="text-right">
                                                <span className={`text-xs px-2 py-1 rounded-full ${pickup.type === 'Segregated' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {pickup.type}
                                                </span>
                                            </div>
                                            {pickup.status === 'Completed' ? (
                                                <Button variant="ghost" size="sm" className="text-green-600 font-medium" disabled>
                                                    <CheckCircle2 className="w-4 h-4 mr-1" /> Collected
                                                </Button>
                                            ) : (
                                                <Button size="sm" onClick={() => handleMarkCollected(pickup.id)}>
                                                    Mark Collected
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
