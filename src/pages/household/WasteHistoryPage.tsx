import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockWasteLogs } from '@/data/mockData';
import { WasteLog, WasteType } from '@/types';
import { cn } from '@/lib/utils';
import { Search, Download, Filter, Calendar, X } from 'lucide-react';
import { toast } from 'sonner';

export default function WasteHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [wasteTypeFilter, setWasteTypeFilter] = useState<WasteType | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | '7days' | '30days' | '90days'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Extended mock data for demonstration
  const extendedLogs: WasteLog[] = useMemo(() => {
    const logs: WasteLog[] = [];
    const types: WasteType[] = ['organic', 'recyclable', 'hazardous'];
    
    for (let i = 0; i < 50; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      logs.push({
        id: `wl${i + 100}`,
        houseId: 'h1',
        wasteType: types[Math.floor(Math.random() * 3)],
        weight: Math.round((Math.random() * 5 + 0.5) * 100) / 100,
        timestamp: date,
        fillLevel: Math.floor(Math.random() * 100),
        mlConfidence: Math.floor(Math.random() * 15 + 85),
      });
    }
    return [...mockWasteLogs, ...logs];
  }, []);

  // Filtered and sorted logs
  const filteredLogs = useMemo(() => {
    let result = [...extendedLogs];

    // Filter by waste type
    if (wasteTypeFilter !== 'all') {
      result = result.filter(log => log.wasteType === wasteTypeFilter);
    }

    // Filter by date range
    if (dateFilter !== 'all') {
      const now = new Date();
      const daysMap = { '7days': 7, '30days': 30, '90days': 90 };
      const cutoffDate = new Date(now.setDate(now.getDate() - daysMap[dateFilter]));
      result = result.filter(log => new Date(log.timestamp) >= cutoffDate);
    }

    // Search by ID or weight
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(log => 
        log.id.toLowerCase().includes(term) ||
        log.weight.toString().includes(term) ||
        log.wasteType.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [extendedLogs, wasteTypeFilter, dateFilter, searchTerm, sortOrder]);

  const clearFilters = () => {
    setSearchTerm('');
    setWasteTypeFilter('all');
    setDateFilter('all');
    setSortOrder('newest');
  };

  const hasActiveFilters = wasteTypeFilter !== 'all' || dateFilter !== 'all' || searchTerm !== '';

  const exportToCSV = () => {
    const headers = ['ID', 'Date & Time', 'Waste Type', 'Weight (kg)', 'Fill Level (%)', 'ML Confidence (%)'];
    const rows = filteredLogs.map(log => [
      log.id,
      formatDate(log.timestamp),
      log.wasteType,
      log.weight.toFixed(2),
      log.fillLevel.toString(),
      log.mlConfidence.toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `waste_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast.success('Export successful', {
      description: `${filteredLogs.length} records exported to CSV`
    });
  };

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
    }).format(new Date(date));
  };

  // Stats summary
  const stats = useMemo(() => {
    const total = filteredLogs.reduce((acc, log) => acc + log.weight, 0);
    const organic = filteredLogs.filter(l => l.wasteType === 'organic').reduce((acc, l) => acc + l.weight, 0);
    const recyclable = filteredLogs.filter(l => l.wasteType === 'recyclable').reduce((acc, l) => acc + l.weight, 0);
    const hazardous = filteredLogs.filter(l => l.wasteType === 'hazardous').reduce((acc, l) => acc + l.weight, 0);
    
    return { total, organic, recyclable, hazardous };
  }, [filteredLogs]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">Waste History</h1>
            <p className="text-muted-foreground">View and export your complete waste disposal records</p>
          </div>
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="stat">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Total Weight</p>
              <p className="text-2xl font-bold">{stats.total.toFixed(1)} kg</p>
            </CardContent>
          </Card>
          <Card variant="stat" className="border-l-4 border-l-success">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Organic</p>
              <p className="text-2xl font-bold text-success">{stats.organic.toFixed(1)} kg</p>
            </CardContent>
          </Card>
          <Card variant="stat" className="border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Recyclable</p>
              <p className="text-2xl font-bold text-primary">{stats.recyclable.toFixed(1)} kg</p>
            </CardContent>
          </Card>
          <Card variant="stat" className="border-l-4 border-l-destructive">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">Hazardous</p>
              <p className="text-2xl font-bold text-destructive">{stats.hazardous.toFixed(1)} kg</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card variant="stat">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                  <X className="w-4 h-4" />
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Waste Type Filter */}
              <Select value={wasteTypeFilter} onValueChange={(v) => setWasteTypeFilter(v as WasteType | 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="Waste Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="recyclable">Recyclable</SelectItem>
                  <SelectItem value="hazardous">Hazardous</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range Filter */}
              <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as typeof dateFilter)}>
                <SelectTrigger>
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as typeof sortOrder)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card variant="stat">
          <CardHeader>
            <CardTitle className="text-lg">
              Records ({filteredLogs.length})
            </CardTitle>
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
                    <TableHead>ML Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No records found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.slice(0, 20).map((log) => (
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
                    ))
                  )}
                </TableBody>
              </Table>
              {filteredLogs.length > 20 && (
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Showing 20 of {filteredLogs.length} records. Export to view all.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
