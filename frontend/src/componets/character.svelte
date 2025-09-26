<script>
  import { PartyFSM } from '../../fsm/party-fsm';
  import { ChatBot } from '../lib/chatBot';
  import { onMount, afterUpdate } from 'svelte';

  let userInput = '';
  let chatLog = [];
  let chatBoxRef;
  let chatBot;

  onMount(() => {
    const fsm = new PartyFSM(); // create fms
    chatBot = new ChatBot(fsm); // makes chat bot with fsm
    chatLog = chatBot.initialize(); // starting conversation
  });

  async function handleSubmit() {
    if (!userInput.trim()) return; // doesn't send empty messages
    
    const newChatLog = await chatBot.processUserInput(userInput);
    chatLog = newChatLog; // update UI with the new conversatuon
    userInput = ''; // clears input
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

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
      <div class="message {msg.from}">
        <strong>{msg.from}:</strong> {msg.text}
      </div>
    {/each}
  </div>

  <div class="input-area">
    <input
      bind:value={userInput}
      placeholder="Say something..."
      on:keydown={handleKeyPress}
      disabled={chatBot?.isProcessing}
    />
    <button on:click={handleSubmit} disabled={chatBot?.isProcessing}>
      {chatBot?.isProcessing ? 'Processing...' : 'Send'}
    </button>
  </div>

  <button on:click={() => {
    chatLog = chatBot.clearChat();
  }}>Reset Chat</button>
</main>

<style>
  .message.user { color: blue; }
  .message.bot { color: green; }
  .chat-box { 
    height: 300px; 
    overflow-y: auto; 
    border: 1px solid #ccc; 
    padding: 10px;
    margin: 10px 0;
  }
</style>