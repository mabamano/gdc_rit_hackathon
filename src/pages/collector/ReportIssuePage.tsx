import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Camera, Send, Loader2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Geminiservice } from '@/services/geminiService';

export default function ReportIssuePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [issueType, setIssueType] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsAnalyzing(true);
        toast.info("AI Analyzing image...", { duration: 2000 });

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                // Remove data URL prefix (e.g. "data:image/jpeg;base64,")
                const base64Data = base64String.split(',')[1];
                const mimeType = file.type;

                const analysis = await Geminiservice.analyzeImage(base64Data, mimeType);

                if (analysis) {
                    if (analysis.issueType) setIssueType(analysis.issueType.toLowerCase());
                    if (analysis.description) setDescription(analysis.description);
                    if (analysis.urgency) setUrgency(analysis.urgency);

                    toast.success("AI Analysis Complete", {
                        description: `Detected: ${analysis.issueType} (${analysis.urgency} Urgency)`
                    });
                } else {
                    toast.error("Could not analyze image. Please fill details manually.");
                }
                setIsAnalyzing(false);
            };
        } catch (error) {
            console.error("Error analyzing image", error);
            toast.error("Error analyzing image");
            setIsAnalyzing(false);
        }
    };

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
        setUrgency(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
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
                            <Label>Evidence Photo (AI Powered)</Label>
                            <div
                                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors group relative"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {isAnalyzing ? (
                                    <div className="flex flex-col items-center animate-pulse">
                                        <Loader2 className="w-8 h-8 mb-2 animate-spin text-primary" />
                                        <span className="text-sm text-primary font-medium">Gemini AI is analyzing waste...</span>
                                    </div>
                                ) : (
                                    <>
                                        <Camera className="w-8 h-8 mb-2 group-hover:text-primary transition-colors" />
                                        <span className="text-sm">Click to upload photo for Auto-Analysis</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Issue Type <span className="text-destructive">*</span></Label>
                                {urgency && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgency === 'High' ? 'bg-red-100 text-red-800' :
                                            urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                        }`}>
                                        Detected Urgency: {urgency}
                                    </span>
                                )}
                            </div>
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
                            <div className="flex justify-between">
                                <Label>Description <span className="text-destructive">*</span></Label>
                                {description && <Sparkles className="w-4 h-4 text-primary" />}
                            </div>
                            <Textarea
                                placeholder="Describe the severity and situation..."
                                className="min-h-[100px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <Button
                            className="w-full gap-2"
                            size="lg"
                            onClick={handleSubmit}
                            disabled={isSubmitting || isAnalyzing}
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
