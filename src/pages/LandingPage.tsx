
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, ChevronRight, FileText, Leaf, Recycle, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LandingPage() {
    const { t } = useLanguage();

    // TNPCB Data for Tamil Nadu (2023-24)
    const annualStats = [
        { label: 'Total Waste Generated', value: '2,103 TPD', change: 'Total MSW', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Collection Efficiency', value: '96%', change: '2,020 TPD Collected', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Processed / Treated', value: '65%', change: '1,356 TPD', icon: Recycle, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Landfilled', value: '35%', change: '738 TPD', icon: ShieldCheck, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation */}
            <nav className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-display font-bold text-xl">Smart Waste 360</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button>Login <ArrowRight className="w-4 h-4 ml-2" /></Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary rounded-full">
                            Official Waste Management Portal of Tamil Nadu
                        </Badge>
                        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                            Building a Cleaner <span className="text-primary">Tamil Nadu</span>, Together.
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Empowering citizens, collectors, and officials with smart technology for efficient waste segregation, collection, and recycling.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/login">
                                <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    Access Dashboard <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full">
                                View Public Reports
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Decorative Gradients */}
                <div className="absolute top-0 left-0 -z-10 w-full h-full opacity-30">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
            </section>

            {/* CPCB Report Highlights */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-display font-bold mb-2">State Waste Management Report</h2>
                            <p className="text-muted-foreground">Key highlights from the TNPCB Annual Report 2023-24 for Tamil Nadu</p>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <FileText className="w-4 h-4" /> Download Full Report
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {annualStats.map((stat, index) => (
                            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <Badge variant="secondary" className={`${stat.color} ${stat.bg} hover:${stat.bg}`}>
                                        Annual
                                    </Badge>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold font-display mb-1">{stat.value}</div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <p className="text-xs text-green-600 mt-2 font-medium">{stat.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none">
                            <CardHeader>
                                <CardTitle className="text-2xl">Vision 2030</CardTitle>
                                <CardDescription className="text-gray-400">Strategic goals for sustainable waste management</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Leaf className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Zero Landfill State</h4>
                                        <p className="text-gray-400 leading-relaxed">Achieving 100% waste processing and implementing circular economy principles to minimize landfill usage.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Users className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Community Participation</h4>
                                        <p className="text-gray-400 leading-relaxed">Engaging every citizen through the Smart Waste 360 platform for source segregation and monitoring.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border shadow-sm">
                            <CardHeader>
                                <CardTitle>Recent Initiatives</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start border-b pb-4 last:border-0">
                                        <div>
                                            <h4 className="font-semibold">Micro-Composting Centers</h4>
                                            <p className="text-sm text-muted-foreground mt-1">Establishment of 500+ MCCs across urban local bodies for wet waste processing.</p>
                                            <Badge className="mt-2" variant="secondary">Infrastructure</Badge>
                                        </div>
                                        <span className="text-sm text-muted-foreground whitespace-nowrap">Oct 2024</span>
                                    </div>
                                    <div className="flex justify-between items-start border-b pb-4 last:border-0">
                                        <div>
                                            <h4 className="font-semibold">Smart Bin Deployment</h4>
                                            <p className="text-sm text-muted-foreground mt-1">IoT-enabled sensor bins installed in 12 major municipal corporations.</p>
                                            <Badge className="mt-2" variant="secondary">Technology</Badge>
                                        </div>
                                        <span className="text-sm text-muted-foreground whitespace-nowrap">Dec 2024</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t py-12 mt-auto">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg">Smart Waste 360</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6">
                        An initiative by the Government of Tamil Nadu | Municipal Administration Department
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
                    </div>
                    <p className="text-xs text-muted-foreground/50 mt-8">
                        © 2025 Tamil Nadu Smart Waste Management System. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
