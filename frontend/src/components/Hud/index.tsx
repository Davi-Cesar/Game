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
            <S.Label>Life: {life}</S.Label>
            <S.Label>Weapon: {weapon}</S.Label>
            <S.Label>Strengh: {strengh}</S.Label>
        </S.Container>
    );
}