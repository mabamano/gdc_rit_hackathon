
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Camera, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ReportIssuePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [issueType, setIssueType] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        if (!issueType || !location || !description) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Report submitted successfully', {
            description: 'Incident ID: INC-' + Math.floor(Math.random() * 10000)
        });

        setIsSubmitting(false);
        setIssueType('');
        setLocation('');
        setDescription('');
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-2xl mx-auto">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold">Report an Issue</h1>
                    <p className="text-muted-foreground">Report bin overflows, damages, or hazardous waste spillage.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" /> Urgent Report Form
                        </CardTitle>
                        <CardDescription>
                            Please provide accurate details to ensure quick municipal response.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Issue Type <span className="text-destructive">*</span></Label>
                            <Select value={issueType} onValueChange={setIssueType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type of issue" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="overflow">Bin Overflow</SelectItem>
                                    <SelectItem value="damage">Bin Damaged/Vandalism</SelectItem>
                                    <SelectItem value="hazardous">Hazardous Waste Found</SelectItem>
                                    <SelectItem value="mixed">Improper Segregation (Bulk)</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Location / Bin ID <span className="text-destructive">*</span></Label>
                            <Input
                                placeholder="e.g. Bin #402, Market Square"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Description <span className="text-destructive">*</span></Label>
                            <Textarea
                                placeholder="Describe the severity and situation..."
                                className="min-h-[100px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Evidence Photo</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors group">
                                <Camera className="w-8 h-8 mb-2 group-hover:text-primary transition-colors" />
                                <span className="text-sm">Click to upload or take photo</span>
                                <input type="file" className="hidden" accept="image/*" />
                            </div>
                        </div>

                        <Button
                            className="w-full gap-2"
                            size="lg"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" /> Submit Report
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
