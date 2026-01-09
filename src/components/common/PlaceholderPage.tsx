import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PlaceholderPageProps {
    title: string;
    description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <Construction className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        {description || "This feature is currently under development. Please check back later for updates."}
                    </p>
                </div>
                <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </Button>
            </div>
        </DashboardLayout>
    );
}
