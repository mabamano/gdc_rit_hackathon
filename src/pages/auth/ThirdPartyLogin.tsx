import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ThirdPartyLogin() {
    const [partnerId, setPartnerId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { loginThirdParty } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const success = await loginThirdParty(partnerId, password);

            if (success) {
                toast({
                    title: "Login Successful",
                    description: "Welcome to the Partner Portal",
                });
                navigate('/third-party');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            toast({
                title: "Login Failed",
                description: "Please check your Partner ID and password",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/login')} className="-ml-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <CardTitle>Partner Login</CardTitle>
                    </div>
                    <CardDescription>
                        Access for authorized 3rd party waste collection entities
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="partnerId">Partner ID</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="partnerId"
                                    placeholder="Enter your Partner ID"
                                    className="pl-9"
                                    value={partnerId}
                                    onChange={(e) => setPartnerId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Authenticating..." : "Login to Portal"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
