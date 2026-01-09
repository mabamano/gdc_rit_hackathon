import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Home, ArrowLeft, Leaf } from 'lucide-react';
import { SmartBinChatbot } from '@/components/SmartBinChatbot';

export default function HouseholdLogin() {
  const [wardNumber, setWardNumber] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loginHousehold } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await loginHousehold(wardNumber, streetNumber, houseNumber, pin);

      if (success) {
        toast({
          title: "Welcome!",
          description: "Successfully logged in to your household dashboard.",
        });
        navigate('/household');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please check your details and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-background flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to role selection
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Card variant="glass" className="w-full max-w-md animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Home className="w-8 h-8 text-success-foreground" />
            </div>
            <CardTitle className="text-2xl">Household Login</CardTitle>
            <CardDescription>
              Enter your ward, street, and house details to access your dashboard
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ward">Ward Number</Label>
                  <Input
                    id="ward"
                    placeholder="e.g., W01"
                    value={wardNumber}
                    onChange={(e) => setWardNumber(e.target.value.toUpperCase())}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street">Street Number</Label>
                  <Input
                    id="street"
                    placeholder="e.g., S01"
                    value={streetNumber}
                    onChange={(e) => setStreetNumber(e.target.value.toUpperCase())}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="house">House Number (Holding No.)</Label>
                <Input
                  id="house"
                  placeholder="e.g., H001"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin">4-Digit PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                variant="success"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Demo: W01, S01, H001, PIN: 1234
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>

      {/* Footer */}
      <footer className="p-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Leaf className="w-4 h-4 text-success" />
        Tamil Nadu Smart Waste 360
      </footer>
      <SmartBinChatbot userRole="PUBLIC" />
    </div>
  );
}
