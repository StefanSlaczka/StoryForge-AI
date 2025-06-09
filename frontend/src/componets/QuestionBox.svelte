<script>
  export let question = '';
  export let correctAnswer = 0;

  let userAnswer = '';
  let userExplanation = '';
  let result = '';

  async function submitAnswer() {
    const res = await fetch('http://localhost:3000/api/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        answer: userAnswer,
        explanation: userExplanation,
        correctAnswer
      })
    });

    const data = await res.json();
    result = data.message;
  }
</script>

<div class="question-box">
  <h2>{question}</h2>
  <input type="number" bind:value={userAnswer} placeholder="Your answer" />
  <br />
  <textarea
    rows="4"
    bind:value={userExplanation}
    placeholder="Explain how you got your answer..."
  ></textarea>
  <br />
  <button on:click={submitAnswer}>Submit</button>

  {#if result}
    <p>{result}</p>
  {/if}
</div>

<style>
  .question-box {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    max-width: 500px;
  }

  input, textarea {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    margin-top: 0.5rem;
  }
</style>
