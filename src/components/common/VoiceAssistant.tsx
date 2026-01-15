import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, X, PlayCircle } from 'lucide-react';
import { Geminiservice } from '@/services/geminiService';
import { Card, CardContent } from '@/components/ui/card';

export function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [recognition, setRecognition] = useState<any>(null);

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    // Voice Initialization
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            console.log('Voices loaded:', availableVoices.length);
            setVoices(availableVoices);
        };

        if ('speechSynthesis' in window) {
            loadVoices();
            // Important: voices are loaded asynchronously in many browsers
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'ta-IN'; // Default to Tamil

            recognitionInstance.onresult = async (event: any) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                handleUserQuery(text);
            };

            recognitionInstance.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        }
    }, []);

    const handleUserQuery = async (text: string) => {
        setResponse('Yosikkiren...'); // "Thinking..." in Tamil

        try {
            const history: any[] = [];
            const userContext = { role: 'citizen' };
            const prompt = `(Answer in Tamil. Keep it short, under 2 sentences) ${text}`;

            const reply = await Geminiservice.sendMessage(prompt, history, userContext);
            setResponse(reply);
            speak(reply);
        } catch (error) {
            console.error('AI error:', error);
            setResponse('Sorry, I am facing an issue. Please try again.');
        }
    };

    const speak = (text: string) => {
        if (!('speechSynthesis' in window)) {
            console.error('Speech synthesis not supported');
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Use either stored voices or get fresh ones
        const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();

        // Precision selection for Tamil
        // Priority: 1. Tamil (India), 2. Any Tamil, 3. Any Female voice as backup
        const tamilVoice = currentVoices.find(v => v.lang === 'ta-IN') ||
            currentVoices.find(v => v.lang.startsWith('ta')) ||
            currentVoices.find(v => v.name.toLowerCase().includes('tamil'));

        if (tamilVoice) {
            console.log('Using Tamil voice:', tamilVoice.name);
            utterance.voice = tamilVoice;
            utterance.lang = tamilVoice.lang;
        } else {
            console.warn('Tamil voice not found, using default');
            utterance.lang = 'ta-IN'; // Still set lang hint
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => {
            console.log('Speech started');
            setIsSpeaking(true);
        };
        utterance.onend = () => {
            console.log('Speech ended');
            setIsSpeaking(false);
        };
        utterance.onerror = (e) => {
            console.error('Speech error:', e);
            setIsSpeaking(false);
        };

        // Small delay helps some browsers (like Chrome) process the cancel() before the next speak()
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 50);
    };

    const toggleListening = () => {
        if (!recognition) {
            alert("Voice recognition not supported in this browser.");
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            // Cancel any current speech when recording
            window.speechSynthesis.cancel();
            setIsSpeaking(false);

            setIsListening(true);
            setTranscript('');
            setResponse('');
            recognition.start();
        }
    };

    if (!isOpen) {
        return (
            <Button
                className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-xl z-50 bg-gradient-to-r from-blue-600 to-green-500 hover:scale-110 transition-transform"
                onClick={() => setIsOpen(true)}
            >
                <Mic className="w-6 h-6 text-white" />
            </Button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in">
            <Card className="w-80 shadow-2xl glass-card border-t-4 border-t-primary mb-2">
                <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="font-semibold text-primary flex items-center gap-2">
                            <Volume2 className="w-4 h-4" /> Thooymai TN Assistant
                        </h3>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg min-h-[60px] text-sm">
                        {transcript ? (
                            <p className="text-foreground">You: "{transcript}"</p>
                        ) : (
                            <p className="text-muted-foreground italic">Tap mic and speak in Tamil...</p>
                        )}
                    </div>

                    {response && (
                        <div className={`bg-primary/10 p-3 rounded-lg text-sm border border-primary/20 relative group transition-all ${isSpeaking ? 'ring-2 ring-primary/30' : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-primary font-bold">Assistant:</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 -mr-1 -mt-1 hover:bg-primary/20 text-primary"
                                    onClick={() => speak(response)}
                                    title="Listen again"
                                >
                                    <Volume2 className={`h-4 w-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                                </Button>
                            </div>
                            <p className="leading-relaxed">{response}</p>
                        </div>
                    )}

                    <div className="flex justify-center pt-2">
                        <Button
                            size="lg"
                            variant={isListening ? "destructive" : "default"}
                            className={`rounded-full w-16 h-16 shadow-lg ${isListening ? 'animate-pulse' : ''}`}
                            onClick={toggleListening}
                        >
                            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                        </Button>
                    </div>
                    <div className="text-center text-xs text-muted-foreground">
                        {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready"}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
