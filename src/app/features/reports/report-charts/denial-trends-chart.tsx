import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../../../../shared/components/ui/card';
import { mockDenialTrendsData } from '../../../../mock/reports';

export function DenialTrendsChart() {
  return (
    <Card className="flex flex-col">
      <h2 className="mb-1 text-[14px] font-semibold text-text-primary">
        Denial Trends
      </h2>
      <p className="mb-4 text-[13px] text-text-secondary">
        Monthly denial volume over time
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={mockDenialTrendsData}
          margin={{ top: 4, right: 12, bottom: 0, left: -12 }}
        >
          <defs>
            <linearGradient id="denialGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4183D" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#D4183D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={false}
            label={{
              value: 'Denials',
              angle: -90,
              position: 'insideLeft',
              offset: 20,
              style: { fontSize: 12, fill: '#6b7280' },
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value} denials`, 'Denials']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Denials"
            stroke="#D4183D"
            strokeWidth={2}
            fill="url(#denialGradient)"
            dot={{ r: 4, fill: '#D4183D' }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
