import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WastePieChartProps {
  title?: string;
  organic?: number;
  recyclable?: number;
  hazardous?: number;
}

export function WastePieChart({ 
  title = "Waste Distribution",
  organic = 55,
  recyclable = 35,
  hazardous = 10
}: WastePieChartProps) {
  const data = [
    { name: 'Organic', value: organic, color: 'hsl(142, 71%, 45%)' },
    { name: 'Recyclable', value: recyclable, color: 'hsl(207, 100%, 50%)' },
    { name: 'Hazardous', value: hazardous, color: 'hsl(0, 72%, 51%)' },
  ];

  return (
    <Card variant="stat" className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value}%`, '']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
