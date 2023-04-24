import { TouchableOpacity } from "react-native";
import styled from 'styled-components/native';

import theme from '@theme/index';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

interface TouchableOpacityProps {
  type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity)<TouchableOpacityProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.WHITE};
`;