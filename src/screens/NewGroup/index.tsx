import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';
import { createGroup } from '@storage/group/createGroup';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { Container, Content, Icon } from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function createNewGroup() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('New Group', "Please, informe your group's name.");
      }

      await createGroup(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Group', error.message);
      } else {
        Alert.alert('New Group', 'There was an error trying to create a new group.');
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New Group"
          subtitle="Register a new group to assign your friends to teams"
        />

        <Input
          placeholder="Your group name"
          onChangeText={setGroup}
          style={{ marginBottom: 20 }}
        />

        <Button
          title="Register"
          onPress={createNewGroup}
        />
      </Content>
    </Container>
  );
}