<script>
  import Character from './componets/character.svelte';
  import CreatingPage  from './componets/creatingPage.svelte';

  let currentTab = 'character';
</script>

<nav>
  <button on:click={() => currentTab = 'character'}>Character Chat</button>
  <button on:click={() => currentTab = 'empty'}>creating Page</button>
</nav>

{#if currentTab === 'character'}
  <Character />
{:else if currentTab === 'empty'}
  <CreatingPage  />
{/if}

<style>
  nav {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    background: #eee;
    cursor: pointer;
  }

  button:hover {
    background: #ddd;
  }
</style>
