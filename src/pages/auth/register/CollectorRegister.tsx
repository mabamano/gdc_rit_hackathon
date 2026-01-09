import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Truck, Loader2 } from 'lucide-react';

export default function CollectorRegister() {
    const [formData, setFormData] = useState({
        name: '',
        collectorId: '',
        phone: '',
        password: '',
        employeeId: '',
        assignedWard: 'W01' // Defaulting for now
    });
    const [isLoading, setIsLoading] = useState(false);
    const { registerCollector } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await registerCollector(formData);
            if (success) {
                toast({
                    title: "Registration Successful",
                    description: "Collector profile created.",
                });
                navigate('/collector');
            } else {
                toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: "Please check your details.",
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
                            <Truck className="h-6 w-6 text-blue-600" />
                            Collector Registration
                        </CardTitle>
                    </div>
                    <CardDescription>
                        Register as a municipal waste collector.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="Enter full name" required value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="employeeId">Employee ID</Label>
                            <Input id="employeeId" name="employeeId" placeholder="EMP12345" required value={formData.employeeId} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="collectorId">Collector ID (System)</Label>
                            <Input id="collectorId" name="collectorId" placeholder="COL001" required value={formData.collectorId} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" placeholder="9876543210" required value={formData.phone} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Register Collector
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
