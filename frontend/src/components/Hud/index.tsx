import * as S from './styles';

type Props = {
    life: number
}

export const Hud = ({life}: Props) => {
    return (
        <S.Container>
            <S.Life>Life: {life}</S.Life>
        </S.Container>
    );
}