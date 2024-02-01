import { useCardStore } from '@/stores/useCardStore';

const saveHighScore = (highScore: number | string, name: string) => {
  localStorage.setItem('highScore', highScore.toString());
  localStorage.setItem('highScoreName', name);
};

export const checkIfHighScore = (score: number, name: string) => {
  const currentHighScore = useCardStore().getHightScore().score;
  if (score > currentHighScore) {
    useCardStore().setHighScore(score, name);
    saveHighScore(score, name);
    return currentHighScore;
  }
  return 0;
};

export const retrieveHighScore = () => {
  const score = localStorage.getItem('highScore');
  const highScoreName = localStorage.getItem('highScoreName');
  if (score !== null && highScoreName !== null) {
    useCardStore().setHighScore(score, highScoreName);
  }
};
