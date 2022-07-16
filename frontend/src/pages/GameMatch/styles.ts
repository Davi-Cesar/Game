import styled from "styled-components";

export const Container = styled.div`
    background-color: #24282F;
    min-height: 100vh;
    color: #FFF;

    display: flex;
`;

export const Map = styled.div`
    width: 480px;
    height: 480px;
    background-image: url('/assets/map.png');
    background-position: left top;
    background-size: 100%;
`;

type WeaponProps = {
    top: number
    left: number
}

export const Weapon = styled.img<WeaponProps>`
    width: 30px;
    height: 30px;

    position: absolute;
    top: ${({top}) => 
        top
    }px;
    left: ${({left}) => 
        left
    }px;
`
