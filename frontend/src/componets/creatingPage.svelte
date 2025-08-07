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
    <label>Name: <input bind:value={character.name} /></label><br>
    <label>Eyes: <input bind:value={character.eyes} /></label><br>
    <label>Hair: <input bind:value={character.hair} /></label><br>
    <label>Ethnicity: <input bind:value={character.ethnicity} /></label><br>
    <label>Race: <input bind:value={character.race} /></label><br>
    <label>Personality: <input bind:value={character.personality} /></label><br>
    <label>Type of Person: <input bind:value={character.typeOfPerson} /></label><br>
    <label>Favorite Things: <input bind:value={character.favoriteThings} /></label><br>
    
    <h3>Set the Environment</h3>
    <label>Where are you? <input bind:value={character.environment.setting} /></label><br>
    <label>What’s happening? <input bind:value={character.environment.event} /></label><br>

    <button type="submit">Save Character</button>
  </form>

  <pre>{JSON.stringify(character, null, 2)}</pre>
</main>
