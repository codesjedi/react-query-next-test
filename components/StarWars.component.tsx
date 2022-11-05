import { useState } from 'react';

import styles from '../styles/Home.module.css';

import { useCharacters } from '../hooks';
import Link from 'next/link';

export default function StarWars() {
  const [charactersPage, setCharactersPage] = useState(1);

  const {
    characters,
    charactersError,
    charactersLoading,
    charactersFetching,
    charactersRefetch,
    isMoreCharacters,
  } = useCharacters(charactersPage);

  const { container, center, buttons } = styles;

  return (
    <div className={container}>
      <h1 className={center}>Star Wars</h1>
      {charactersLoading || charactersFetching ? (
        <h1>Loading....</h1>
      ) : charactersError ? (
        <h1>There was an error</h1>
      ) : (
        <>
          <h2>Characters:</h2>
          <ul>
            {characters &&
              characters.map((character) => {
                return (
                  <Link
                    key={character.url}
                    href={`/characters/${character.url.split('/').at(-2)}`}
                  >
                    <li>{character.name}</li>
                  </Link>
                );
              })}
          </ul>
        </>
      )}
      <div className={buttons}>
        <button onClick={() => setCharactersPage(1)}>Go to start</button>
        <button
          disabled={charactersPage === 1}
          onClick={() => {
            setCharactersPage((prev) => prev - 1);
          }}
        >
          Go back
        </button>
        <button
          disabled={!isMoreCharacters}
          onClick={() => {
            isMoreCharacters && setCharactersPage((prev) => prev + 1);
          }}
        >
          Load more
        </button>
        <button onClick={() => charactersRefetch()}>Reload</button>
      </div>
    </div>
  );
}
