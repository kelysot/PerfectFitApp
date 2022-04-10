import React from 'react';
import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';

function CategoriesTable() {
  return (
    <CategoriesTableStyle>
        <h3 className="title">Categories List</h3>
        <DataGrid style={{ height:'56vh', width: '100%' }}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
    </CategoriesTableStyle>
  )
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

const CategoriesTableStyle = styled.div`
    
    background-color: #ffffffe8;
    border-radius: 8px;
    padding: 10px;
    max-width:50%; // for now !
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);

    .title{
        font-weight: bold;
        font-size: 14px;
        color: var(--color-dark-variant);
        margin-bottom: 30px;
    }
`;

export default CategoriesTable;