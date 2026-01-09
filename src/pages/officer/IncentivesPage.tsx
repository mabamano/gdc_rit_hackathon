
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Save, Search, Settings2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function IncentivesPage() {
    // Data from RecycleOne Scrap Price List
    const scrapRates = {
        paper: [
            { item: 'News Paper', price: '10.00' },
            { item: 'Books', price: '7.00' },
            { item: 'Card Board', price: '4.00' },
        ],
        plastics: [
            { item: 'Soft Plastics', price: '6.00' },
            { item: 'Plastic (Hard)', price: '2.00' },
        ],
        metals: [
            { item: 'Iron', price: '22.00' },
            { item: 'Tin', price: '16.00' },
            { item: 'Brass', price: '400.00' },
            { item: 'Copper', price: '600.00' },
            { item: 'Aluminium', price: '100.00' },
            { item: 'Stainless Steel', price: '40.00' },
            { item: 'Electrical Wiring', price: '10.00' },
        ],
        electronics: [
            { item: 'E-waste (Mixed)', price: '20.00', unit: 'kg' },
            { item: 'Fridge', price: '500.00 - 1500.00', unit: 'piece' },
            { item: 'Front Load (WM)', price: '500 - 800', unit: 'piece' },
            { item: 'Top Load (WM)', price: '350 - 600', unit: 'piece' },
            { item: 'Dishwasher', price: '400 - 550', unit: 'piece' },
            { item: 'Microwave', price: '100 - 200', unit: 'piece' },
            { item: 'Split AC', price: '2500 - 3500', unit: 'piece' },
            { item: 'Window AC', price: '1800 - 3000', unit: 'piece' },
            { item: 'Laptop', price: '200 - 800', unit: 'piece' },
            { item: 'LCD Monitor', price: '20.00', unit: 'kg' },
            { item: 'CPU (Complete)', price: '25.00', unit: 'kg' },
        ],
        others: [
            { item: 'Cars Scrap', price: '18000 - 62000', unit: 'piece' },
            { item: 'Two Wheeler', price: '1000 - 2500', unit: 'piece' },
            { item: 'Battery (No Water)', price: '70.00', unit: 'kg' },
            { item: 'Tyre', price: '3.00', unit: 'kg' },
            { item: 'Mobile / Tab', price: '15.00 - 110.00', unit: 'piece' },
        ]
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold">Incentive Management</h1>
                    <p className="text-muted-foreground">Configure waste rates, reward points, and incentive programs</p>
                </div>

                <Tabs defaultValue="rates" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="rates">Scrap Rate Card</TabsTrigger>
                        <TabsTrigger value="points">Point Rules</TabsTrigger>
                        <TabsTrigger value="partners">Redemption Partners</TabsTrigger>
                    </TabsList>

                    {/* Scrap Rate Card Configuration */}
                    <TabsContent value="rates">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Market Scrap Rates</CardTitle>
                                    <CardDescription>Current market prices for waste categories (Source: RecycleOne)</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative w-64">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search item..." className="pl-9 h-9" />
                                    </div>
                                    <Button size="sm" className="h-9 gap-2">
                                        <Save className="w-4 h-4" /> Save Changes
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {/* Paper & Cardboard */}
                                    <div>
                                        <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                                            Paper & Plastics
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {[...scrapRates.paper, ...scrapRates.plastics].map((rate, i) => (
                                                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg bg-card hover:shadow-sm transition-all">
                                                    <div className="flex-1">
                                                        <Label className="text-sm text-muted-foreground">Item Name</Label>
                                                        <p className="font-medium">{rate.item}</p>
                                                    </div>
                                                    <div className="w-24">
                                                        <Label className="text-sm text-muted-foreground">Rate (₹/kg)</Label>
                                                        <Input defaultValue={rate.price} className="h-8 mt-1" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Metals */}
                                    <div>
                                        <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                            <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                                            Metals
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {scrapRates.metals.map((rate, i) => (
                                                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg bg-card hover:shadow-sm transition-all">
                                                    <div className="flex-1">
                                                        <Label className="text-sm text-muted-foreground">Item Name</Label>
                                                        <p className="font-medium">{rate.item}</p>
                                                    </div>
                                                    <div className="w-24">
                                                        <Label className="text-sm text-muted-foreground">Rate (₹/kg)</Label>
                                                        <Input defaultValue={rate.price} className="h-8 mt-1" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Electronics & Appliances */}
                                    <div>
                                        <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                                            Electronics & Appliances
                                        </h3>
                                        <div className="space-y-4">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Item Name</TableHead>
                                                        <TableHead>Unit</TableHead>
                                                        <TableHead>Price Range (₹)</TableHead>
                                                        <TableHead className="w-[100px]">Action</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {scrapRates.electronics.map((rate, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium">{rate.item}</TableCell>
                                                            <TableCell className="capitalize">{rate.unit || 'piece'}</TableCell>
                                                            <TableCell>
                                                                <Input defaultValue={rate.price} className="h-8 w-32" />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <Settings2 className="w-4 h-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>

                                    {/* Vehicles & Others */}
                                    <div>
                                        <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                            <span className="w-2 h-8 bg-red-500 rounded-full"></span>
                                            Vehicles & Others
                                        </h3>
                                        <div className="space-y-4">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Item Name</TableHead>
                                                        <TableHead>Unit</TableHead>
                                                        <TableHead>Price Range (₹)</TableHead>
                                                        <TableHead className="w-[100px]">Action</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {scrapRates.others.map((rate, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium">{rate.item}</TableCell>
                                                            <TableCell className="capitalize">{rate.unit || 'piece'}</TableCell>
                                                            <TableCell>
                                                                <Input defaultValue={rate.price} className="h-8 w-32" />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <Settings2 className="w-4 h-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Point Rules Configuration */}
                    <TabsContent value="points">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Point Allocation Rules</CardTitle>
                                    <CardDescription>Set how many points are awarded for actions</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label className="col-span-2">Correct Segregation (per kg)</Label>
                                        <Input type="number" defaultValue="10" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label className="col-span-2">Daily Consistency Bonus</Label>
                                        <Input type="number" defaultValue="5" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 items-center">
                                        <Label className="col-span-2">Referral Bonus</Label>
                                        <Input type="number" defaultValue="100" />
                                    </div>
                                    <Button className="w-full mt-4">Save Configuration</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Redemption Partners */}
                    <TabsContent value="partners">
                        <Card>
                            <CardHeader>
                                <CardTitle>Redemption Partners</CardTitle>
                                <CardDescription>Manage vendors accepting reward points</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Gift className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Local Grocery Association</p>
                                            <p className="text-xs text-muted-foreground">Active • 5% Discount</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </div>

                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                            <Gift className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Organic Fertilisers Ltd</p>
                                            <p className="text-xs text-muted-foreground">Active • Compost Exchange</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </div>

                                <Button variant="secondary" className="w-full">Add New Partner</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}
