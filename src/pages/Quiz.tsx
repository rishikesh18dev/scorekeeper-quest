
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getQuizById } from "@/data/quizzes";
import { saveQuizResult } from "@/services/scoreService";
import { QuizResult } from "@/types/quiz";

const Quiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  
  const [quiz, setQuiz] = useState(quizId ? getQuizById(quizId) : undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isRevealed, setIsRevealed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    if (!quiz) {
      toast({
        title: "Quiz not found",
        description: "The quiz you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/quizzes");
    }
  }, [quiz, navigate]);
  
  if (!quiz) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  
  const handleSelectAnswer = (value: string) => {
    if (isRevealed) return;
    setSelectedAnswer(value);
  };
  
  const handleRevealAnswer = () => {
    if (!selectedAnswer) return;
    
    setIsRevealed(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Update answers
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));
    
    // Update score
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    setSelectedAnswer(undefined);
    setIsRevealed(false);
    
    if (isLastQuestion) {
      setIsComplete(true);
      
      // Save results if user is signed in
      if (isSignedIn && user) {
        const result: QuizResult = {
          quizId: quiz.id,
          quizTitle: quiz.title,
          score: score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0),
          totalQuestions: quiz.questions.length,
          date: new Date().toISOString()
        };
        
        saveQuizResult(user.id, result);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(undefined);
    setAnswers({});
    setIsRevealed(false);
    setIsComplete(false);
    setScore(0);
  };
  
  if (isComplete) {
    const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="quiz-card mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            <CardDescription>You've completed the {quiz.title} quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-4">
              <div className="text-6xl font-bold mb-2 bg-quiz-gradient bg-clip-text text-transparent">
                {finalScore} / {quiz.questions.length}
              </div>
              <p className="text-xl">
                {percentage}% Score
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Result Summary</h3>
              <Progress value={percentage} className="h-3" />
              <div className="flex justify-between text-sm">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            
            <div className="pt-4 text-center">
              {percentage >= 70 ? (
                <div className="text-green-600 flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Great job! You passed the quiz.</span>
                </div>
              ) : (
                <div className="text-amber-600 flex items-center justify-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <span>You might want to study more and try again.</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/quizzes")}>
              Back to Quizzes
            </Button>
            <Button onClick={handleRetry}>
              Try Again
            </Button>
          </CardFooter>
        </Card>
        
        {!isSignedIn && (
          <Card className="bg-quiz-primary/10 border-quiz-primary/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <p className="font-medium">Sign in to save your quiz results and track your progress!</p>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="mt-2"
                >
                  Sign In to Save Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="h-2" />
          <span className="text-sm font-medium min-w-[4rem]">
            {currentQuestionIndex + 1}/{quiz.questions.length}
          </span>
        </div>
      </div>
      
      <Card className="quiz-card">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer}
            onValueChange={handleSelectAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let optionClassName = "border-2 p-4 rounded-md cursor-pointer transition-all";
              
              if (isRevealed) {
                if (isCorrect) {
                  optionClassName += " border-green-500 bg-green-50";
                } else if (isSelected && !isCorrect) {
                  optionClassName += " border-red-500 bg-red-50";
                }
              } else {
                optionClassName += isSelected
                  ? " border-primary"
                  : " border-gray-200 hover:border-gray-300";
              }
              
              return (
                <div key={option} className={optionClassName}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} disabled={isRevealed} />
                    <Label htmlFor={option} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                    {isRevealed && isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {isRevealed && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isRevealed ? (
            <Button
              onClick={handleRevealAnswer}
              disabled={!selectedAnswer}
              className="w-full"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="w-full"
            >
              {isLastQuestion ? "Complete Quiz" : "Next Question"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
