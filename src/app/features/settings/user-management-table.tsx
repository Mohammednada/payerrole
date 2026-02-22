import { motion } from 'motion/react';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { cn } from '../../../shared/lib/utils';
import { Card } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { mockStaffMembers } from '../../../mock/settings';
import type { StaffMember } from '../../../mock/settings';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const ROLE_VARIANT: Record<StaffMember['role'], 'default' | 'success' | 'info' | 'warning' | 'teal'> = {
  Admin: 'default',
  Provider: 'success',
  Billing: 'info',
  'Front Desk': 'warning',
  Nurse: 'teal',
};

function formatLoginDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function UserManagementTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-text-primary">
            User Management
          </h2>
          <Button
            size="sm"
            icon={<UserPlus className="h-4 w-4" />}
          >
            Add User
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Last Login</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockStaffMembers.map((member, i) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className={cn(
                    'border-b border-border last:border-b-0',
                    'hover:bg-surface transition-colors duration-100',
                  )}
                >
                  <td className="py-3 pr-4 font-medium text-text-primary whitespace-nowrap">
                    {member.name}
                  </td>
                  <td className="py-3 pr-4 text-text-secondary whitespace-nowrap">
                    {member.email}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={ROLE_VARIANT[member.role]}>
                      {member.role}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary whitespace-nowrap">
                    {formatLoginDate(member.lastLogin)}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={member.status === 'active' ? 'success' : 'error'}>
                      {member.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Edit ${member.name}`}
                        icon={<Pencil className="h-3.5 w-3.5" />}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Delete ${member.name}`}
                        icon={<Trash2 className="h-3.5 w-3.5 text-error" />}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
