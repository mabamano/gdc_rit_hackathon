
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NotificationList } from '@/components/dashboard/NotificationList';
import { mockNotifications } from '@/data/mockData';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NotificationsPage() {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">Notifications</h1>
                        <p className="text-muted-foreground">Stay updated with collection schedules and alerts</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <CheckCheck className="w-4 h-4" /> Mark all as read
                        </Button>
                        <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" /> Clear all
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <Card variant="stat">
                            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Bell className="w-5 h-5" /> Recent Alerts
                                </CardTitle>
                                <Badge variant="secondary">{unreadCount} Unread</Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <NotificationList notifications={mockNotifications} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card variant="stat">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Category Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Pickup Reminders</span>
                                    <div className="w-9 h-5 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Reward Updates</span>
                                    <div className="w-9 h-5 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">System Alerts</span>
                                    <div className="w-9 h-5 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
