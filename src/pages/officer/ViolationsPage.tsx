
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Clock, Filter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ViolationsPage() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const [violations, setViolations] = useState([
        { id: 1, type: 'Hazardous Waste', location: 'Ward 5, St 2', status: 'Open', severity: 'High', date: 'Just now', description: 'Large quantity of batteries found mixed with organic waste.' },
        { id: 2, type: 'Mixing Waste', location: 'Ward 3, St 1', status: 'In Progress', severity: 'Medium', date: '2 hours ago', description: 'Repeated mixing of plastics in green bin.' },
        { id: 3, type: 'Bin Damage', location: 'Ward 1, Main Rd', status: 'Resolved', severity: 'Low', date: 'Yesterday', description: 'Lid broken on Bin #104.' },
        { id: 4, type: 'Overflowing', location: 'Ward 2, Market', status: 'Open', severity: 'High', date: '3 hours ago', description: 'Market area bin overflowing with packaging waste.' },
    ]);

    const handleAction = (id: number) => {
        // Logic to update status
        setViolations(prev => prev.map(v =>
            v.id === id ? { ...v, status: 'In Progress' } : v
        ));
    };

    const handleResolve = (id: number) => {
        setViolations(prev => prev.map(v =>
            v.id === id ? { ...v, status: 'Resolved' } : v
        ));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold">Violations & Issues</h1>
                    <p className="text-muted-foreground">Manage reported incidents and enforcement actions</p>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search violations..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Tabs defaultValue="open" className="w-full">
                    <TabsList>
                        <TabsTrigger value="open">Open Issues</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="open" className="mt-6 space-y-4">
                        {violations.filter(v => v.status !== 'Resolved').map(violation => (
                            <Card key={violation.id} className="hover:border-primary/50 transition-colors">
                                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            {violation.type}
                                            <Badge variant={violation.severity === 'High' ? 'destructive' : 'default'} className="text-xs">
                                                {violation.severity} Severity
                                            </Badge>
                                            <Badge variant="outline" className={`${violation.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                                                {violation.status}
                                            </Badge>
                                        </CardTitle>
                                        <CardDescription>{violation.location} • {violation.date}</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        {violation.status === 'Open' && (
                                            <Button size="sm" onClick={() => handleAction(violation.id)}>Assign Team</Button>
                                        )}
                                        <Button size="sm" variant="outline" onClick={() => handleResolve(violation.id)}>Mark Resolved</Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="p-3 bg-muted/30 rounded-lg text-sm">
                                        <p className="font-semibold mb-1">Report Details:</p>
                                        <p className="text-muted-foreground">{violation.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {violations.filter(v => v.status !== 'Resolved').length === 0 && (
                            <div className="text-center py-10 text-muted-foreground">No open violations found.</div>
                        )}
                    </TabsContent>

                    <TabsContent value="resolved" className="mt-6 space-y-4">
                        {violations.filter(v => v.status === 'Resolved').map(violation => (
                            <Card key={violation.id} className="opacity-80">
                                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2 text-muted-foreground">
                                            {violation.type}
                                            <span className="text-xs font-normal border px-2 py-0.5 rounded">ID: #{violation.id}</span>
                                        </CardTitle>
                                        <CardDescription>{violation.location} • {violation.date}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Resolved
                                    </Badge>
                                </CardHeader>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
