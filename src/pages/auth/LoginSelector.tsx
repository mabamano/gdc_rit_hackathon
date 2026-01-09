import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  User, Truck, Users, Globe, Building2, ChevronRight,
  ShieldCheck, Recycle, Home, Leaf, ArrowRight, Languages, Landmark, Trash2, Map
} from 'lucide-react';
import { SmartBinChatbot } from '@/components/SmartBinChatbot';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LoginSelector() {
  const { t, language, setLanguage } = useLanguage();

  const allRoles = [
    // Administrative Level
    {
      id: 'state_admin',
      titleKey: 'role.state_admin.title',
      descriptionKey: 'role.state_admin.desc',
      icon: Landmark,
      path: '/login/state-admin',
      color: 'from-rose-500 to-red-700',
      shadow: 'shadow-rose-500/20',
    },
    {
      id: 'municipal_admin',
      titleKey: 'role.municipal_admin.title',
      descriptionKey: 'role.municipal_admin.desc',
      icon: Building2,
      path: '/login/municipal-admin',
      color: 'from-indigo-500 to-blue-700',
      shadow: 'shadow-indigo-500/20',
    },
    // Department Level
    {
      id: 'sanitation',
      titleKey: 'role.sanitation.title',
      descriptionKey: 'role.sanitation.desc',
      icon: Trash2,
      path: '/login/sanitation',
      color: 'from-amber-500 to-orange-700',
      shadow: 'shadow-amber-500/20',
    },
    {
      id: 'logistics',
      titleKey: 'role.logistics.title',
      descriptionKey: 'role.logistics.desc',
      icon: Map,
      path: '/login/logistics',
      color: 'from-cyan-500 to-blue-700',
      shadow: 'shadow-cyan-500/20',
    },
    {
      id: 'recycling',
      titleKey: 'role.recycling.title',
      descriptionKey: 'role.recycling.desc',
      icon: Recycle,
      path: '/login/recycling',
      color: 'from-emerald-500 to-green-700',
      shadow: 'shadow-emerald-500/20',
    },
    // Field / Operational Level
    {
      id: 'officer',
      titleKey: 'role.officer.title',
      descriptionKey: 'role.officer.desc',
      icon: Building2,
      path: '/login/officer',
      color: 'from-orange-500 to-red-700',
      shadow: 'shadow-orange-500/20',
    },
    {
      id: 'collector',
      titleKey: 'role.collector.title',
      descriptionKey: 'role.collector.desc',
      icon: Truck,
      path: '/login/collector',
      color: 'from-blue-500 to-indigo-700',
      shadow: 'shadow-blue-500/20',
    },
    // User Level
    {
      id: 'household',
      titleKey: 'role.household.title',
      descriptionKey: 'role.household.desc',
      icon: Home,
      path: '/login/household',
      color: 'from-green-500 to-emerald-700',
      shadow: 'shadow-green-500/20',
    },
    {
      id: 'third_party',
      titleKey: 'role.third_party.title',
      descriptionKey: 'role.third_party.desc',
      icon: Building2,
      path: '/login/third-party',
      color: 'from-purple-500 to-violet-700',
      shadow: 'shadow-purple-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex flex-col relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-[2px]"></div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6 flex justify-between items-center bg-background/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-emerald-900/20 animate-fade-in">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div className="animate-slide-up">
              <h1 className="font-display font-bold text-2xl text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{t('login.title')}</h1>
              <p className="text-sm text-muted-foreground font-medium">{t('login.subtitle')}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-full bg-background/60 backdrop-blur-sm border-border hover:bg-background/80">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'English' :
                    language === 'or' ? 'Odia' :
                      language === 'hi' ? 'Hindi' :
                        language === 'bn' ? 'Bengali' : 'Telugu'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('or')}>Odia (ଓଡ଼ିଆ)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('hi')}>Hindi (हिन्दी)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('bn')}>Bengali (বাংলা)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('te')}>Telugu (తెలుగు)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center p-6 my-8">
          <div className="w-full max-w-5xl">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                {t('login.welcome')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-500 to-secondary">{t('login.brand')}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('login.chooseRole')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allRoles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <Card
                    key={role.id}
                    className="group border-0 bg-card/60 backdrop-blur-md hover:bg-card/90 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden relative"
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
                          {t('login.button')}
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

            <div className="mt-12 text-center animate-fade-in delay-500">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white/20">
                  <span className="text-lg mr-2">New User? Register Here</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Demo credentials */}
            <div className="mt-16 p-8 bg-card/40 backdrop-blur-md rounded-2xl border border-white/10 animate-fade-in shadow-xl">
              <h3 className="font-semibold mb-6 text-center text-lg">{t('demo.title')}</h3>
              <div className="grid md:grid-cols-4 gap-6 text-sm">
                <div className="p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors">
                  <p className="font-bold text-green-600 mb-2 flex items-center gap-2">
                    <Home className="w-4 h-4" /> {t('role.household.title')}
                  </p>
                  <p className="text-muted-foreground">Ward: W01, Street: S01, House: H001</p>
                  <p className="text-muted-foreground font-mono mt-1 bg-muted/50 inline-block px-2 py-0.5 rounded">PIN: 1234</p>
                </div>
                <div className="p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors">
                  <p className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4" /> {t('role.collector.title')}
                  </p>
                  <p className="text-muted-foreground">ID: COL001</p>
                  <p className="text-muted-foreground font-mono mt-1 bg-muted/50 inline-block px-2 py-0.5 rounded">Pass: collector123</p>
                </div>
                <div className="p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors">
                  <p className="font-bold text-orange-600 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> {t('role.officer.title')}
                  </p>
                  <p className="text-muted-foreground">ID: OFF001</p>
                  <p className="text-muted-foreground font-mono mt-1 bg-muted/50 inline-block px-2 py-0.5 rounded">Pass: admin123</p>
                </div>
                <Link to="/login/third-party" className="block p-4 bg-background/60 rounded-xl border border-border/50 hover:bg-background/80 transition-colors cursor-pointer group">
                  <p className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> 3rd Party <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-muted-foreground">ID: PARTNER1</p>
                  <p className="text-muted-foreground font-mono mt-1 bg-muted/50 inline-block px-2 py-0.5 rounded">Any Password</p>
                </Link>
              </div>
            </div>
          </div>



        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-sm text-muted-foreground bg-background/50 backdrop-blur-sm border-t border-white/5">
          <div className="text-sm font-medium text-gray-900">Official Municipal Portal</div>
          <div className="text-xs text-muted-foreground">Authorized Personnel Only</div>
        </footer>
      </div>
      <SmartBinChatbot userRole="PUBLIC" />
    </div>
  );
}
