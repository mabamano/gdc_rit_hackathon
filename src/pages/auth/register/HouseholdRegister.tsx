import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Home, Loader2 } from 'lucide-react';

export default function HouseholdRegister() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        wardNumber: '',
        streetNumber: '',
        houseNumber: '',
        pin: '',
        aadharNumber: '',
        ebNumber: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { registerHousehold } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await registerHousehold(formData);
            if (success) {
                toast({
                    title: "Registration Successful",
                    description: "Welcome to the Smart Waste Management System!",
                });
                navigate('/household');
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
                            <Home className="h-6 w-6 text-green-600" />
                            Household Registration
                        </CardTitle>
                    </div>
                    <CardDescription>
                        Enter your household details to register for smart waste collection.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="wardNumber">Ward Number</Label>
                                <Input id="wardNumber" name="wardNumber" placeholder="W01" required value={formData.wardNumber} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="streetNumber">Street Number</Label>
                                <Input id="streetNumber" name="streetNumber" placeholder="S01" required value={formData.streetNumber} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="houseNumber">House Number</Label>
                                <Input id="houseNumber" name="houseNumber" placeholder="H001" required value={formData.houseNumber} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pin">Secure PIN</Label>
                                <Input id="pin" name="pin" type="password" placeholder="****" required value={formData.pin} onChange={handleChange} maxLength={4} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Head of Household Name</Label>
                            <Input id="name" name="name" placeholder="Enter full name" required value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" placeholder="9876543210" required value={formData.phone} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="aadharNumber">Aadhar Number</Label>
                            <Input id="aadharNumber" name="aadharNumber" placeholder="1234 5678 9012" required value={formData.aadharNumber} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ebNumber">Electricity Bill (EB) Number</Label>
                            <Input id="ebNumber" name="ebNumber" placeholder="Consumer Number" required value={formData.ebNumber} onChange={handleChange} />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Register Household
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
