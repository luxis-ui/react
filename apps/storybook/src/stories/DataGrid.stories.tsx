import type { Meta, StoryObj } from '@storybook/react-vite';
import '@luxis-ui/react/theme/base.css';
import { DataGrid, ThemeProvider } from '@luxis-ui/react';
import type { ColDef, CellRenderParams, FilterModel, SortModel } from '@luxis-ui/react';
import { useState } from 'react';

// ─────────────────────────────────────────────
// Sample data factories
// ─────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  location: string;
  salary: number;
  status: 'active' | 'inactive' | 'onleave';
  startDate: string;
  performance: number;
}

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'HR'];
const ROLES = ['Manager', 'Senior Engineer', 'Engineer', 'Analyst', 'Designer', 'Lead', 'Director'];
const LOCATIONS = ['New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney'];
const STATUSES: Employee['status'][] = ['active', 'inactive', 'onleave'];
const NAMES = [
  'Alice Chen', 'Bob Martinez', 'Carol Johnson', 'David Kim', 'Eva Patel',
  'Frank Wilson', 'Grace Lee', 'Henry Brown', 'Irene Davis', 'Jack Taylor',
  'Karen White', 'Leo Anderson', 'Maria Thomas', 'Noah Harris', 'Olivia Clark',
  'Paul Lewis', 'Quinn Walker', 'Rachel Hall', 'Sam Young', 'Tina Allen',
  'Uma Scott', 'Victor King', 'Wendy Wright', 'Xavier Hill', 'Yara Green',
  'Zach Adams', 'Amy Baker', 'Brian Nelson', 'Clara Carter', 'Derek Mitchell',
];

function makeEmployees(count: number): Employee[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: NAMES[i % NAMES.length],
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    role: ROLES[i % ROLES.length],
    location: LOCATIONS[i % LOCATIONS.length],
    salary: 60000 + Math.floor((Math.random() * 120000)),
    status: STATUSES[i % STATUSES.length],
    startDate: new Date(2018 + (i % 6), i % 12, (i % 28) + 1).toLocaleDateString(),
    performance: Math.floor(60 + Math.random() * 40),
  }));
}

// ─────────────────────────────────────────────
// Shared column definitions
// ─────────────────────────────────────────────

const STATUS_COLORS: Record<Employee['status'], { bg: string; color: string }> = {
  active: { bg: '#f0fdf4', color: '#16a34a' },
  inactive: { bg: '#fef2f2', color: '#dc2626' },
  onleave: { bg: '#fffbeb', color: '#d97706' },
};

