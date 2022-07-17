import * as S from './styles';

type Props = {
    life: number
    weapon: string
    strengh: number
    opponentsLife: number
    // shield: number
}

export const Hud = ({life, weapon, strengh, opponentsLife}: Props) => {
    return (
        <S.Container>
            <S.LifeLabel>Your Life: <span>{life}</span> </S.LifeLabel>
            <S.WeaponLabel>Weapon: <span>{weapon}</span></S.WeaponLabel>
            <S.StrenghtLabel>Strengh: <span>{strengh*2}</span></S.StrenghtLabel>
            <S.OpponentLifeLabel>Opponent's Life: <span>{opponentsLife}</span> </S.OpponentLifeLabel>
        </S.Container>
    );
}