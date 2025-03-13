
import { Quiz } from "@/types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Basic Geography",
    description: "Test your knowledge of world geography with these basic questions!",
    category: "Geography",
    image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ybGQlMjBtYXB8ZW58MHx8MHx8fDA%3D",
    questions: [
      {
        id: "geo-1",
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        id: "geo-2",
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
      },
      {
        id: "geo-3",
        question: "What is the longest river in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correctAnswer: "Nile"
      },
      {
        id: "geo-4",
        question: "Which country has the largest population?",
        options: ["India", "United States", "China", "Indonesia"],
        correctAnswer: "China"
      },
      {
        id: "geo-5",
        question: "On which continent is the Sahara Desert located?",
        options: ["Asia", "Africa", "South America", "Australia"],
        correctAnswer: "Africa"
      }
    ]
  },
  {
    id: "2",
    title: "Science Trivia",
    description: "Challenge yourself with these science questions covering various fields!",
    category: "Science",
    image: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    questions: [
      {
        id: "sci-1",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Au", "Ag", "Gd"],
        correctAnswer: "Au"
      },
      {
        id: "sci-2",
        question: "What is the hardest natural substance on Earth?",
        options: ["Ruby", "Diamond", "Quartz", "Titanium"],
        correctAnswer: "Diamond"
      },
      {
        id: "sci-3",
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correctAnswer: "Mars"
      },
      {
        id: "sci-4",
        question: "What is the largest organ in the human body?",
        options: ["Brain", "Liver", "Lungs", "Skin"],
        correctAnswer: "Skin"
      },
      {
        id: "sci-5",
        question: "What force keeps us on the ground?",
        options: ["Electromagnetic Force", "Nuclear Force", "Gravity", "Friction"],
        correctAnswer: "Gravity"
      }
    ]
  },
  {
    id: "3",
    title: "History Knowledge",
    description: "Journey through time with these historical questions!",
    category: "History",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yeXxlbnwwfHwwfHx8MA%3D%3D",
    questions: [
      {
        id: "hist-1",
        question: "In which year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        correctAnswer: "1945"
      },
      {
        id: "hist-2",
        question: "Who was the first Emperor of Rome?",
        options: ["Julius Caesar", "Augustus", "Nero", "Constantine"],
        correctAnswer: "Augustus"
      },
      {
        id: "hist-3",
        question: "Which civilization built Machu Picchu?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        correctAnswer: "Inca"
      },
      {
        id: "hist-4",
        question: "Who painted the Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        correctAnswer: "Leonardo da Vinci"
      },
      {
        id: "hist-5",
        question: "What was the name of the first artificial satellite launched into space?",
        options: ["Explorer 1", "Sputnik 1", "Vostok 1", "Apollo 1"],
        correctAnswer: "Sputnik 1"
      }
    ]
  }
];

export const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === id);
};
