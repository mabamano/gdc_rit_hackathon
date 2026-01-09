import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { monthlyWasteData } from '@/data/mockData';

interface WasteChartProps {
  title?: string;
  data?: typeof monthlyWasteData;
}

export function WasteChart({ title = "Monthly Waste Trends", data = monthlyWasteData }: WasteChartProps) {
  return (
    <Card variant="stat" className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRecyclable" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(207, 100%, 50%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(207, 100%, 50%)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorHazardous" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}kg`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="organic"
                name="Organic"
                stroke="hsl(142, 71%, 45%)"
                fillOpacity={1}
                fill="url(#colorOrganic)"
              />
              <Area
                type="monotone"
                dataKey="recyclable"
                name="Recyclable"
                stroke="hsl(207, 100%, 50%)"
                fillOpacity={1}
                fill="url(#colorRecyclable)"
              />
              <Area
                type="monotone"
                dataKey="hazardous"
                name="Hazardous"
                stroke="hsl(0, 72%, 51%)"
                fillOpacity={1}
                fill="url(#colorHazardous)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