const employeeColumns: ColDef<Employee>[] = [
  {
    key: 'id',
    header: 'ID',
    width: 64,
    sortable: true,
    align: 'center',
  },
  {
    key: 'name',
    header: 'Name',
    width: 180,
    sortable: true,
    filterable: true,
    pinned: 'left',
    cellRenderer: ({ value }: CellRenderParams<Employee>) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: `hsl(${String(value).charCodeAt(0) * 7}, 65%, 55%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 11,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {String(value).charAt(0)}
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#171717', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
        </span>
      </div>
    ),
  },
  {
    key: 'department',
    header: 'Department',
    width: 140,
    sortable: true,
    filterable: true,
  },
  {
    key: 'role',
    header: 'Role',
    width: 160,
    sortable: true,
  },
  {
    key: 'location',
    header: 'Location',
    width: 140,
    sortable: true,
    filterable: true,
  },
  {
    key: 'salary',
    header: 'Salary',
    width: 120,
    sortable: true,
    align: 'right',
    type: 'number',
    aggregate: 'avg',
    cellRenderer: ({ value }: CellRenderParams<Employee>) => (
      <span style={{ fontSize: 13, fontWeight: 500, color: '#171717', fontVariantNumeric: 'tabular-nums' }}>
        ${Number(value).toLocaleString()}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    width: 110,
    sortable: true,
    filterable: true,
    align: 'center',
    cellRenderer: ({ value }: CellRenderParams<Employee>) => {
      const s = STATUS_COLORS[value as Employee['status']] ?? STATUS_COLORS.inactive;
      return (
        <span
          style={{
            display: 'inline-flex',
            padding: '2px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            background: s.bg,
            color: s.color,
            textTransform: 'capitalize',
          }}
        >
          {value}
        </span>
      );
    },
  },
  {
    key: 'startDate',
    header: 'Start Date',
    width: 120,
    sortable: true,
  },
  {
    key: 'performance',
    header: 'Performance',
    width: 140,
    sortable: true,
    align: 'center',
    aggregate: 'avg',
    cellRenderer: ({ value }: CellRenderParams<Employee>) => {
      const pct = Number(value);
      const color = pct >= 80 ? '#16a34a' : pct >= 60 ? '#d97706' : '#dc2626';
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
          <div style={{ flex: 1, height: 6, background: '#f5f5f5', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999, transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color, minWidth: 28, textAlign: 'right' }}>{pct}%</span>
        </div>
      );
    },
  },
];

// ─────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────

const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
  component: DataGrid,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '24px', background: '#fafafa', minHeight: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // Layout controls
    height: { control: 'number', description: 'Grid height in px' },
    density: {
      control: { type: 'select' },
      options: ['compact', 'standard', 'comfortable'],
      description: 'Row density',
    },
    rowHeight: { control: 'number', description: 'Custom row height in px (overrides density)' },
    // Feature toggles
    sorting: { control: 'boolean' },
    multiSort: { control: 'boolean' },
    filtering: { control: 'boolean' },
    showColumnFilters: { control: 'boolean', description: 'Show per-column filter inputs with operator select' },
    selection: {
      control: { type: 'select' },
      options: [false, 'single', 'multiple', 'checkbox'],
    },
    pagination: { control: 'boolean' },
    columnResize: { control: 'boolean' },
    rowExpansion: { control: 'boolean' },
    showAggregation: { control: 'boolean' },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    loading: { control: 'boolean' },
    virtualized: { control: 'boolean' },
    exportCsv: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    // Server-side
    serverSideSort: { control: 'boolean', description: 'Disable client-side sorting (fire onSortChange instead)' },
    serverSideFilter: { control: 'boolean', description: 'Disable client-side filtering (fire onFilterChange instead)' },
    // Hide complex / non-serializable props
    rows: { control: false },
    columns: { control: false },
    getRowId: { control: false },
    expandedRowContent: { control: false },
    emptyContent: { control: false },
    loadingContent: { control: false },
    toolbarContent: { control: false },
    onSortChange: { control: false },
    onFilterChange: { control: false },
    onSelectionChange: { control: false },
    onPageChange: { control: false },
    onPageSizeChange: { control: false },
    onRowExpand: { control: false },
    onRowClick: { control: false },
    onCellClick: { control: false },
    onEditCommit: { control: false },
    sortModel: { control: false },
    filterModel: { control: false },
    selectedRowIds: { control: false },
    expandedRowIds: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

// ─────────────────────────────────────────────
// Default — interactive via Controls panel
// ─────────────────────────────────────────────

const defaultRows = makeEmployees(50);

export const Default: Story = {
  args: {
    height: 520,
    sorting: true,
    filtering: true,
    selection: 'checkbox',
    pagination: true,
    columnResize: true,
    bordered: true,
    stickyHeader: true,
    virtualized: true,
    exportCsv: true,
    density: 'standard',
  },
  render: (args) => (
    <DataGrid<Employee>
      rows={defaultRows}
      columns={employeeColumns}
      getRowId={(row) => row.id}
      aria-label="Employee directory"
      {...args}
    />
  ),
};

// ─────────────────────────────────────────────
// Pinned Columns
// ─────────────────────────────────────────────

const pinnedColumns: ColDef<Employee>[] = [
  { key: 'id',         header: 'ID',         width: 64,  sortable: true, align: 'center', pinned: 'left' },
  { key: 'name',       header: 'Name',       width: 180, sortable: true, filterable: true, pinned: 'left',
    cellRenderer: ({ value }: CellRenderParams<Employee>) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: `hsl(${String(value).charCodeAt(0) * 7}, 65%, 55%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
          {String(value).charAt(0)}
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
      </div>
    ),
  },
  { key: 'department', header: 'Department', width: 140, sortable: true },
  { key: 'role',       header: 'Role',       width: 160, sortable: true },
  { key: 'location',   header: 'Location',   width: 140, sortable: true },
  { key: 'salary',     header: 'Salary',     width: 120, sortable: true, align: 'right' },
  { key: 'startDate',  header: 'Start Date', width: 120, sortable: true },
  { key: 'performance',header: 'Performance',width: 120, sortable: true },
  { key: 'status',     header: 'Status',     width: 110, sortable: true, pinned: 'right',
    cellRenderer: ({ value }: CellRenderParams<Employee>) => {
      const s = STATUS_COLORS[value as Employee['status']] ?? STATUS_COLORS.inactive;
      return <span style={{ display: 'inline-flex', padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, textTransform: 'capitalize' }}>{value}</span>;
    },
  },
];

