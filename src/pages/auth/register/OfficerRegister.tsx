import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Building2, Loader2 } from 'lucide-react';

export default function OfficerRegister() {
    const [formData, setFormData] = useState({
        name: '',
        officerId: '',
        govtId: '',
        department: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const { registerOfficer } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await registerOfficer(formData);
            if (success) {
                toast({
                    title: "Registration Successful",
                    description: "Officer account created.",
                });
                navigate('/officer');
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
                            <Building2 className="h-6 w-6 text-orange-600" />
                            Officer Registration
                        </CardTitle>
                    </div>
                    <CardDescription>
                        Register for administrative access.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Officer Name</Label>
                            <Input id="name" name="name" placeholder="Dr. Name Surname" required value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="govtId">Government ID / Badge No.</Label>
                            <Input id="govtId" name="govtId" placeholder="GOVT-ID-XXXX" required value={formData.govtId} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input id="department" name="department" placeholder="Sanitation / Urban Development" required value={formData.department} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="officerId">System Officer ID</Label>
                            <Input id="officerId" name="officerId" placeholder="OFF00X" required value={formData.officerId} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Register Officer
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
