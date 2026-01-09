import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WasteLog, WasteType } from '@/types';
import { cn } from '@/lib/utils';

interface WasteHistoryTableProps {
  logs: WasteLog[];
  maxItems?: number;
}

export function WasteHistoryTable({ logs, maxItems = 10 }: WasteHistoryTableProps) {
  const displayLogs = logs.slice(0, maxItems);

  const getWasteTypeBadge = (type: WasteType) => {
    const styles = {
      organic: 'bg-success/10 text-success border-success/20',
      recyclable: 'bg-primary/10 text-primary border-primary/20',
      hazardous: 'bg-destructive/10 text-destructive border-destructive/20',
    };

    return (
      <Badge variant="outline" className={cn("capitalize", styles[type])}>
        {type}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card variant="stat">
      <CardHeader>
        <CardTitle className="text-lg">Recent Waste Deposits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Fill Level</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">
                    {formatDate(log.timestamp)}
                  </TableCell>
                  <TableCell>{getWasteTypeBadge(log.wasteType)}</TableCell>
                  <TableCell>{log.weight.toFixed(2)} kg</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            log.fillLevel >= 80 ? "bg-destructive" :
                            log.fillLevel >= 50 ? "bg-warning" : "bg-success"
                          )}
                          style={{ width: `${log.fillLevel}%` }}
                        />
                      </div>
                      <span className="text-sm">{log.fillLevel}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-medium",
                      log.mlConfidence >= 90 ? "text-success" :
                      log.mlConfidence >= 80 ? "text-primary" : "text-warning"
                    )}>
                      {log.mlConfidence}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
