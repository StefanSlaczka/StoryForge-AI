<script>
  let userAnswer = '';
  let userExplanation = '';
  let result = '';
  let isCorrect = false;
  let explanationSubmitted = false;

  async function submitAnswer() {
    const res = await fetch('http://localhost:3000/api/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: userAnswer })
    });

    const data = await res.json();
    result = data.message;
    isCorrect = data.isCorrect;
  }

  async function submitExplanation() {
    const res = await fetch('http://localhost:3000/api/save-explanation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer: userAnswer,
        explanation: userExplanation
      })
    });

    const data = await res.json();
    explanationSubmitted = true;
  }
</script>

<h1>🧠 What is 2 + 2?</h1>

{#if !isCorrect}
  <input bind:value={userAnswer} type="number" placeholder="Your answer" />
  <button on:click={submitAnswer}>Submit</button>
{/if}

{#if result}
  <p>{result}</p>
{/if}

{#if isCorrect && !explanationSubmitted}
  <div>
    <h2>How did you get your answer? Explain to strengthen your knowledge.</h2>
    <textarea
      bind:value={userExplanation}
      rows="4"
      placeholder="Type your explanation here..."
    ></textarea>
    <br />
    <button on:click={submitExplanation}>Submit Explanation</button>
  </div>
{:else if explanationSubmitted}
  <p>✅ Thanks for your explanation!</p>
{/if}
