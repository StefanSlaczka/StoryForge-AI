<script>
  import { fsm } from '../fsm/party';
  import { onMount, afterUpdate } from 'svelte';

  let userInput = '';
  let chatLog = [];
  let chatBoxRef;

  const intro = "Hey user, want to go to the party?";

  onMount(() => {
    chatLog = [{ from: 'bot', text: intro }];
  });

  function handleSubmit() {
    const recognized = fsm.analyzeInput(userInput);
    const botResponses = fsm.act("whatAreWeGoingToDo");

  chatLog = [
    ...chatLog,
    { from: 'user', text: userInput },
    ...botResponses.map(text => ({ from: 'bot', text }))
  ];

  userInput = '';
}
  // Auto-scroll after chatLog updates
  afterUpdate(() => {
    if (chatBoxRef) {
      chatBoxRef.scrollTop = chatBoxRef.scrollHeight;
    }
  });
</script>

<main>
  <h1>Chat with PartyBot</h1>

  <div class="chat-box" bind:this={chatBoxRef}>
    {#each chatLog as msg}
      <p><strong>{msg.from}:</strong> {msg.text}</p>
    {/each}
  </div>

  <input
    bind:value={userInput}
    placeholder="Say something..."
    on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
  />
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
