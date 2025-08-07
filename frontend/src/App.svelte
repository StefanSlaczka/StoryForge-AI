<script>
  import { fsm } from '../fsm/party';
  import { mount, onMount } from 'svelte';

  let userInput = '';
  let chatLog = [];
  const intro = "Hey user, want to go to the party?";

  onMount(() => {
    chatLog = [{ from: 'bot', text: intro }];
  });

  function handleSubmit() {
    const botResponse = fsm.handleInput(userInput);
    chatLog = [
      ...chatLog,
      { from: 'user', text: userInput },
      { from: 'bot', text: botResponse }
    ];
    userInput = '';
  }
</script>

<main>
  <h1>Chat with PartyBot</h1>
  
  <div class="chat-box">
    {#each chatLog as msg}
      <p><strong>{msg.from}:</strong> {msg.text}</p>
    {/each}
  </div>
  
  <input bind:value={userInput} placeholder="Say something..." on:keydown={(e) => e.key === 'Enter' && handleSubmit()} />
  <button on:click={handleSubmit}>Send</button>
</main>

<style>
  .chat-box {
    border: 1px solid #ccc;
    padding: 1rem;
    height: 300px;
    overflow-y: scroll;
    margin-bottom: 1rem;
  }
</style>
