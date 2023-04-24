import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { getAllGroups } from './getAllGroups';
import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function createGroup(newGroup: string) {
  try {
    const storedGroups = await getAllGroups();

    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("There's already a group registered with this name.");
    }

    const storage = JSON.stringify([...storedGroups, newGroup]);
    
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
};