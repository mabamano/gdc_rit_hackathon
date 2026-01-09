import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Building2, Loader2 } from 'lucide-react';

export default function ThirdPartyRegister() {
    const [formData, setFormData] = useState({
        name: '',
        partnerId: '',
        email: '',
        password: '',
        gstNumber: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const { registerThirdParty } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await registerThirdParty(formData);
            if (success) {
                toast({
                    title: "Registration Successful",
                    description: "Partner entity registered successfully.",
                });
                navigate('/third-party');
            } else {
                toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: "Please check your details and try again.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <Card className="w-full max-w-lg border-2 shadow-xl">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/register')} className="h-8 w-8 -ml-2">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Building2 className="h-6 w-6 text-purple-600" />
                            Partner Registration
                        </CardTitle>
                    </div>
                    <CardDescription>
                        Register your private waste collection entity.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Entity Name</Label>
                            <Input id="name" name="name" placeholder="e.g. Clean City Solutions Pvt Ltd" required value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="partnerId">Partner ID (Preferred)</Label>
                            <Input id="partnerId" name="partnerId" placeholder="PARTNER_001" required value={formData.partnerId} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gstNumber">GST Number</Label>
                            <Input id="gstNumber" name="gstNumber" placeholder="GSTIN..." required value={formData.gstNumber} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Official Email</Label>
                            <Input id="email" name="email" type="email" placeholder="admin@company.com" required value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Register Entity
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
