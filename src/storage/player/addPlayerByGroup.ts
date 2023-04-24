import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { getPlayersByGroup } from './getPlayersByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
        throw new AppError('This person is already assigned to this group.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}