export const PinnedColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
        <strong>Name</strong> and <strong>ID</strong> are pinned left · <strong>Status</strong> is pinned right.
        Scroll horizontally to see them stick.
      </p>
      <DataGrid<Employee>
        rows={makeEmployees(40)}
        columns={pinnedColumns}
        getRowId={(row) => row.id}
        selection="checkbox"
        height={520}
        aria-label="Grid with pinned columns"
      />
    </div>
  ),
};

// ─────────────────────────────────────────────
// Advanced Column Filters (operator selectors)
// ─────────────────────────────────────────────

export const AdvancedFilters: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
        Each column filter has an <strong>operator selector</strong>: Contains, Equals, Starts with, Ends with,
        &gt;, &gt;=, &lt;, &lt;=, Is empty, Not empty.
      </p>
      <DataGrid<Employee>
        rows={makeEmployees(100)}
        columns={employeeColumns}
        getRowId={(row) => row.id}
        filtering
        showColumnFilters
        height={520}
        aria-label="Grid with advanced column filters"
      />
    </div>
  ),
};

// ─────────────────────────────────────────────
// Custom Row Height
// ─────────────────────────────────────────────

export const CustomRowHeight: Story = {
  render: () => {
    const [rowHeight, setRowHeight] = useState(72);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontSize: 13, color: '#525252', fontWeight: 500 }}>
            Row height: <strong>{rowHeight}px</strong>
          </label>
          <input
            type="range"
            min={28}
            max={120}
            value={rowHeight}
            onChange={(e) => setRowHeight(Number(e.target.value))}
            style={{ width: 160 }}
          />
        </div>
        <DataGrid<Employee>
          rows={makeEmployees(30)}
          columns={employeeColumns}
          getRowId={(row) => row.id}
          rowHeight={rowHeight}
          virtualized
          height={520}
          aria-label="Grid with custom row height"
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────
// Large Dataset — 10 000 rows, virtualized
// ─────────────────────────────────────────────

const bigRows = makeEmployees(10_000);

export const LargeDataset: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
        10 000 rows — virtualized (only visible rows are rendered to the DOM)
      </p>
      <DataGrid<Employee>
        rows={bigRows}
        columns={employeeColumns}
        getRowId={(row) => row.id}
        height={560}
        virtualized
        overscan={8}
        aria-label="Large employee dataset"
      />
    </div>
  ),
};

// ─────────────────────────────────────────────
// Selection modes
// ─────────────────────────────────────────────

