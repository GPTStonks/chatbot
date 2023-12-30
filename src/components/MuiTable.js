import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

export default function MuiTable({ data }) {
  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 100,
          valueFormatter: (params) => {
            if (key === 'date' || key.endsWith('_date')) {
              return new Date(params.value).toLocaleDateString();
            }
            if (typeof params.value === 'number') {
              return params.value.toLocaleString();
            }
            return params.value;
          },
        }))
      : [];

  const rows = data.map((item, index) => ({ id: index, ...item }));
  return (
    <div
      style={{
        height: 400,
        width: '100%',
        maxWidth: '90vw',
        paddingBottom: '1rem',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
