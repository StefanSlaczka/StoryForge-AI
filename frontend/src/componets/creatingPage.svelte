<script>
  import { AICharacter } from './scripts/createCharacter';

  // Create a new character instance
  let character = new AICharacter();

  function submitCharacter() {
    console.log("Character Created:", character);
    console.log(character.describe());
  }
</script>

<main>
  <h2>Create Your AI Character</h2>
  <form on:submit|preventDefault={submitCharacter}>
    <label>
      Name:
      <input bind:value={character.name} />
    </label>

    <label>
      Eyes:
      <input bind:value={character.eyes} />
    </label>

    <label>
      Hair:
      <input bind:value={character.hair} />
    </label>

    <label>
      Ethnicity:
      <input bind:value={character.ethnicity} />
    </label>

    <label>
      Race:
      <input bind:value={character.race} />
    </label>

    <label>
      Personality:
      <input bind:value={character.personality} />
    </label>

    <label>
      Type of Person:
      <input bind:value={character.typeOfPerson} />
    </label>

    <label>
      Favorite Things:
      <input bind:value={character.favoriteThings} />
    </label>
    
    <h3>Set the Environment</h3>

    <label>
      Where are you?
      <input bind:value={character.environment.setting} />
    </label>

    <label>
      What’s happening?
      <input bind:value={character.environment.event} />
    </label>

    <button type="submit">Save Character</button>
  </form>
</main>

<style>
  main {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-family: sans-serif;
  }

  h2, h3 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    color: #444;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.25rem;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
  }

  button {
    padding: 0.75rem;
    font-size: 1rem;
    background: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  button:hover {
    background: #0056b3;
  }
</style> 