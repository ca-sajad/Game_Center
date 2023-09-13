const fs = require('fs').promises;

const filePath = 'gamesAIServer/hangmanAI/wordsMoreThan6.txt';

export const getRandomWord = async () => {

  try {
    const data = await fs.readFile(filePath, 'utf8');

    const words = data.split('\n');

    const randomIndex = Math.floor(Math.random() * words.length);

    return {"word": words[randomIndex]};

  } catch (error) {
    console.error('Error reading file:', error);
  }

}

