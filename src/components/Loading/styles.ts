import styled from 'styled-components/native';

import theme from '@theme/index';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${theme.COLORS.GRAY_600};
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
  color: theme.COLORS.GREEN_700
})``;