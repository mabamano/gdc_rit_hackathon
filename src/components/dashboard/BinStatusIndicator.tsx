import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface BinStatusIndicatorProps {
  fillLevel: number;
  lastUpdated?: Date;
  className?: string;
}

export function BinStatusIndicator({ fillLevel, lastUpdated, className }: BinStatusIndicatorProps) {
  const getStatusColor = () => {
    if (fillLevel >= 90) return 'bg-destructive';
    if (fillLevel >= 70) return 'bg-warning';
    if (fillLevel >= 40) return 'bg-primary';
    return 'bg-success';
  };

  const getStatusText = () => {
    if (fillLevel >= 90) return 'Overflow';
    if (fillLevel >= 70) return 'Almost Full';
    if (fillLevel >= 40) return 'Partial';
    return 'Low';
  };

  return (
    <Card variant="stat" className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Bin Fill Level</h3>
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          fillLevel >= 90 ? "bg-destructive/10 text-destructive" :
          fillLevel >= 70 ? "bg-warning/10 text-warning" :
          fillLevel >= 40 ? "bg-primary/10 text-primary" :
          "bg-success/10 text-success"
        )}>
          {getStatusText()}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-28 border-2 border-muted rounded-lg overflow-hidden">
          {/* Bin outline */}
          <div className="absolute inset-0 flex items-end">
            <div 
              className={cn("w-full transition-all duration-500", getStatusColor())}
              style={{ height: `${fillLevel}%` }}
            />
          </div>
          {/* Bin icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-4xl font-bold font-display">{fillLevel}%</p>
          <p className="text-sm text-muted-foreground mt-1">Fill Level</p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-2">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
