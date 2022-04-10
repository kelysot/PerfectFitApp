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
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
        />
    </CategoriesTableStyle>
  )
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Category Name', width: 150},
    { field: 'gender', headerName: 'Category Gender', width: 160},
    { field: 'numOfPosts', headerName: 'Total Post', type: 'number', width: 130},
    { field: 'percent', headerName: 'Percent Of Total Post', width: 180}
  ];
  //TODO: get the data from server
  const rows = [
    { id: 1, gender: 'Snow', name: 'Jon', numOfPosts: 35 ,percent: '10%' },
    { id: 2, gender: 'Lannister', name: 'Cersei', numOfPosts: 42 , percent: '10%'},
    { id: 3, gender: 'Lannister', name: 'Jaime', numOfPosts: 45 , percent: '10%'},
    { id: 4, gender: 'Stark', name: 'Arya', numOfPosts: 16 , percent: '10%'},
    { id: 5, gender: 'Targaryen', name: 'Daenerys', numOfPosts: null , percent: '10%'},
    { id: 6, gender: 'Melisandre', name: null, numOfPosts: 150 , percent: '10%'},
    { id: 7, gender: 'Clifford', name: 'Ferrara', numOfPosts: 44 , percent: '10%'},
    { id: 8, gender: 'Frances', name: 'Rossini', numOfPosts: 36 , percent: '10%'},
    { id: 9, gender: 'Roxie', name: 'Harvey', numOfPosts: 65 , percent: '10%'},
  ];

const CategoriesTableStyle = styled.div`
    
    background-color: #ffffffe8;
    border-radius: 8px;
    padding: 10px;
    max-width:51%; // for now !
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);

    .title{
        font-weight: bold;
        font-size: 16px;
        color: var(--color-dark-variant);
        margin-bottom: 30px;
    }

    .css-1s0hp0k-MuiDataGrid-columnHeadersInner{ //div all heder of table
      background-color: #9795ec;
      width:100% ;
      display: flex ;
      align-items:center ;
    }

    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer,.css-3ihp42-MuiDataGrid-root .MuiDataGrid-cell--textRight{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .css-1jbbcbn-MuiDataGrid-columnHeaderTitle{ // evry cell in heder
      font-weight: 800;
      font-size: 1rem ;
    }

    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-row{ // data row 
      width:100% ;
      display: flex ;
      align-items:center ;
    }

    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-row:hover{ //data roe hover
      background-color: #edf2f8 ;
      cursor: pointer;
    }
    
    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-cell--textLeft{
      display: flex;
      align-items: center;
      justify-content: center;
    }
`;

export default CategoriesTable;