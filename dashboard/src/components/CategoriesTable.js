import React from 'react';
import styled from "styled-components";
import { DataGrid } from '@mui/x-data-grid';

function CategoriesTable({categoriesData, title , height}) {

  const actionColumn = [{field: 'action', headerName:"Action", width: 250, renderCell: ()=> {
     return(
      <div className="cellAction">
        <div className="view">View</div>
        {/* <div className="edit">Edit</div> */}
        <div className="delete">Delete</div>
      </div>
     )
  }}]

  return (
    <CategoriesTableStyle>
      { categoriesData && (<>
        <h3 className="title">{title}</h3>
        <DataGrid style={{ height:`${height}vh`}}
            rows={categoriesData}
            columns={columns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            onSelectionModelChange={item => {
              console.log(item);
              item.forEach((i) => {
                console.log(categoriesData[i]);
              })
            }}
        />
      </>)}
    </CategoriesTableStyle>
  )
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'options' , headerName: 'Image',
      renderCell: (params) => {
        return (
          <div className="image">
              <img src={params.row.image} alt="categoryImage"></img>
          </div>
        )
      }
    },
    { field: 'name', headerName: 'Category Name', width: 150},
    { field: 'gender', headerName: 'Category Gender', width: 160},
    { field: 'numOfPosts', headerName: 'Total Post', type: 'number', width: 130},
    { field: 'percent', headerName: 'Percent Of Total Post', width: 180}
  ];
  
const CategoriesTableStyle = styled.div`
    
    background-color: #ffffffe8;
    border-radius: 8px;
    padding: 10px 20px;
    box-shadow: 0px -12px 15px rgb(0 0 0 / 10%);
    /* max-width:49rem; */
    width: 100%;

    .title{
        font-weight: bold;
        font-size: 16px;
        color: var(--color-dark-variant);
        margin-bottom: 30px;
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
      }

      /* .edit{
        background-color:#ffa50042;
      } */

      .delete{
        background-color:#ff00003b;

      }
    }
`;

export default CategoriesTable;