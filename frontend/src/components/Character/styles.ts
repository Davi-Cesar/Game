import styled from 'styled-components';

export const Container = styled.div<{ size: number, left: number, top: number, sidePos: number }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    background-image: url('/assets/char.png');
    background-position: 0px ${props => props.sidePos}px;

    z-index: 1;
`;

export const NameBox = styled.div`
    background-color: #000;
    padding: 3px;
    border-radius: 5px;
    position: absolute;
    font-size: 10px;
    text-align: center;
    margin-top: -20px;
`;

export const WeaponIcon = styled.img`
    width: 12px;
    height: 12px;

    position: absolute;
    margin: -0.1rem 0rem 0rem 1.8rem;
`;