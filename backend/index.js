const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/check-answer', (req, res) => {
  const userAnswer = parseInt(req.body.answer, 10);
  const correctAnswer = 4;

  if (userAnswer === correctAnswer) {
    res.json({ message: '✅ Correct!' });
  } else {
    res.json({ message: `❌ Incorrect. The answer is ${correctAnswer}.` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
