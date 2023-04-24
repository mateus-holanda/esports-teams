import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '@theme/index';

export const Container = styled.View`
  width: 100%;
  height: 56px;

  background-color: ${theme.COLORS.GRAY_500};

  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
  border-radius: 6px;
`;

export const Name = styled.Text`
  flex: 1;

  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.GRAY_200};
`;

export const Icon = styled(MaterialIcons).attrs({
  size: 24,
  color: theme.COLORS.GRAY_200
})`
  margin-left: 16px;
  margin-right: 4px;
`;