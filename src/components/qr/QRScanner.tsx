
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface QRScannerProps {
    onScanSuccess: (decodedText: string) => void;
    title?: string;
}

const QRScanner = ({ onScanSuccess, title = "Scan QR Code" }: QRScannerProps) => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);

    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        // Initialize scanner
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
            },
      /* verbose= */ false
        );

        scannerRef.current = scanner;

        scanner.render(
            (decodedText) => {
                // Success callback
                setScanResult(decodedText);
                onScanSuccess(decodedText);
                scanner.clear(); // Stop scanning after success
            },
            (errorMessage) => {
                // Error callback (called frequently while scanning)
                console.log(errorMessage);
                // Don't set error state here as it floods the UI, just log it
            }
        );

        return () => {
            // Cleanup
            if (scannerRef.current) {
                try {
                    scannerRef.current.clear();
                } catch (e) {
                    console.error("Failed to clear scanner", e);
                }
            }
        };
    }, [onScanSuccess]);

    const handleReset = () => {
        setScanResult(null);
        setError(null);
        window.location.reload(); // Hard reset for now to re-init scanner cleanly if needed
    };

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="text-center">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                {!scanResult ? (
                    <div id="reader" className="w-full h-[350px] overflow-hidden rounded-lg bg-black"></div>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-8 animate-in fade-in zoom-in duration-300">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-lg">Scan Successful!</h3>
                            <p className="text-muted-foreground text-sm break-all mt-1">{scanResult}</p>
                        </div>
                        <Button onClick={handleReset} variant="outline" className="mt-2">
                            Scan Another
                        </Button>
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md w-full">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default QRScanner;
