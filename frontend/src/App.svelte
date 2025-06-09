<script>
  let userInput = '';
  let result = '';

  async function submitAnswer() {
    const res = await fetch('http://localhost:3000/api/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: userInput })
    });

    const data = await res.json();
    result = data.message;
  }
</script>

<h1>🧠 What is 2 + 2?</h1>
<input bind:value={userInput} type="number" placeholder="Your answer" />
<button on:click={submitAnswer}>Submit</button>

{#if result}
  <p>{result}</p>
{/if}
