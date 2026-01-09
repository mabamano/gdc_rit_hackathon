import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Building2, ArrowLeft, Leaf } from 'lucide-react';

export default function OfficerLogin() {
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loginOfficer } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await loginOfficer(officerId, password);

      if (success) {
        toast({
          title: "Welcome!",
          description: "Successfully logged in to the municipal dashboard.",
        });
        navigate('/officer');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid officer ID or password.",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background flex flex-col">
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Building2 className="w-8 h-8 text-secondary-foreground" />
            </div>
            <CardTitle className="text-2xl">Municipal Officer Login</CardTitle>
            <CardDescription>
              Access the administrative dashboard for waste management oversight
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="officerId">Officer ID</Label>
                <Input
                  id="officerId"
                  placeholder="e.g., OFF001"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value.toUpperCase())}
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
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Demo: ID: OFF001, Password: admin123
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>

      {/* Footer */}
      <footer className="p-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Leaf className="w-4 h-4 text-secondary" />
        Tamil Nadu Smart Waste 360 - Municipal Administration
      </footer>
    </div>
  );
}
