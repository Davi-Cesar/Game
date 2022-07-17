import * as S from './styles';

type Props = {
    life: number
    weapon: string
    strengh: number
    // shield: number
}

export const Hud = ({life, weapon, strengh}: Props) => {
    return (
        <S.Container>
            <S.LifeLabel>Life: <span>{life}</span> </S.LifeLabel>
            <S.WeaponLabel>Weapon: <span>{weapon}</span></S.WeaponLabel>
            <S.StrenghtLabel>Strengh: <span>{strengh*2}</span></S.StrenghtLabel>
        </S.Container>
    );
}