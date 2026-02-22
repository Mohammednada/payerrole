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
import { Card } from '../../../shared/components/ui/card';
import { mockPaVolumeData } from '../../../mock/dashboard';

const BAR_COLORS = {
  submitted: '#0066F5',
  approved: '#2E8540',
  denied: '#D4183D',
} as const;

export function PaVolumeChart() {
  return (
    <Card className="flex h-full flex-col">
      <h2 className="mb-3 text-[14px] font-semibold text-text-primary">
        PA Volume Trend
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={mockPaVolumeData}
            margin={{ top: 4, right: 8, bottom: 0, left: -12 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
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
              dataKey="submitted"
              name="Submitted"
              fill={BAR_COLORS.submitted}
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
            <Bar
              dataKey="approved"
              name="Approved"
              fill={BAR_COLORS.approved}
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
            <Bar
              dataKey="denied"
              name="Denied"
              fill={BAR_COLORS.denied}
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
