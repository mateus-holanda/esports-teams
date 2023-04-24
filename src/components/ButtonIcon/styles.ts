import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '@theme/index';

export type ButtonIconTypeStyleProps = 'ADD' | 'DELETE';

interface Props {
  type: ButtonIconTypeStyleProps;
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ type }) => ({
  size: 24,
  color: type === 'ADD' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``;