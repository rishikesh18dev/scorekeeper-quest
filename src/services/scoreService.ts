
import { QuizResult, UserScore } from "@/types/quiz";

const SCORES_KEY = "quiz_user_scores";

export const saveQuizResult = (userId: string, result: QuizResult): void => {
  const allScores = getAllScores();
  const userScoreIndex = allScores.findIndex(score => score.userId === userId);
  
  if (userScoreIndex >= 0) {
    // User exists, update their results
    allScores[userScoreIndex].results.push(result);
  } else {
    // New user, create new entry
    allScores.push({
      userId,
      results: [result]
    });
  }
  
  localStorage.setItem(SCORES_KEY, JSON.stringify(allScores));
};

export const getUserScores = (userId: string): QuizResult[] => {
  const allScores = getAllScores();
  const userScore = allScores.find(score => score.userId === userId);
  return userScore ? userScore.results : [];
};

export const getAllScores = (): UserScore[] => {
  const scoresJson = localStorage.getItem(SCORES_KEY);
  return scoresJson ? JSON.parse(scoresJson) : [];
};

export const clearUserScores = (userId: string): void => {
  const allScores = getAllScores();
  const filteredScores = allScores.filter(score => score.userId !== userId);
  localStorage.setItem(SCORES_KEY, JSON.stringify(filteredScores));
};
