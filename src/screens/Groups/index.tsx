import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { getAllGroups } from '@storage/group/getAllGroups';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>(['CS:GO', 'League of Legends', 'Roblox', 'Fortnite']);

  const navigation = useNavigation();

  function handleCreateNewGroup() {
      navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await getAllGroups();

      setGroups(data);
    } catch (error) {
      Alert.alert('Groups', 'There was an error loading the groups.')
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));

  return (
    <Container>
      <Header />

      <Highlight
        title="e-Sports Teams"
        subtitle="Play with your group online"
      />

      {
        isLoading ? <Loading /> : (
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty message="There are no groups registered yet." />
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      }

      <Button title="Register new group" onPress={handleCreateNewGroup} />
    </Container>
  );
}