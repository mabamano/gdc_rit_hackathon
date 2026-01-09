import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  const variants = {
    default: 'bg-card',
    primary: 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground',
    secondary: 'bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground',
    success: 'bg-gradient-to-br from-success to-success/80 text-success-foreground',
    warning: 'bg-gradient-to-br from-warning to-warning/80 text-warning-foreground',
    destructive: 'bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground',
  };

  const iconVariants = {
    default: 'bg-primary/10 text-primary',
    primary: 'bg-primary-foreground/20 text-primary-foreground',
    secondary: 'bg-secondary-foreground/20 text-secondary-foreground',
    success: 'bg-success-foreground/20 text-success-foreground',
    warning: 'bg-warning-foreground/20 text-warning-foreground',
    destructive: 'bg-destructive-foreground/20 text-destructive-foreground',
  };

  const subtitleVariants = {
    default: 'text-muted-foreground',
    primary: 'text-primary-foreground/70',
    secondary: 'text-secondary-foreground/70',
    success: 'text-success-foreground/70',
    warning: 'text-warning-foreground/70',
    destructive: 'text-destructive-foreground/70',
  };

  return (
    <Card 
      variant="stat" 
      className={cn(
        "p-6 animate-fade-in",
        variants[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            subtitleVariants[variant]
          )}>
            {title}
          </p>
          <p className="text-3xl font-bold font-display">
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              "text-sm",
              subtitleVariants[variant]
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={cn(
              "inline-flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className={subtitleVariants[variant]}>vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-xl",
            iconVariants[variant]
          )}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
