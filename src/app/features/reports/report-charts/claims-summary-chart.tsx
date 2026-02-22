import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '../../../../shared/components/ui/card';
import { mockClaimsSummaryData } from '../../../../mock/reports';

const STACK_COLORS = {
  paid: '#2E8540',
  denied: '#D4183D',
  pending: '#FF612B',
} as const;

export function ClaimsSummaryChart() {
  return (
    <Card className="flex flex-col">
      <h2 className="mb-1 text-[14px] font-semibold text-text-primary">
        Claims Summary
      </h2>
      <p className="mb-4 text-[13px] text-text-secondary">
        Monthly claims breakdown by status
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={mockClaimsSummaryData}
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
              value: 'Count',
              angle: -90,
              position: 'insideLeft',
              offset: 20,
              style: { fontSize: 12, fill: '#6b7280' },
            }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '8px' }}
          />
          <Bar
            dataKey="paid"
            name="Paid"
            stackId="claims"
            fill={STACK_COLORS.paid}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="denied"
            name="Denied"
            stackId="claims"
            fill={STACK_COLORS.denied}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="pending"
            name="Pending"
            stackId="claims"
            fill={STACK_COLORS.pending}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
