import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Geminiservice } from '@/services/geminiService';
import { mockWardStats, mockViolations } from '@/data/mockData';

interface Message {
    role: 'user' | 'assistant';
    text: string;
}

export function OfficerAIAssistant() {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', text: 'Hello Officer. I can analyze ward performance, suggest routes, or identify high-risk areas. How can I assist you?' }
    ]);

    const handleAsk = async () => {
        if (!query.trim()) return;

        const userMsg: Message = { role: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setIsLoading(true);

        // Prepare context
        const contextData = {
            role: 'officer',
            wards: mockWardStats,
            recentViolations: mockViolations.slice(0, 5)
        };

        const responseText = await Geminiservice.sendMessage(
            query,
            messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text }] })),
            contextData
        );

        const aiMsg: Message = { role: 'assistant', text: responseText };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
    };

    return (
        <Card className="h-full border-t-4 border-t-purple-500 shadow-lg flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Sparkles className="w-5 h-5" />
                    AI Decision Assistant
                </CardTitle>
                <CardDescription>
                    Ask for insights, route optimizations, or waste prediction summaries.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                <div className="flex-1 bg-muted/30 rounded-lg p-4 h-[300px] overflow-y-auto space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${m.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-white border shadow-sm text-foreground'
                                }`}>
                                {m.role === 'assistant' && <Bot className="w-4 h-4 mb-1 text-purple-600" />}
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border shadow-sm rounded-lg p-3 flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                                <span className="text-xs text-muted-foreground">Analyzing operational data...</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <Input
                        placeholder="e.g. Which ward has the lowest segregation score?"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAsk()}
                        disabled={isLoading}
                    />
                    <Button onClick={handleAsk} disabled={isLoading || !query.trim()} className="bg-purple-600 hover:bg-purple-700">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                    {["Low segregation wards?", "Predict waste surge", "Route efficiency status"].map(q => (
                        <Button
                            key={q}
                            variant="outline"
                            size="sm"
                            className="text-xs whitespace-nowrap"
                            onClick={() => setQuery(q)}
                        >
                            {q}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