export const WithCheckboxSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<number[]>([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {selected.length > 0 && (
          <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
            Selected IDs: {selected.join(', ')}
          </p>
        )}
        <DataGrid<Employee>
          rows={makeEmployees(30)}
          columns={employeeColumns}
          getRowId={(row) => row.id}
          selection="checkbox"
          onSelectionChange={(ids) => setSelected(ids as number[])}
          height={480}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────
// Multi-column sort
// ─────────────────────────────────────────────

export const MultiColumnSort: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
        Hold <kbd style={{ background: '#f5f5f5', border: '1px solid #d4d4d4', borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace' }}>Shift</kbd> and click column headers to sort by multiple columns simultaneously.
      </p>
      <DataGrid<Employee>
        rows={makeEmployees(50)}
        columns={employeeColumns}
        getRowId={(row) => row.id}
        sorting
        multiSort
        height={480}
        aria-label="Multi-sort grid"
      />
    </div>
  ),
};

// ─────────────────────────────────────────────
// Row expansion
// ─────────────────────────────────────────────

export const RowExpansion: Story = {
  render: () => (
    <DataGrid<Employee>
      rows={makeEmployees(25)}
      columns={employeeColumns}
      getRowId={(row) => row.id}
      rowExpansion
      expandedRowContent={(row) => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {[
            ['Full Name', row.name],
            ['Department', row.department],
            ['Role', row.role],
            ['Location', row.location],
            ['Start Date', row.startDate],
            ['Salary', `$${row.salary.toLocaleString()}`],
            ['Performance', `${row.performance}%`],
            ['Status', row.status],
          ].map(([label, value]) => (
            <div key={label}>
              <dt style={{ fontSize: 11, fontWeight: 600, color: '#737373', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{label}</dt>
              <dd style={{ fontSize: 13, color: '#171717', margin: 0, fontWeight: 500 }}>{value}</dd>
            </div>
          ))}
        </div>
      )}
      height={520}
      aria-label="Grid with expandable rows"
    />
  ),
};

// ─────────────────────────────────────────────
// Aggregation footer
// ─────────────────────────────────────────────

export const WithAggregation: Story = {
  render: () => (
    <DataGrid<Employee>
      rows={makeEmployees(50)}
      columns={employeeColumns}
      getRowId={(row) => row.id}
      showAggregation
      height={520}
      aria-label="Grid with aggregation row"
    />
  ),
};

// ─────────────────────────────────────────────
// Density variants
// ─────────────────────────────────────────────

export const Densities: Story = {
  render: () => {
    const [density, setDensity] = useState<'compact' | 'standard' | 'comfortable'>('standard');
    return (
      <DataGrid<Employee>
        rows={makeEmployees(20)}
        columns={employeeColumns}
        getRowId={(row) => row.id}
        density={density}
        toolbarContent={
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 4 }}>
            {(['compact', 'standard', 'comfortable'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                style={{
                  padding: '3px 10px',
                  fontSize: 12,
                  fontWeight: 500,
                  borderRadius: 6,
                  border: `1.5px solid ${density === d ? '#2563eb' : '#e5e5e5'}`,
                  background: density === d ? '#2563eb' : 'transparent',
                  color: density === d ? 'white' : '#525252',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {d}
              </button>
            ))}
          </div>
        }
        height={480}
      />
    );
  },
};

// ─────────────────────────────────────────────
// Striped rows
// ─────────────────────────────────────────────

export const Striped: Story = {
  render: () => (
    <DataGrid<Employee>
      rows={makeEmployees(30)}
      columns={employeeColumns}
      getRowId={(row) => row.id}
      striped
      height={480}
    />
  ),
};

// ─────────────────────────────────────────────
// Loading state
// ─────────────────────────────────────────────

export const LoadingState: Story = {
  render: () => (
    <DataGrid<Employee>
      rows={[]}
      columns={employeeColumns}
      getRowId={(row) => row.id}
      loading
      height={400}
    />
  ),
};

// ─────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────

export const EmptyState: Story = {
  render: () => (
    <DataGrid<Employee>
      rows={[]}
      columns={employeeColumns}
      getRowId={(row) => row.id}
      height={400}
    />
  ),
};

// ─────────────────────────────────────────────
// Inline cell editing
// ─────────────────────────────────────────────

const editableColumns: ColDef<Employee>[] = [
  { key: 'id', header: 'ID', width: 64, align: 'center' },
  { key: 'name', header: 'Name', width: 200, sortable: true, editable: true },
  { key: 'department', header: 'Department', width: 160, sortable: true, editable: true },
  { key: 'role', header: 'Role', width: 160, sortable: true, editable: true },
  { key: 'salary', header: 'Salary', width: 120, sortable: true, align: 'right', type: 'number', editable: true },
  { key: 'status', header: 'Status', width: 120, sortable: true, editable: true },
];

export const InlineCellEditing: Story = {
  render: () => {
    const [rows, setRows] = useState<Employee[]>(makeEmployees(15));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
          Double-click any editable cell (Name, Department, Role, Salary, Status) to enter edit mode. Press <kbd style={{ background: '#f5f5f5', border: '1px solid #d4d4d4', borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace' }}>Enter</kbd> to commit or <kbd style={{ background: '#f5f5f5', border: '1px solid #d4d4d4', borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace' }}>Esc</kbd> to cancel.
        </p>
        <DataGrid<Employee>
          rows={rows}
          columns={editableColumns}
          getRowId={(row) => row.id}
          height={480}
          onEditCommit={(row, col, newValue) => {
            setRows((prev) =>
              prev.map((r) => r.id === row.id ? { ...r, [col.key]: newValue } : r)
            );
          }}
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────
// Server-side pagination
// ─────────────────────────────────────────────

const ALL_SERVER_ROWS = makeEmployees(500);

export const ServerSidePagination: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<Employee[]>(ALL_SERVER_ROWS.slice(0, 10));

    const fetchPage = (p: number, size: number) => {
      setLoading(true);
      setTimeout(() => {
        setRows(ALL_SERVER_ROWS.slice(p * size, (p + 1) * size));
        setLoading(false);
      }, 400);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
          500 total rows fetched page-by-page with simulated 400 ms network delay.
        </p>
        <DataGrid<Employee>
          rows={rows}
          columns={employeeColumns}
          getRowId={(row) => row.id}
          totalRows={500}
          loading={loading}
          page={page}
          pageSize={pageSize}
          pageSizeOptions={[10, 20, 50]}
          onPageChange={(p) => { setPage(p); fetchPage(p, pageSize); }}
          onPageSizeChange={(s) => { setPageSize(s); setPage(0); fetchPage(0, s); }}
          height={520}
          aria-label="Server-side paginated grid"
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────
// Server-side Sorting
// ─────────────────────────────────────────────

const ALL_SORTABLE = makeEmployees(200);

export const ServerSideSort: Story = {
  render: () => {
    const [rows, setRows] = useState<Employee[]>(ALL_SORTABLE.slice(0, 20));
    const [loading, setLoading] = useState(false);
    const [lastSort, setLastSort] = useState<string>('—');

    const handleSortChange = (model: SortModel[]) => {
      const desc = model.map((s) => `${s.key} ${s.dir}`).join(', ') || 'none';
      setLastSort(desc);
      setLoading(true);
      setTimeout(() => {
        // Simulate server returning sorted data
        let sorted = [...ALL_SORTABLE];
        for (const s of [...model].reverse()) {
          sorted.sort((a, b) => {
            const av = (a as any)[s.key];
            const bv = (b as any)[s.key];
            const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
            return s.dir === 'asc' ? cmp : -cmp;
          });
        }
        setRows(sorted.slice(0, 20));
        setLoading(false);
      }, 350);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
          Sorting is handled server-side. Current sort: <strong>{lastSort}</strong>
        </p>
        <DataGrid<Employee>
          rows={rows}
          columns={employeeColumns}
          getRowId={(row) => row.id}
          sorting
          multiSort
          serverSideSort
          loading={loading}
          onSortChange={handleSortChange}
          pagination={false}
          height={520}
          aria-label="Server-side sort grid"
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────
// Server-side Filtering
// ─────────────────────────────────────────────

export const ServerSideFilter: Story = {
  render: () => {
    const [rows, setRows] = useState<Employee[]>(ALL_SERVER_ROWS.slice(0, 50));
    const [loading, setLoading] = useState(false);
    const [activeFilters, setActiveFilters] = useState<string>('—');

    const handleFilterChange = (model: FilterModel[]) => {
      const desc = model.map((f) => `${f.key} ${f.op} "${f.value}"`).join(' AND ') || 'none';
      setActiveFilters(desc);
      setLoading(true);
      setTimeout(() => {
        // Simulate server-side filtering
        let result = ALL_SERVER_ROWS;
        for (const f of model) {
          result = result.filter((row) => {
            const val = String((row as any)[f.key] ?? '').toLowerCase();
            const fv = f.value.toLowerCase();
            switch (f.op) {
              case 'contains':   return val.includes(fv);
              case 'equals':     return val === fv;
              case 'startsWith': return val.startsWith(fv);
              case 'endsWith':   return val.endsWith(fv);
              case 'empty':      return val === '';
              case 'notEmpty':   return val !== '';
              default:           return true;
            }
          });
        }
        setRows(result.slice(0, 50));
        setLoading(false);
      }, 350);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#525252' }}>
          Filtering is server-side. Active: <strong>{activeFilters}</strong>
        </p>
        <DataGrid<Employee>
          rows={rows}
          columns={employeeColumns}
          getRowId={(row) => row.id}
          filtering
          showColumnFilters
          serverSideFilter
          loading={loading}
          onFilterChange={handleFilterChange}
          pagination={false}
          height={520}
          aria-label="Server-side filter grid"
        />
      </div>
    );
  },
};

// ─────────────────────────────────────────────
// Full-featured showcase
// ─────────────────────────────────────────────

export const FullFeatured: Story = {
  render: () => {
    const [selected, setSelected] = useState<number[]>([]);
    return (
      <DataGrid<Employee>
        rows={makeEmployees(200)}
        columns={employeeColumns}
        getRowId={(row) => row.id}
        sorting
        multiSort
        filtering
        showColumnFilters
        selection="checkbox"
        pagination
        pageSizeOptions={[10, 25, 50, 100]}
        columnResize
        rowExpansion
        showAggregation
        exportCsv
        exportFileName="employees"
        onSelectionChange={(ids) => setSelected(ids as number[])}
        height={600}
        aria-label="Full-featured employee grid"
        expandedRowContent={(row) => (
          <div style={{ display: 'flex', gap: 32 }}>
            <div><dt style={{ fontSize: 11, color: '#737373', fontWeight: 600 }}>EMAIL</dt><dd style={{ margin: 0, fontSize: 13 }}>{row.name.toLowerCase().replace(' ', '.')}@company.com</dd></div>
            <div><dt style={{ fontSize: 11, color: '#737373', fontWeight: 600 }}>EMPLOYEE ID</dt><dd style={{ margin: 0, fontSize: 13 }}>EMP-{String(row.id).padStart(4, '0')}</dd></div>
            <div><dt style={{ fontSize: 11, color: '#737373', fontWeight: 600 }}>TENURE</dt><dd style={{ margin: 0, fontSize: 13 }}>{row.startDate}</dd></div>
          </div>
        )}
      />
    );
  },
};
