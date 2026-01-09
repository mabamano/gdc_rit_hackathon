import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collector } from '@/types';
import { mockCollectorRoutes } from '@/data/mockData';
import { Truck, MapPin, CheckCircle, Clock, AlertTriangle, Home, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CollectorDashboard() {
  const { user } = useAuth();
  const collector = user as Collector;

  const [completedPickups, setCompletedPickups] = useState<string[]>([]);

  const todayRoutes = mockCollectorRoutes.filter(r => r.collectorId === 'c1');
  const totalHouses = todayRoutes.reduce((acc, r) => acc + r.houseIds.length, 0);
  const completedCount = completedPickups.length;
  const togglePickup = (houseId: string) => {
    setCompletedPickups(prev =>
      prev.includes(houseId)
        ? prev.filter(id => id !== houseId)
        : [...prev, houseId]
    );
  };

  const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              Welcome, {collector?.name}
            </h1>
            <p className="text-muted-foreground">
              Collector ID: {collector?.collectorId} • Ward {collector?.assignedWard}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm py-1.5 px-3">
              <Clock className="w-4 h-4 mr-1" />
              {currentTime}
            </Badge>
            <Button variant="success">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Routes"
            value={todayRoutes.length}
            subtitle="Assigned streets"
            icon={Navigation}
            variant="primary"
          />
          <StatCard
            title="Total Pickups"
            value={totalHouses}
            subtitle="Houses to collect"
            icon={Home}
          />
          <StatCard
            title="Completed"
            value={completedCount}
            subtitle={`${Math.round((completedCount / totalHouses) * 100)}% done`}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Pending"
            value={totalHouses - completedCount}
            subtitle="Remaining pickups"
            icon={Truck}
            variant="warning"
          />
        </div>

        {/* Progress Bar */}
        <Card variant="stat">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Today's Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedCount} / {totalHouses} pickups
              </span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalHouses) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {todayRoutes.map((route) => (
            <Card key={route.id} variant="stat">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {route.ward} - Street {route.street}
                  </CardTitle>
                  <Badge>
                    {route.houseIds.filter(id => completedPickups.includes(`${route.ward}-${route.street}-${id}`)).length} / {route.houseIds.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {route.houseIds.map((houseId) => {
                    const fullId = `${route.ward}-${route.street}-${houseId}`;
                    const isCompleted = completedPickups.includes(fullId);

                    return (
                      <div
                        key={houseId}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border transition-all",
                          isCompleted ? "bg-success/10 border-success/30" : "bg-card hover:bg-accent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => togglePickup(fullId)}
                          />
                          <div>
                            <p className={cn("font-medium", isCompleted && "line-through text-muted-foreground")}>
                              House {houseId}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {route.ward}, {route.street}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isCompleted ? "ghost" : "outline"}
                          onClick={() => togglePickup(fullId)}
                        >
                          {isCompleted ? 'Completed' : 'Mark Pickup'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card variant="stat">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col">
                <AlertTriangle className="w-6 h-6 mb-2 text-warning" />
                <span>Report Overflow</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col">
                <MapPin className="w-6 h-6 mb-2 text-primary" />
                <span>View Full Route</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col">
                <Clock className="w-6 h-6 mb-2 text-muted-foreground" />
                <span>View Schedule</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col">
                <CheckCircle className="w-6 h-6 mb-2 text-success" />
                <span>End Day</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
