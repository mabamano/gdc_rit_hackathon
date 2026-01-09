import { DashboardLayout } from '@/components/layout/DashboardLayout';
import QRScanner from '@/components/qr/QRScanner';
import { toast } from 'sonner';

export default function QRScanPage() {
    const handleScan = (data: string) => {
        try {
            const parsed = JSON.parse(data);
            toast.success("Scan Verified", {
                description: `Confirmed pickup for House ${parsed.house || 'Unknown'}`
            });
        } catch (e) {
            toast.info("Scanned Data", {
                description: `Raw: ${data}`
            });
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-2xl mx-auto">
                <div>
                    <h1 className="text-2xl font-display font-bold">Scan QR Code</h1>
                    <p className="text-muted-foreground">Point your camera at a household QR code.</p>
                </div>

                <div className="mt-8">
                    <QRScanner onScanSuccess={handleScan} />
                </div>
            </div>
        </DashboardLayout>
    );
}
