
import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QRGeneratorProps {
    value: string;
    title?: string;
    description?: string;
}

const QRGenerator = ({ value, title = "My QR Code", description }: QRGeneratorProps) => {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="text-center">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={value}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                {description && (
                    <p className="text-sm text-gray-500 text-center">{description}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default QRGenerator;
