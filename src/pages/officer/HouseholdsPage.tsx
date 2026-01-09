
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function HouseholdsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const households = [
        { id: 'H001', owner: 'Ramesh Das', ward: 'W01', compliance: 92, status: 'Active' },
        { id: 'H002', owner: 'Sita Devi', ward: 'W01', compliance: 85, status: 'Active' },
        { id: 'H003', owner: 'M. Khan', ward: 'W02', compliance: 45, status: 'Warning' },
        { id: 'H004', owner: 'A. Singh', ward: 'W02', compliance: 98, status: 'Active' },
        { id: 'H005', owner: 'P. Jena', ward: 'W03', compliance: 76, status: 'Active' },
        { id: 'H006', owner: 'K. Patra', ward: 'W01', compliance: 20, status: 'Critical' },
        { id: 'H007', owner: 'S. Mohanty', ward: 'W04', compliance: 88, status: 'Active' },
        { id: 'H008', owner: 'L. Behera', ward: 'W02', compliance: 30, status: 'Warning' },
    ];

    const filteredHouseholds = households.filter(house =>
        house.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.ward.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">Manage Households</h1>
                        <p className="text-muted-foreground">Monitor compliance and manage household data across wards</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search ID, Owner, Ward..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                    <Card className="bg-blue-50/50 border-blue-100">
                        <CardContent className="p-4">
                            <div className="text-sm text-blue-600 font-medium">Total Households</div>
                            <div className="text-2xl font-bold text-blue-700">{households.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50/50 border-green-100">
                        <CardContent className="p-4">
                            <div className="text-sm text-green-600 font-medium">Compliant (&gt;80%)</div>
                            <div className="text-2xl font-bold text-green-700">{households.filter(h => h.compliance > 80).length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-yellow-50/50 border-yellow-100">
                        <CardContent className="p-4">
                            <div className="text-sm text-yellow-600 font-medium">At Risk</div>
                            <div className="text-2xl font-bold text-yellow-700">{households.filter(h => h.status === 'Warning').length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-50/50 border-red-100">
                        <CardContent className="p-4">
                            <div className="text-sm text-red-600 font-medium">Critical</div>
                            <div className="text-2xl font-bold text-red-700">{households.filter(h => h.status === 'Critical').length}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Household Directory ({filteredHouseholds.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>House ID</TableHead>
                                        <TableHead>Owner Name</TableHead>
                                        <TableHead>Ward</TableHead>
                                        <TableHead>Compliance Score</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredHouseholds.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No households found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredHouseholds.map((house) => (
                                            <TableRow key={house.id}>
                                                <TableCell className="font-medium">{house.id}</TableCell>
                                                <TableCell>{house.owner}</TableCell>
                                                <TableCell>{house.ward}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${house.compliance > 80 ? 'bg-green-500' : house.compliance > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                                style={{ width: `${house.compliance}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium">{house.compliance}%</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={house.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : house.status === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}>
                                                        {house.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                            <DropdownMenuItem>Check History</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive">Flag Issue</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
