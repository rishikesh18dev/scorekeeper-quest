
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserScores, clearUserScores } from "@/services/scoreService";
import { QuizResult } from "@/types/quiz";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [results, setResults] = useState<QuizResult[]>([]);
  
  useEffect(() => {
    if (user) {
      const userScores = getUserScores(user.id);
      setResults(userScores);
    }
  }, [user]);
  
  const handleClearScores = () => {
    if (user) {
      clearUserScores(user.id);
      setResults([]);
      toast({
        title: "Scores cleared",
        description: "Your quiz history has been deleted.",
      });
    }
  };
  
  // Calculate statistics
  const totalQuizzes = results.length;
  const averageScore = totalQuizzes > 0
    ? Math.round(results.reduce((acc, result) => acc + (result.score / result.totalQuestions * 100), 0) / totalQuizzes)
    : 0;
  
  // Prepare chart data
  const chartData = results.map(result => ({
    name: result.quizTitle,
    score: Math.round(result.score / result.totalQuestions * 100),
  }));
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-muted-foreground">
            Track your quiz progress and performance
          </p>
        </div>
        <Link to="/quizzes">
          <Button>Take a New Quiz</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Quizzes Taken</CardDescription>
            <CardTitle className="text-4xl">{totalQuizzes}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Score</CardDescription>
            <CardTitle className="text-4xl">{averageScore}%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Latest Quiz</CardDescription>
            <CardTitle className="text-xl">
              {results.length > 0 
                ? results[results.length - 1].quizTitle 
                : "No quizzes taken yet"}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="history">Quiz History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Performance</CardTitle>
              <CardDescription>See how you've performed across different quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Take some quizzes to see your performance data!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Quiz History</CardTitle>
                <CardDescription>Your recent quiz attempts</CardDescription>
              </div>
              {results.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">Clear History</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your quiz history. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearScores}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Quiz Title</th>
                        <th className="text-center py-3 px-2">Score</th>
                        <th className="text-center py-3 px-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...results]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((result, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-2">{result.quizTitle}</td>
                            <td className="text-center py-3 px-2">
                              {result.score}/{result.totalQuestions} 
                              ({Math.round((result.score / result.totalQuestions) * 100)}%)
                            </td>
                            <td className="text-center py-3 px-2">
                              {format(parseISO(result.date), "MMM d, yyyy")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No quiz history yet. Take a quiz to see your results here!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
