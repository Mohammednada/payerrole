import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Card } from '../../../../shared/components/ui/card';
import { mockApprovalRateData } from '../../../../mock/reports';

export function ApprovalRateChart() {
  return (
    <Card className="flex flex-col">
      <h2 className="mb-1 text-[14px] font-semibold text-text-primary">
        Approval Rate Trend
      </h2>
      <p className="mb-4 text-[13px] text-text-secondary">
        Monthly PA approval rate vs. 85% organizational target
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={mockApprovalRateData}
          margin={{ top: 4, right: 12, bottom: 0, left: -12 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={false}
            tickFormatter={(value: number) => `${value}%`}
            label={{
              value: 'Approval %',
              angle: -90,
              position: 'insideLeft',
              offset: 20,
              style: { fontSize: 12, fill: '#6b7280' },
            }}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Approval Rate']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '8px' }}
          />
          <ReferenceLine
            y={85}
            stroke="#9ca3af"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{
              value: '85% Target',
              position: 'right',
              style: { fontSize: 11, fill: '#9ca3af' },
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            name="Approval Rate"
            stroke="#2E8540"
            strokeWidth={2}
            dot={{ r: 4, fill: '#2E8540' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
