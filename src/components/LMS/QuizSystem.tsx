import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
}

const sampleQuiz: Quiz = {
  id: '1',
  title: 'Yoga Fundamentals Assessment',
  description: 'Test your understanding of basic yoga principles and poses.',
  passingScore: 70,
  questions: [
    {
      id: '1',
      question: 'What is the primary focus of Hatha Yoga?',
      options: [
        'Fast-paced flowing movements',
        'Physical postures and breathing',
        'Meditation only',
        'Chanting and mantras'
      ],
      correctAnswer: 1,
      explanation: 'Hatha Yoga focuses on physical postures (asanas) and breathing techniques (pranayama) to prepare the body for meditation.'
    },
    {
      id: '2',
      question: 'Which breathing technique is commonly used in yoga?',
      options: [
        'Chest breathing',
        'Shallow breathing',
        'Ujjayi breathing',
        'Mouth breathing'
      ],
      correctAnswer: 2,
      explanation: 'Ujjayi breathing, also known as "ocean breath," is a fundamental breathing technique in yoga that helps maintain focus and calm.'
    },
    {
      id: '3',
      question: 'What does "Namaste" traditionally mean?',
      options: [
        'Hello and goodbye',
        'The light in me honors the light in you',
        'Good luck',
        'Thank you for the practice'
      ],
      correctAnswer: 1,
      explanation: 'Namaste is a Sanskrit greeting that means "the divine in me honors the divine in you," representing respect and recognition of our shared humanity.'
    },
    {
      id: '4',
      question: 'In which pose should you never force or strain?',
      options: [
        'Only advanced poses',
        'Only beginner poses',
        'All yoga poses',
        'Only balancing poses'
      ],
      correctAnswer: 2,
      explanation: 'You should never force or strain in any yoga pose. Yoga is about listening to your body and practicing with awareness and respect for your limits.'
    },
    {
      id: '5',
      question: 'What is the recommended frequency for beginners to practice yoga?',
      options: [
        'Once a month',
        '2-3 times per week',
        'Every day for 2 hours',
        'Only on weekends'
      ],
      correctAnswer: 1,
      explanation: 'For beginners, practicing yoga 2-3 times per week allows the body to adapt gradually while building strength and flexibility safely.'
    }
  ]
};

export default function QuizSystem() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = sampleQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex
    });
  };

  const goToNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const score = calculateScore();
  const passed = score >= sampleQuiz.passingScore;

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <Award className="h-10 w-10 text-green-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>
          
          <h1 className="text-3xl font-heading font-semibold text-stone-800 mb-4">
            Quiz {passed ? 'Completed!' : 'Results'}
          </h1>
          
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <p className="font-body text-stone-600">
              You scored {score}% ({sampleQuiz.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length} out of {sampleQuiz.questions.length} correct)
            </p>
          </div>
          
          {passed ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-heading font-semibold text-green-800 mb-2">
                Congratulations! 🎉
              </h3>
              <p className="font-body text-green-700">
                You've successfully passed the quiz with a score of {score}%. 
                You can now proceed to the next lesson or course module.
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-heading font-semibold text-red-800 mb-2">
                Keep Learning! 📚
              </h3>
              <p className="font-body text-red-700">
                You need {sampleQuiz.passingScore}% to pass. Review the course material and try again when you're ready.
              </p>
            </div>
          )}
          
          {/* Detailed Results */}
          <div className="text-left mb-8">
            <h3 className="text-xl font-heading font-semibold text-stone-800 mb-4">Review Your Answers</h3>
            <div className="space-y-4">
              {sampleQuiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className={`border rounded-xl p-4 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-body font-medium text-stone-800 mb-2">
                          Question {index + 1}: {question.question}
                        </h4>
                        <p className="font-body text-sm text-stone-600 mb-2">
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="font-body text-sm text-green-700 mb-2">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="font-body text-sm text-stone-600 italic">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="flex items-center justify-center space-x-2 bg-stone-600 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-stone-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
            {passed && (
              <button className="flex items-center justify-center space-x-2 bg-sage-600 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-sage-700 transition-colors">
                <span>Continue to Next Lesson</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quiz Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-heading font-semibold text-stone-800 mb-4">
          {sampleQuiz.title}
        </h1>
        <p className="font-body text-stone-600 mb-6">
          {sampleQuiz.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-body text-stone-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {sampleQuiz.questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / sampleQuiz.questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-sage-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / sampleQuiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-heading font-semibold text-stone-800 mb-6">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                selectedAnswers[currentQuestion.id] === index
                  ? 'border-sage-600 bg-sage-50'
                  : 'border-gray-200 hover:border-sage-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion.id] === index
                    ? 'border-sage-600 bg-sage-600'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-body text-stone-700">{option}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 border border-gray-300 text-stone-700 rounded-lg font-body font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={goToNextQuestion}
            disabled={selectedAnswers[currentQuestion.id] === undefined}
            className="px-6 py-3 bg-sage-600 text-white rounded-lg font-body font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{isLastQuestion ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}