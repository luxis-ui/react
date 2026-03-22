import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import {
  ThemeProvider,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableCaption,
  TableEmptyState,
  TablePagination,
} from '@luxis-ui/react';
import type { SortDirection } from '@luxis-ui/react';
import React, { useState } from 'react';

// ─────────────────────────────────────────────
// Sample data
// ─────────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive' | 'pending';
  joined: string;
}

const USERS: User[] = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Engineer', department: 'Engineering', salary: 120000, status: 'active', joined: '2021-03-15' },
  { id: 2, name: 'Bob Martinez', email: 'bob@example.com', role: 'Designer', department: 'Design', salary: 95000, status: 'active', joined: '2020-07-01' },
  { id: 3, name: 'Carol Johnson', email: 'carol@example.com', role: 'Manager', department: 'Product', salary: 140000, status: 'inactive', joined: '2019-11-20' },
  { id: 4, name: 'David Kim', email: 'david@example.com', role: 'Analyst', department: 'Finance', salary: 88000, status: 'pending', joined: '2022-01-08' },
  { id: 5, name: 'Eva Patel', email: 'eva@example.com', role: 'Lead', department: 'Engineering', salary: 155000, status: 'active', joined: '2018-05-22' },
];

const STATUS_STYLE: Record<User['status'], React.CSSProperties> = {
  active: { background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 600 },
  inactive: { background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 600 },
  pending: { background: '#fffbeb', color: '#d97706', padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 600 },
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'striped', 'bordered', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Cell-padding density',
    },
    stickyHeader: { control: 'boolean', description: 'Stick header on scroll' },
    stickyFooter: { control: 'boolean', description: 'Stick footer on scroll' },
    stickyFirstColumn: { control: 'boolean', description: 'Sticky first column' },
    stickyLastColumn: { control: 'boolean', description: 'Sticky last column' },
    striped: { control: 'boolean', description: 'Zebra striping (independent of variant)' },
    hoverable: { control: 'boolean', description: 'Highlight rows on hover' },
    loading: { control: 'boolean', description: 'Loading / busy state' },
  },
  args: {
    variant: 'simple',
    size: 'md',
    stickyHeader: false,
    stickyFooter: false,
    stickyFirstColumn: false,
    stickyLastColumn: false,
    striped: false,
    hoverable: true,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─────────────────────────────────────────────
// 1. Default
// ─────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <ThemeProvider>
      <TableContainer>
        <Table {...args}>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell align="right" numeric>Salary</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USERS.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.department}</TableCell>
                <TableCell numeric>{fmt(u.salary)}</TableCell>
                <TableCell>
                  <span style={STATUS_STYLE[u.status]}>{u.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 2. Variants showcase
// ─────────────────────────────────────────────

const SimpleRows = () => (
  <>
    {USERS.slice(0, 3).map((u) => (
      <TableRow key={u.id}>
        <TableCell>{u.name}</TableCell>
        <TableCell>{u.role}</TableCell>
        <TableCell>{u.department}</TableCell>
        <TableCell numeric>{fmt(u.salary)}</TableCell>
      </TableRow>
    ))}
  </>
);

const SimpleHead = () => (
  <TableHead>
    <TableRow>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Role</TableHeaderCell>
      <TableHeaderCell>Department</TableHeaderCell>
      <TableHeaderCell align="right" numeric>Salary</TableHeaderCell>
    </TableRow>
  </TableHead>
);

export const Variants: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {(['simple', 'striped', 'bordered', 'ghost'] as const).map((variant) => (
          <div key={variant}>
            <p style={{ marginBottom: 8, fontWeight: 600, textTransform: 'capitalize', fontSize: 14 }}>
              variant="{variant}"
            </p>
            <TableContainer>
              <Table variant={variant}>
                <SimpleHead />
                <TableBody><SimpleRows /></TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 3. Sizes
// ─────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size}>
            <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>size="{size}"</p>
            <TableContainer>
              <Table size={size} variant="bordered">
                <SimpleHead />
                <TableBody><SimpleRows /></TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 4. Sortable headers
// ─────────────────────────────────────────────

const SortableHeadersDemo = () => {
  const [sortCol, setSortCol] = useState<keyof User | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('none');

  const handleSort = (col: keyof User) => (dir: SortDirection) => {
    setSortCol(col);
    setSortDir(dir);
  };

  const sorted = [...USERS].sort((a, b) => {
    if (!sortCol || sortDir === 'none') return 0;
    const cmp = compareValues(a[sortCol], b[sortCol]);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const colDir = (col: keyof User): SortDirection =>
    sortCol === col ? sortDir : 'none';

  return (
    <ThemeProvider>
      <TableContainer>
        <Table variant="simple" hoverable>
          <TableHead>
            <TableRow>
              <TableHeaderCell sortable sortDirection={colDir('name')} onSort={handleSort('name')}>Name</TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('role')} onSort={handleSort('role')}>Role</TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('department')} onSort={handleSort('department')}>Department</TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('salary')} onSort={handleSort('salary')} numeric align="right">Salary</TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('joined')} onSort={handleSort('joined')}>Joined</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.department}</TableCell>
                <TableCell numeric>{fmt(u.salary)}</TableCell>
                <TableCell>{u.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export const SortableHeaders: Story = {
  render: () => <SortableHeadersDemo />,
};

// ─────────────────────────────────────────────
// 5. Row selection
// ─────────────────────────────────────────────

const RowSelectionDemo = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleAll = () => {
    if (selected.size === USERS.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(USERS.map((u) => u.id)));
    }
  };

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected = selected.size === USERS.length;
  const someSelected = selected.size > 0 && !allSelected;

  return (
    <ThemeProvider>
      <p style={{ marginBottom: 8, fontSize: 13, color: '#6b7280' }}>
        {selected.size} of {USERS.length} row(s) selected
      </p>
      <TableContainer>
        <Table variant="simple" hoverable>
          <TableHead>
            <TableRow>
              <TableHeaderCell width={40}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                />
              </TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USERS.map((u) => (
              <TableRow
                key={u.id}
                selected={selected.has(u.id)}
                clickable
                onClick={() => toggle(u.id)}
              >
                <TableCell width={40}>
                  <input
                    type="checkbox"
                    checked={selected.has(u.id)}
                    onChange={() => toggle(u.id)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select ${u.name}`}
                  />
                </TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.department}</TableCell>
                <TableCell>
                  <span style={STATUS_STYLE[u.status]}>{u.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export const RowSelection: Story = {
  render: () => <RowSelectionDemo />,
};

// ─────────────────────────────────────────────
// 6. Sticky header + footer with scroll
// ─────────────────────────────────────────────

const MANY_USERS: User[] = Array.from({ length: 20 }, (_, i) => ({
  ...USERS[i % USERS.length],
  id: i + 1,
  name: `${USERS[i % USERS.length].name} #${i + 1}`,
}));

function compareValues(a: string | number, b: string | number): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export const StickyHeaderFooter: Story = {
  render: () => (
    <ThemeProvider>
      <TableContainer maxHeight={320} scrollX>
        <Table variant="simple" hoverable stickyHeader stickyFooter>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell align="right" numeric>Salary</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MANY_USERS.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.department}</TableCell>
                <TableCell numeric>{fmt(u.salary)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} style={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell numeric style={{ fontWeight: 700 }}>
                {fmt(MANY_USERS.reduce((s, u) => s + u.salary, 0))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 7. With caption
// ─────────────────────────────────────────────

export const WithCaption: Story = {
  render: () => (
    <ThemeProvider>
      <TableContainer>
        <Table variant="bordered">
          <TableCaption placement="top">Q1 2026 — Employee Directory</TableCaption>
          <SimpleHead />
          <TableBody><SimpleRows /></TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 8. Empty state
// ─────────────────────────────────────────────

export const EmptyState: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>type="empty"</p>
          <TableContainer>
            <Table variant="simple">
              <SimpleHead />
              <TableBody>
                <TableEmptyState colSpan={4} message="No records found" description="Try adjusting your search or filters." />
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>type="error"</p>
          <TableContainer>
            <Table variant="simple">
              <SimpleHead />
              <TableBody>
                <TableEmptyState colSpan={4} type="error" message="Failed to load data" description="Please try again or contact support." />
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <p style={{ marginBottom: 8, fontWeight: 600, fontSize: 14 }}>type="loading"</p>
          <TableContainer>
            <Table variant="simple">
              <SimpleHead />
              <TableBody>
                <TableEmptyState colSpan={4} type="loading" message="Loading data…" />
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 9. With pagination
// ─────────────────────────────────────────────

const ALL_USERS: User[] = Array.from({ length: 47 }, (_, i) => ({
  ...USERS[i % USERS.length],
  id: i + 1,
  name: `${USERS[i % USERS.length].name.split(' ')[0]} ${String.fromCodePoint(65 + (i % 26))}.`,
  salary: 80000 + (i * 1200),
}));

const WithPaginationDemo = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const slice = ALL_USERS.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <ThemeProvider>
      <TableContainer>
        <Table variant="simple" hoverable>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell align="right" numeric>Salary</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slice.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.department}</TableCell>
                <TableCell numeric>{fmt(u.salary)}</TableCell>
                <TableCell>
                  <span style={STATUS_STYLE[u.status]}>{u.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        totalRows={ALL_USERS.length}
        page={page}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 25]}
        onPageChange={(p) => { setPage(p); }}
        onPageSizeChange={(s) => { setPageSize(s); setPage(0); }}
      />
    </ThemeProvider>
  );
};

export const WithPagination: Story = {
  render: () => <WithPaginationDemo />,
};

// ─────────────────────────────────────────────
// 10. Expandable rows
// ─────────────────────────────────────────────

const ExpandableRowsDemo = () => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ThemeProvider>
      <TableContainer>
        <Table variant="simple" hoverable>
          <TableHead>
            <TableRow>
              <TableHeaderCell width={40} />
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell align="right" numeric>Salary</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USERS.map((u) => (
              <React.Fragment key={u.id}>
                <TableRow
                  clickable
                  expanded={expanded.has(u.id)}
                  onClick={() => toggle(u.id)}
                >
                  <TableCell width={40} style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.2s',
                        transform: expanded.has(u.id) ? 'rotate(90deg)' : 'none',
                      }}
                    >
                      ▶
                    </span>
                  </TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.department}</TableCell>
                  <TableCell numeric>{fmt(u.salary)}</TableCell>
                </TableRow>
                {expanded.has(u.id) && (
                  <TableRow>
                    <TableCell />
                    <TableCell colSpan={4}>
                      <div style={{ padding: '8px 0', fontSize: 13, color: '#6b7280', display: 'flex', gap: 24 }}>
                        <span><strong>Email:</strong> {u.email}</span>
                        <span><strong>Joined:</strong> {u.joined}</span>
                        <span><strong>Status:</strong> <span style={STATUS_STYLE[u.status]}>{u.status}</span></span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export const ExpandableRows: Story = {
  render: () => <ExpandableRowsDemo />,
};

// ─────────────────────────────────────────────
// 11. Disabled rows
// ─────────────────────────────────────────────

export const DisabledRows: Story = {
  render: () => (
    <ThemeProvider>
      <TableContainer>
        <Table variant="simple" hoverable>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USERS.map((u) => (
              <TableRow key={u.id} disabled={u.status === 'inactive'}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <span style={STATUS_STYLE[u.status]}>{u.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 12. Column width & truncation
// ─────────────────────────────────────────────

export const TruncatedColumns: Story = {
  render: () => (
    <ThemeProvider>
      <TableContainer>
        <Table variant="bordered" style={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeaderCell width={160}>Name</TableHeaderCell>
              <TableHeaderCell width={220}>Email</TableHeaderCell>
              <TableHeaderCell width={120}>Role</TableHeaderCell>
              <TableHeaderCell>Notes (truncated)</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {USERS.map((u) => (
              <TableRow key={u.id}>
                <TableCell truncate title={u.name}>{u.name}</TableCell>
                <TableCell truncate title={u.email}>{u.email}</TableCell>
                <TableCell truncate title={u.role}>{u.role}</TableCell>
                <TableCell truncate title="Long notes text">
                  This is a very long piece of notes text that will be truncated with an ellipsis because the column is too narrow.
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  ),
};

// ─────────────────────────────────────────────
// 13. Full featured (sort + select + paginate)
// ─────────────────────────────────────────────

const FullFeaturedDemo = () => {
  const PAGE_SIZE = 5;
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState<keyof User | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('none');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (col: keyof User) => (dir: SortDirection) => {
    setSortCol(col);
    setSortDir(dir);
    setPage(0);
  };

  const sortedAll = [...ALL_USERS].sort((a, b) => {
    if (!sortCol || sortDir === 'none') return 0;
    const cmp = compareValues(a[sortCol], b[sortCol]);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const slice = sortedAll.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const colDir = (col: keyof User): SortDirection =>
    sortCol === col ? sortDir : 'none';

  const toggleRow = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () => {
    const pageIds = new Set(slice.map((u) => u.id));
    const allPageSelected = slice.every((u) => selected.has(u.id));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const allPageSelected = slice.length > 0 && slice.every((u) => selected.has(u.id));
  const somePageSelected = slice.some((u) => selected.has(u.id)) && !allPageSelected;

  return (
    <ThemeProvider>
      <p style={{ marginBottom: 8, fontSize: 13, color: '#6b7280' }}>
        {selected.size} row(s) selected across all pages
      </p>
      <TableContainer>
        <Table variant="simple" hoverable stickyHeader>
          <TableHead>
            <TableRow>
              <TableHeaderCell width={40}>
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  ref={(el) => { if (el) el.indeterminate = somePageSelected; }}
                  onChange={toggleAll}
                  aria-label="Select page"
                />
              </TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('name')} onSort={handleSort('name')}>Name</TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('role')} onSort={handleSort('role')}>Role</TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('department')} onSort={handleSort('department')}>Department</TableHeaderCell>
              <TableHeaderCell sortable sortDirection={colDir('salary')} onSort={handleSort('salary')} numeric align="right">Salary</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slice.map((u) => (
              <TableRow key={u.id} selected={selected.has(u.id)} clickable onClick={() => toggleRow(u.id)}>
                <TableCell width={40}>
                  <input
                    type="checkbox"
                    checked={selected.has(u.id)}
                    onChange={() => toggleRow(u.id)}
                    aria-label={`Select ${u.name}`}
                  />
                </TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.department}</TableCell>
                <TableCell numeric>{fmt(u.salary)}</TableCell>
                <TableCell>
                  <span style={STATUS_STYLE[u.status]}>{u.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        totalRows={ALL_USERS.length}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        showPageSizeSelector={false}
      />
    </ThemeProvider>
  );
};

export const FullFeatured: Story = {
  render: () => <FullFeaturedDemo />,
};
