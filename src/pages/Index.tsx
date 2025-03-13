
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Hero section */}
      <section className="bg-quiz-gradient py-16 text-white">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Test Your Knowledge with QuizQuest
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl animate-slide-up">
            Challenge yourself with fun quizzes across various topics and track your progress!
          </p>
          <div className="flex gap-4 animate-slide-up">
            <Link to="/quizzes">
              <Button size="lg" className="bg-white text-quiz-primary hover:bg-white/90">
                Explore Quizzes <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {!isSignedIn && (
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Sign Up to Save Scores
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose QuizQuest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-quiz-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Diverse Quiz Topics</h3>
              <p>From science to history, geography to pop culture - find quizzes on topics you love!</p>
            </div>
            <div className="bg-quiz-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Track Your Progress</h3>
              <p>See your scores over time and identify areas where you can improve your knowledge.</p>
            </div>
            <div className="bg-quiz-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Challenge Friends</h3>
              <p>Compare scores with friends and see who can achieve the highest rankings!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-quiz-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Test Your Knowledge?</h2>
          <Link to="/quizzes">
            <Button size="lg" className="bg-quiz-primary hover:bg-quiz-primary/90">
              Start Quizzing Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
