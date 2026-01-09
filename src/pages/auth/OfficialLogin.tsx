import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Building2, Landmark, Trash2, Truck, Recycle, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

type OfficialRoleType = 'state_admin' | 'municipal_admin' | 'sanitation' | 'logistics' | 'recycling';

interface OfficialLoginProps {
    roleType: OfficialRoleType;
}

export default function OfficialLogin({ roleType }: OfficialLoginProps) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { loginStateAdmin, loginMunicipalAdmin, loginDeptUser } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const config = {
        state_admin: {
            title: 'State Admin Login',
            desc: 'Chief Minister\'s Office Access',
            icon: Landmark,
            color: 'text-rose-600',
            bgColor: 'bg-rose-100',
            gradient: 'from-rose-500 to-red-700',
            loginFn: loginStateAdmin,
            redirect: '/state-admin',
            idLabel: 'Admin ID',
            placeholder: 'ODISHA01',
            demoId: 'ODISHA01',
            demoPass: 'admin'
        },
        municipal_admin: {
            title: 'Municipal Admin Login',
            desc: 'City Administration Access',
            icon: Building2,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100',
            gradient: 'from-indigo-500 to-blue-700',
            loginFn: loginMunicipalAdmin,
            redirect: '/municipal-admin',
            idLabel: 'Admin ID',
            placeholder: 'MUN001',
            demoId: 'MUN001',
            demoPass: 'admin'
        },
        sanitation: {
            title: 'Sanitation Dept Login',
            desc: 'Sanitation Operations Access',
            icon: Trash2,
            color: 'text-amber-600',
            bgColor: 'bg-amber-100',
            gradient: 'from-amber-500 to-orange-700',
            loginFn: loginDeptUser,
            redirect: '/dept/sanitation',
            idLabel: 'Employee ID',
            placeholder: 'SAN001',
            demoId: 'SAN001',
            demoPass: 'admin'
        },
        logistics: {
            title: 'Logistics Dept Login',
            desc: 'Fleet & Route Management Access',
            icon: Map,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-100',
            gradient: 'from-cyan-500 to-blue-700',
            loginFn: loginDeptUser,
            redirect: '/dept/logistics',
            idLabel: 'Employee ID',
            placeholder: 'LOG001',
            demoId: 'LOG001',
            demoPass: 'admin'
        },
        recycling: {
            title: 'Recycling Dept Login',
            desc: 'Recycling Center Access',
            icon: Recycle,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100',
            gradient: 'from-emerald-500 to-green-700',
            loginFn: loginDeptUser,
            redirect: '/dept/recycling',
            idLabel: 'Employee ID',
            placeholder: 'REC001',
            demoId: 'REC001',
            demoPass: 'admin'
        }
    };

    const currentConfig = config[roleType];
    const Icon = currentConfig.icon;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await currentConfig.loginFn(id, password);
            if (success) {
                toast({
                    title: "Login successful",
                    description: `Welcome back to ${currentConfig.title}`,
                });
                navigate(currentConfig.redirect);
            } else {
                toast({
                    variant: "destructive",
                    title: "Login failed",
                    description: "Invalid credentials. Please try again.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred during login.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl border-dashed border-2">
                <CardHeader className="space-y-4">
                    <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Role Selection
                    </Link>
                    <div className="flex justify-center">
                        <div className={`w-20 h-20 rounded-2xl ${currentConfig.bgColor} flex items-center justify-center shadow-inner`}>
                            <Icon className={`w-10 h-10 ${currentConfig.color}`} />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">{currentConfig.title}</CardTitle>
                        <CardDescription>{currentConfig.desc}</CardDescription>
                    </div>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="id">{currentConfig.idLabel}</Label>
                            <Input
                                id="id"
                                placeholder={currentConfig.placeholder}
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className={`w-full bg-gradient-to-r ${currentConfig.gradient} hover:opacity-90`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Login to Dashboard'
                            )}
                        </Button>

                        <div className="w-full p-3 bg-muted/50 rounded-lg border border-dashed text-xs text-muted-foreground">
                            <p className="font-semibold mb-1">Demo Credentials:</p>
                            <div className="flex justify-between items-center">
                                <span>ID: <code className="bg-background px-1 py-0.5 rounded border">{currentConfig.demoId}</code></span>
                                <span>Pass: <code className="bg-background px-1 py-0.5 rounded border">{currentConfig.demoPass}</code></span>
                            </div>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
