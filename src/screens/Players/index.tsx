import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { removeGroupByName } from '@storage/group/removeGroupByName';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { addPlayerByGroup } from '@storage/player/addPlayerByGroup';
import { removePlayerByGroup } from '@storage/player/removePlayerByGroup';
import { getPlayersByGroupAndTeam } from '@storage/player/getPlayersByGroupAndTeam';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { Loading } from '@components/Loading';

interface RouteParams {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('Team A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('New Player', "Please, informe the player's name.");
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await addPlayerByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur(); // Keyboard.dismiss()
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('New Player', error.message);
      } else {
        Alert.alert('New Player', 'There was an error trying to add a new player.');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await getPlayersByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert('Players', 'There was an error loading the players of this team.')
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remove Player', 'There was an error trying to remove this player.');
    }
  }

  async function removeGroup() {
    try {
      await removeGroupByName(group);

      navigation.navigate('groups');
    } catch (error) {
      Alert.alert('Remove Group', 'There was an error trying to remove this group.')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remove Group',
      'Are you sure you want to remove this group?',
      [
        { text: 'No', style: 'cancel' },
        { text: "Yes, I'm sure", onPress: () => removeGroup() }
      ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="Add your friends and start playing!"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Participant's name"
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Team A', 'Team B', 'Team C']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {
        isLoading ? <Loading /> : (
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => handleRemovePlayer(item.name)}
              />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="There are no players assigned to this team yet." />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length == 0 && { flex: 1 }
            ]}
          />
        )
      }

      <Button
        title="Remove group"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}