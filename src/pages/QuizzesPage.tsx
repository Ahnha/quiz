import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useScrollToTop } from "../hooks/useScrollToTop";
import SEO from "../components/SEO";
import Navbar from "./components/Navbar";
import AppFooter from "../components/AppFooter";
import { quizzes } from "../quiz/quizzes";
import "../styles/global.css";
import "../styles/quiz.css";

/**
 * Helper function to get localized text
 */
const getLocalizedText = (
  text: string | { ro: string; en: string },
  language: "en" | "ro",
): string => {
  if (typeof text === "string") {
    return text;
  }
  return text[language];
};

// Modern SVG Icons for each quiz type
const QuizIcons = {
  "skin-type": (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="quiz-icon-circle"
      />
      <path
        d="M12 16C12 13.7909 13.7909 12 16 12H24C26.2091 12 28 13.7909 28 16V24C28 26.2091 26.2091 28 24 28H16C13.7909 28 12 26.2091 12 24V16Z"
        fill="currentColor"
        className="quiz-icon-fill"
      />
      <circle cx="16" cy="18" r="1.5" fill="white" />
      <circle cx="24" cy="18" r="1.5" fill="white" />
      <path
        d="M16 22C16 22 18 24 20 24C22 24 24 22 24 22"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  "non-toxic-lifestyle": (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 8C20 8 24 12 24 16C24 20 20 24 20 24C20 24 16 20 16 16C16 12 20 8 20 8Z"
        fill="currentColor"
        className="quiz-icon-fill"
      />
      <path
        d="M20 12C20 12 22 14 22 16C22 18 20 20 20 20C20 20 18 18 18 16C18 14 20 12 20 12Z"
        fill="white"
      />
      <path
        d="M12 28C12 28 16 32 20 32C24 32 28 28 28 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="quiz-icon-stroke"
      />
    </svg>
  ),
  "aging-assessment": (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="quiz-icon-circle"
      />
      <path
        d="M20 8V20L26 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="quiz-icon-stroke"
      />
      <circle
        cx="20"
        cy="20"
        r="2"
        fill="currentColor"
        className="quiz-icon-fill"
      />
    </svg>
  ),
};

const QuizzesPage: React.FC = () => {
  const { t, language } = useLanguage();

  // Auto scroll to top when navigating to quizzes page
  useScrollToTop();

  return (
    <div className="quiz-page-futuristic">
      <SEO
        title="Skin Type Quiz - Discover Your Perfect Natural Skincare Routine | Skin Studio"
        description="Take our comprehensive skin type quiz to discover your perfect natural skincare routine. Get personalized recommendations for natural beauty products based on your skin concerns and lifestyle."
        keywords="skin type quiz, skincare quiz, natural skincare routine, skin analysis, beauty quiz, personalized skincare, skin concerns, natural beauty products, skincare recommendations"
        url="/quiz"
      />

      <Navbar />

      <main className="quiz-main">
        <div className="container-futuristic">
          <div className="quiz-header">
            <h1 className="quiz-title">{t.quiz.title}</h1>
            <p className="quiz-subtitle">{t.quiz.subtitle}</p>
          </div>

          <div className="quiz-grid">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/quiz/${quiz.id}`}
                className="quiz-card glass-card"
                style={{ textDecoration: "none" }}
              >
                <div className="quiz-card-header">
                  <div className="quiz-icon">
                    <div className="icon-circle">
                      {QuizIcons[quiz.id as keyof typeof QuizIcons]}
                    </div>
                  </div>
                  <h3 className="quiz-name">
                    {getLocalizedText(quiz.title, language)}
                  </h3>
                </div>

                <p className="quiz-description">
                  {getLocalizedText(quiz.description, language)}
                </p>

                <div className="quiz-meta">
                  <span className="quiz-duration">
                    {quiz.questions.length} {t.quiz.questions}
                  </span>
                  <span className="quiz-time">{t.quiz.minutes}</span>
                </div>

                <div className="btn-minimal primary">{t.quiz.startQuiz}</div>
              </Link>
            ))}
          </div>

          <div className="quiz-info">
            <div className="info-card glass-card">
              <h3>{t.quiz.whyTakeQuiz.title}</h3>
              <ul>
                {t.quiz.whyTakeQuiz.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Medical Disclaimer Section */}
      <section className="medical-disclaimer-section">
        <div className="container-futuristic">
          <div className="medical-disclaimer-content">
            <div className="medical-disclaimer-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="medical-disclaimer-text">
              <h3>{t.quiz.medicalDisclaimer?.title || "Medical Disclaimer"}</h3>
              <p>
                {t.quiz.medicalDisclaimer?.text ||
                  "This information is based on my own research and does not represent medical advice. Always consult with a qualified healthcare provider or dermatologist for medical concerns."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default QuizzesPage;
