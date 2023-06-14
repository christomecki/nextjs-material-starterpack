import { v4 as uuidv4 } from 'uuid';

export const STARTING_CHAIN = '0';

export function generateNextChain() {
  return uuidv4();
}
