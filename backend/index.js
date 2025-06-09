const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/check-answer', (req, res) => {
  const userAnswer = parseInt(req.body.answer, 10);
  const correctAnswer = 4;

  const isCorrect = userAnswer === correctAnswer;

  res.json({
    message: isCorrect
      ? '✅ Correct!'
      : `❌ Incorrect. The answer is ${correctAnswer}.`,
    isCorrect: isCorrect
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
