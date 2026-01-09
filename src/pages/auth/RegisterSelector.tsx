import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Truck, Building2, Leaf, ArrowRight, Languages, UserPlus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';

export default function RegisterSelector() {
    const { t, language, setLanguage } = useLanguage();

    // Mapping registration roles
    const roles = [
        {
            id: 'household',
            titleKey: 'role.household.title',
            descriptionKey: 'role.household.desc',
            icon: Home,
            path: '/register/household',
            color: 'from-green-500 to-emerald-700',
            shadow: 'shadow-green-500/20',
        },
        {
            id: 'collector',
            titleKey: 'role.collector.title',
            descriptionKey: 'role.collector.desc',
            icon: Truck,
            path: '/register/collector',
            color: 'from-blue-500 to-indigo-700',
            shadow: 'shadow-blue-500/20',
        },
        {
            id: 'officer',
            titleKey: 'role.officer.title',
            descriptionKey: 'role.officer.desc',
            icon: Building2,
            path: '/register/officer',
            color: 'from-orange-500 to-red-700',
            shadow: 'shadow-orange-500/20',
        },
        {
            id: 'third_party',
            titleKey: 'role.third_party.title',
            descriptionKey: 'role.third_party.desc',
            icon: Building2,
            path: '/register/third-party',
            color: 'from-purple-500 to-violet-700',
            shadow: 'shadow-purple-500/20',
        },
    ];

    return (
        <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex flex-col relative overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px]"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <header className="p-6 flex justify-between items-center bg-background/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-emerald-900/20 animate-fade-in">
                                <Leaf className="w-7 h-7 text-white" />
                            </div>
                            <div className="animate-slide-up">
                                <h1 className="font-display font-bold text-2xl text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{t('login.title')}</h1>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-sm">
                        <Languages className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{t('language.odia')}</span>
                        <Switch
                            checked={language === 'ta'}
                            onCheckedChange={(checked) => setLanguage(checked ? 'ta' : 'en')}
                            className="data-[state=checked]:bg-green-600"
                        />
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 flex items-center justify-center p-6 my-8">
                    <div className="w-full max-w-5xl">
                        <div className="text-center mb-16 animate-slide-up">
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                                New User Registration
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Join us in making Tamil Nadu cleaner and smarter. Select your role to get started.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {roles.map((role, index) => {
                                const Icon = role.icon;
                                return (
                                    <Card
                                        key={role.id}
                                        className="group border-0 bg-card/60 backdrop-blur-md hover:bg-card/90 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden relative cursor-pointer"
                                        style={{ animation: `slideUp 0.6s ease-out ${index * 0.15}s forwards`, opacity: 0 }}
                                    >
                                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${role.color}`}></div>
                                        <Link to={role.path} className="block h-full p-2">
                                            <CardHeader className="pb-4 relative z-10">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} ${role.shadow} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <CardTitle className="text-xl font-bold">{t(role.titleKey)}</CardTitle>
                                                <CardDescription className="text-sm mt-2 leading-relaxed">
                                                    {t(role.descriptionKey)}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="relative z-10 pt-4">
                                                <Button className={`w-full justify-between bg-gradient-to-r ${role.color} hover:opacity-90 transition-all shadow-md group-hover:shadow-lg text-white border-0`}>
                                                    Register
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </CardContent>

                                            {/* Hover gradient effect */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                        </Link>
                                    </Card>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center">
                            <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
                                Already have an account? <span className="font-semibold underline">Login here</span>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
