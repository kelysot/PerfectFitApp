import React from 'react';
import styled from "styled-components";

function PopUp(props) {
  const deleteRow = () => {
    let location = window.location.href;
    if(!location.includes('&')){
        fetch(`/category/getByGenderAndName/${props.name}` , {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
            .then((res) => res.json())
              .then((data) => {
                console.log(data.category);
                props.setTrigger(false);
            })
    }else{
        fetch(`/subCategory/edit/getSubCategoriesByNameAndGender/${props.name}` , {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGYxMWUzMWFlNWUzZGE1NmM3YTliOSIsImlhdCI6MTY1MTU1OTQ3NywiZXhwIjoxNjUxNjQ1ODc3fQ.XyIxQa-OhoUmVcQHEl4MMW0PmEAMQVOO8jgT9DKJixc'
             }
          })
            .then((res) => res.json())
              .then((data) => {
                console.log(data.subCategory);
                props.setTrigger(false);
            })
    }
  } 

  return (props.trigger) ? (
    <PopUpStyle>
        <div className="popup-inner">
            {props.children}
            <div className="popup-buttons">
                <button id="delete-button" onClick={deleteRow}>Delete</button>
                <button id="cancel-button" onClick={()=> props.setTrigger(false)}>Cancel</button>
            </div>
        </div>
    </PopUpStyle>
  ) : ""
};

const PopUpStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .popup-inner{
        position: relative;
        border: 3px solid var(--color-dark-variant);
        border-radius: 15px;
        padding: 30px;
        width: 100%;
        max-width: 640px;
        background-color: #fff;

        h3{
            font-size: 1.5rem;
            padding-bottom: 1.5rem;
            color: var(--color-downIcon-red);
        }

        p{
            color: var(--color-dark-variant);
            font-size: 1.1rem;
            padding-bottom: 1.8rem;
        }

        button{
            padding: 0.4rem 0.8rem;
            font-size: 1.1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.5 ease;
            background: none;
            
            &:hover{
                transform: scale(1.1) ;
            }
        }

        .popup-buttons{
            display: flex;
            justify-content: center;
            gap: 1.8rem;

            #delete-button {
                color: var(--color-downIcon-red);
                font-weight : bold;
                border: 0.3px solid var(--color-downIcon-red);
            }

            #cancel-button {
                border: 0.3px solid #0000ff5e;
                font-weight : bold;
                color: #0000ff9c;
                background: #0000ff17;
            }
        }
    }
`;

export default PopUp;