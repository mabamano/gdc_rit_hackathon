import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function OdishaInteractiveMap() {
    return (
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-xl bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Map System Under Maintenance</p>
                <p className="text-xs text-muted-foreground mt-2">Please check back later.</p>
            </div>
        </div>
    );
}
