import styled from 'styled-components';

export const Container = styled.div`
    margin: 3rem 0rem 0rem 2rem;

    display: flex;
    flex-direction: column;
`;

export const LifeLabel = styled.div`
    margin-top: 0rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        color: #0db80d;
        font-weight: 600;
        font-size: 2rem;

        margin-left: 0.2rem;
    }
`;

export const WeaponLabel = styled.div`
    margin-top: 3rem;

    span {
        color: gray;
        font-weight: 500;
        font-size: 1.4rem;
    }
`;

export const StrenghtLabel = styled.div`
    margin-top: 1rem;

    span {
        color: orange;
        font-weight: 500;
        font-size: 1.2rem;
    }
`;

export const OpponentLifeLabel = styled.div`
    margin-top: 10rem;
    /* font-size: 0.8rem; */

    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        color: red;
        font-weight: 600;
        font-size: 2rem;

        margin-left: 0.2rem;
    }
`;