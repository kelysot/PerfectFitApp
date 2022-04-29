import React from 'react';
import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

function Table({categoriesData, title , height, columns , link , action}) {

  const actionColumn = [{field: 'action', headerName:"Action", width: 250, renderCell: (params)=> {
     return(
      <div className="cellAction">
        <Link to={`/categories/${params.row.name}&${params.row.gender}`} className="link">
          <div className="view">View</div>
        </Link>
        <div className="delete">Delete</div>
      </div>
     )
  }}]

  return (
    <CategoriesTableStyle>
      { (categoriesData && columns) && (<>
        <div className="tableTop">
          <h3 className="title">{title}</h3>
          <Link to={link} className="link">
            Add New
          </Link>
        </div>
        <DataGrid style={{ height:`${height}vh`}}
            rows={categoriesData}
            columns={action ? columns.concat(actionColumn) : columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
        />
      </>)}
    </CategoriesTableStyle>
  )
};
  
const CategoriesTableStyle = styled.div`
    
    background-color: #ffffffe8;
    border-radius: 8px;
    padding: 10px 20px;
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
    width: 100%;

    .title{
        font-weight: bold;
        font-size: 16px;
        color: var(--color-dark-variant);
        margin-bottom: 10px;
    }

    .tableTop{
      width: 100%;
      font-size: 20px;
      color: var(--color-dark-variant);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .link{
        text-decoration: none;
        color: green;
        font-size: 16px;
        font-weight: bold;
        border: 1px solid green;
        padding: 5px;
        border-radius: 8px;
        cursor: pointer;

        &:hover{
          background-color: #00800038;
          border-color: #00800038;
        }
      }
    }

    .css-1s0hp0k-MuiDataGrid-columnHeadersInner{ //div all heder of table
      background-color: #9795ec87;
      width:100% ;
      display: flex ;
      align-items:center ;
    }

    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer,.css-3ihp42-MuiDataGrid-root .MuiDataGrid-cell--textRight{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .css-1jbbcbn-MuiDataGrid-columnHeaderTitle{ // every cell in heder
      font-weight: 800;
      font-size: 1rem ;
    }

    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-row{ // data row 
      width:100% ;
      display: flex ;
      align-items:center;
      transition: all 0.3s ease;
    }

    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-row:hover{ //data roe hover
      background-color: #edf2f8 ;
      cursor: pointer;
      transform:scale(1.01) ;
    }
    
    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-cell--textLeft{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .css-3ihp42-MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .css-3ihp42-MuiDataGrid-root .MuiDataGrid-cell:focus{
      outline:none;
    }
    

    .image{
      display: flex;
      align-items: center;
      img{
        height: 38px;
        width: 38px;
        border-radius:50%;
        object-fit:cover;
      }
    }

    .cellAction{
      display: flex;
      align-items: center;
      gap: 25px;

      .view, .edit, .delete {
        padding: 4px 8px;
        border-radius: 6px;
        font-weight: bolder;
        color: var(--color-dark-variant);
      }

      .view{
        background-color:#3e98c766;
        &:hover{
          color:white;
        }
      }

      .delete{
        background-color:#ff00003b;
        &:hover{
          color:white;
        }
      }

      .link{
        text-decoration: none;
      }
    }
`;


export default Table;