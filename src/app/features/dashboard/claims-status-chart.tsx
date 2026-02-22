import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card } from '../../../shared/components/ui/card';
import { mockClaimsStatusData } from '../../../mock/dashboard';

export function ClaimsStatusChart() {
  const total = mockClaimsStatusData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="flex h-full flex-col">
      <h2 className="mb-3 text-[14px] font-semibold text-text-primary">
        Claims Status Overview
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={mockClaimsStatusData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              dataKey="value"
              paddingAngle={2}
              stroke="none"
            >
              {mockClaimsStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '13px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {mockClaimsStatusData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[12px] text-text-secondary">
              {entry.name}
            </span>
            <span className="text-[12px] font-semibold text-text-primary">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
