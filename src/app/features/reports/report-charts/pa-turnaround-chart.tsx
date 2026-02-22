import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '../../../../shared/components/ui/card';
import { mockPaTurnaroundData } from '../../../../mock/reports';

export function PaTurnaroundChart() {
  return (
    <Card className="flex flex-col">
      <h2 className="mb-1 text-[14px] font-semibold text-text-primary">
        PA Turnaround Time
      </h2>
      <p className="mb-4 text-[13px] text-text-secondary">
        Average days to decision vs. target (3-day SLA)
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={mockPaTurnaroundData}
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
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={false}
            label={{
              value: 'Days',
              angle: -90,
              position: 'insideLeft',
              offset: 20,
              style: { fontSize: 12, fill: '#6b7280' },
            }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} days`,
              name === 'average' ? 'Average' : 'Target',
            ]}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '8px' }}
            formatter={(value: string) =>
              value === 'average' ? 'Average' : 'Target'
            }
          />
          <Line
            type="monotone"
            dataKey="average"
            name="average"
            stroke="#0066F5"
            strokeWidth={2}
            dot={{ r: 4, fill: '#0066F5' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            name="target"
            stroke="#00BED5"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
