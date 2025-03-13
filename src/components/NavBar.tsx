
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

const NavBar = () => {
  const { isSignedIn } = useUser();
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-quiz-gradient bg-clip-text text-2xl font-bold text-transparent">
            QuizQuest
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/quizzes" className="text-foreground/70 hover:text-foreground">
            Quizzes
          </Link>
          {isSignedIn && (
            <Link to="/dashboard" className="text-foreground/70 hover:text-foreground">
              Dashboard
            </Link>
          )}
          <div className="flex items-center gap-2">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
