import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockWardStats } from '@/data/mockData';

interface WardPerformanceChartProps {
  title?: string;
}

export function WardPerformanceChart({ title = "Ward-wise Performance" }: WardPerformanceChartProps) {
  const data = mockWardStats.map(ward => ({
    ward: ward.wardNumber,
    score: ward.segregationScore,
    compliance: Math.round((ward.householdsCompliant / ward.totalHouseholds) * 100),
  }));

  return (
    <Card variant="stat" className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="ward" 
                className="text-xs fill-muted-foreground"
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name === 'score' ? 'Segregation Score' : 'Compliance Rate'
                ]}
              />
              <Bar 
                dataKey="score" 
                name="Segregation Score"
                fill="hsl(207, 100%, 35%)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="compliance" 
                name="Compliance Rate"
                fill="hsl(142, 71%, 45%)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
