import styled from "styled-components";

export const Container = styled.div`
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: #24282F;
    height: 100vh;
    
    padding: 2rem;
    h2 {
        font-family: 'Roboto';
        color: white;
        font-weight: 800;
    }

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
    
    
    input {
        background-color: white;
        text-decoration: none; 
        padding: .5rem;
        width: 250px;
        color: black;
        
        margin: 1rem;
        height: 25px;
        border: none;
        outline: none;
        text-decoration: none;

    }
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 450px;
    width: 450px;
    
    border: 1px solid #f4f4f4;
    border-radius: 1rem;
    margin: auto;
`