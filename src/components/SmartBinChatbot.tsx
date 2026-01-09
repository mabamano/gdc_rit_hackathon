import React, { useState, useRef, useEffect } from 'react';
import { Geminiservice, ChatMessage } from '../services/geminiService';
import { Button } from './ui/button'; // Assuming shadcn ui exists based on prompt
import { Input } from './ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard shadcn utils

interface SmartBinChatbotProps {
    userRole: 'ADMIN' | 'COLLECTOR' | 'HOUSEHOLD' | 'PUBLIC';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextData?: any; // Snapshot of relevant data (bins, routes, etc.)
    userUid?: string;
    assignedWard?: string;
    householdId?: string;
}

export const SmartBinChatbot: React.FC<SmartBinChatbotProps> = ({
    userRole,
    contextData,
    userUid,
    assignedWard,
    householdId
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: ChatMessage = { role: 'user', parts: [{ text: input }] };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Convert internal messages to format if needed, 
            // but service expects { role, parts: [{ text }] } which matches our state
            const responseText = await Geminiservice.sendMessage(
                input,
                messages, // Send history (excluding current simplified for now or include full)
                // The service puts system prompt first, then history, then new message.
                // We passed `messages` which is the history.
                {
                    role: userRole,
                    uid: userUid,
                    assignedWard,
                    householdId,
                    dataSnapshot: contextData
                }
            );

            const botMsg: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error", error);
            const errorMsg: ChatMessage = { role: 'model', parts: [{ text: "Sorry, something went wrong." }] };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 animate-bounce transition-all duration-300"
                >
                    <MessageCircle className="h-8 w-8 text-white" />
                </Button>
            )}

            {isOpen && (
                <Card className="w-[350px] md:w-[400px] h-[500px] shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-10 border-green-100">
                    <CardHeader className="bg-green-600 text-white rounded-t-lg py-3 px-4 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bot className="h-6 w-6" />
                            <div>
                                <CardTitle className="text-lg font-bold">
                                    {userRole === 'ADMIN' && 'Admin Assistant'}
                                    {userRole === 'COLLECTOR' && 'Route Assistant'}
                                    {userRole === 'HOUSEHOLD' && 'Home Assistant'}
                                    {userRole === 'PUBLIC' && 'Bin Assistant'}
                                </CardTitle>
                                <div className="text-xs text-green-100 opacity-90">
                                    Tamil Nadu Smart Waste 360
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-green-700 h-8 w-8 rounded-full"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-hidden p-0 bg-gray-50/50">
                        <ScrollArea className="h-full p-4">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-10 space-y-2">
                                    <Bot className="h-12 w-12 mx-auto text-green-200" />
                                    <p className="text-sm font-medium">Hello! How can I help with waste management today?</p>
                                    <p className="text-xs text-gray-400 max-w-[200px] mx-auto">
                                        Restricted to Tamil Nadu Smart Bin System queries.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex w-full mb-2",
                                            msg.role === 'user' ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                                                msg.role === 'user'
                                                    ? "bg-green-600 text-white rounded-br-none"
                                                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                                            )}
                                        >
                                            {/* Very basic markdown rendering or just text */}
                                            <div className="whitespace-pre-wrap leading-relaxed">
                                                {msg.parts[0].text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start w-full mb-2">
                                        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                                            <span className="text-xs text-gray-400">Thinking...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-3 bg-white border-t border-gray-100">
                        <div className="flex w-full items-center space-x-2">
                            <Input
                                placeholder="Ask about bins, routes..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="flex-1 focus-visible:ring-green-500 border-gray-200"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                size="icon"
                                className="bg-green-600 hover:bg-green-700 text-white shrink-0"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )
            }
        </div >
    );
};
