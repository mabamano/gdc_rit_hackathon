import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import QRGenerator from '@/components/qr/QRGenerator';
import { HouseholdUser } from '@/types';

export default function MyQRPage() {
    const { user } = useAuth();
    const household = user as HouseholdUser;

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-2xl mx-auto">
                <div>
                    <h1 className="text-2xl font-display font-bold">My QR Code</h1>
                    <p className="text-muted-foreground">Show this code to the waste collector for verification.</p>
                </div>

                <div className="mt-8 flex justify-center">
                    <QRGenerator
                        value={JSON.stringify({
                            type: 'household',
                            id: household?.id,
                            house: household?.houseNumber
                        })}
                        title={`House ${household?.houseNumber || ''}`}
                        description="Scan this to mark waste pickup."
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}
