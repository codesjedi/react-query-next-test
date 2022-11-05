import React from 'react';
import { useRouter } from 'next/router';

import { useCharacter } from '../../hooks';

function Character() {
  const { query } = useRouter();
  const { character } = useCharacter(`${query.id}`);

  return <h1>{character?.name}</h1>;
}

export default Character;
