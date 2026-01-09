
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';

export default function AttendancePage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState<string | null>(null);

    const handleCheckIn = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setCheckInTime(timeString);
        setCheckedIn(true);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold">Attendance</h1>
                    <p className="text-muted-foreground">Track your daily logins and working hours.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mark Attendance</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-6 py-4">
                            <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center relative">
                                <Clock className={`w-16 h-16 text-primary ${!checkedIn ? 'animate-pulse-slow' : ''}`} />
                                {checkedIn && (
                                    <div className="absolute -right-2 -top-2 bg-green-500 text-white p-2 rounded-full border-4 border-background animate-fade-in">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <h3 className="text-2xl font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                                <p className="text-muted-foreground">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            <Button
                                size="lg"
                                className={`w-full max-w-xs transition-all ${checkedIn ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                onClick={handleCheckIn}
                                disabled={checkedIn}
                            >
                                {checkedIn ? 'Checked In' : 'Check In Now'}
                            </Button>

                            {checkedIn && (
                                <p className="text-xs text-muted-foreground animate-slide-up">
                                    Checked in successfully at {checkInTime}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="flex items-center justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border shadow-sm"
                            modifiers={{
                                present: [new Date(2025, 11, 1), new Date(2025, 11, 2), new Date(2025, 11, 3), new Date(2025, 11, 4), new Date(2025, 11, 5)],
                                absent: [new Date(2025, 11, 8)]
                            }}
                            modifiersStyles={{
                                present: { color: 'green', fontWeight: 'bold' },
                                absent: { color: 'red', fontWeight: 'bold' }
                            }}
                        />
                    </Card>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-muted-foreground text-sm">Present Days</p>
                            <p className="text-2xl font-bold text-green-600">24</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-muted-foreground text-sm">Late Logins</p>
                            <p className="text-2xl font-bold text-orange-500">2</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-muted-foreground text-sm">Absent</p>
                            <p className="text-2xl font-bold text-red-500">1</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-muted-foreground text-sm">Total Hours</p>
                            <p className="text-2xl font-bold">192h</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
