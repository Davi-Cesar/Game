import styled from "styled-components";

export const Container = styled.div`
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #24282F;
    height: 100vh;
    color: white;
    button {
        padding: 1rem 2rem;
        background-color: #30CC51;
        border: 0;
        color: white;
        cursor: pointer;
        font-weight: 700;
        font-family: 'Roboto';
        width: 250px;
        margin: 1rem;
        &:hover {
            filter: brightness(0.9);
        }
        transition: filter 0.2s;
    }
    select {
        margin: 1rem 2rem;
        
        height: 320px ; 
        width: 450px;
        border: none;
        outline: none;
        option {
            cursor: auto;
            font-family: 'Roboto';
            font-size: 0.9rem;
            font-weight: 500;
            padding: 1rem;
            color: #0A0A0A;
        }
    }
`;

export const Users = styled.div`
    display: flex;
    flex-direction: column;
    p {
        padding: .1rem;
   }

   div {
    justify-content: space-between;
    align-items: center;
    display: flex;
    
   }
`
export const Content = styled.div`
    display: flex;
    p {
        padding: .2rem;
        display: flex;
        flex-direction: column;
        margin-left: 5px;
   }
`
export const Ball = styled.div`
    width: 7px;
    height: 7px;
    margin-left: 1rem;
    border-radius: 50%;

    
    background-color: #30CC51;
`
export const Chat = styled.div`
    background-color: white;
    height: 300px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #24282F;
    overflow: scroll;
    flex: 1 1 auto;
    
    h5 {
        justify-content: left;
        align-items: left;
        display: flex;
        padding: 0;
        margin: 10px;
        font-family: 'Roboto', sans-serif;
    }

    input {
        border: 1px solid #C4C4C4;
        outline: none;
        bottom: 0;
        top: 1;
        padding: 1rem;
        
        justify-content: flex-end;
    }
    
`;