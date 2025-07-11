import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import Navbar from './components/Navbar';
import AppFooter from '../components/AppFooter';
import { quizzes } from '../quiz/quizzes';
import '../styles/global.css';
import '../styles/quiz.css';

const QuizzesPage: React.FC = () => {
    const { t } = useLanguage();

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
                        <p className="quiz-subtitle">
                            {t.quiz.subtitle}
                        </p>
                    </div>

                    <div className="quiz-grid">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="quiz-card glass-card">
                                <div className="quiz-card-header">
                                    <div className="quiz-icon">
                                        <div className="icon-circle">{quiz.icon}</div>
                                    </div>
                                    <h3 className="quiz-name">{quiz.title}</h3>
                                </div>

                                <p className="quiz-description">{quiz.description}</p>

                                <div className="quiz-meta">
                                    <span className="quiz-duration">
                                        ⏱️ {quiz.questions.length} {t.quiz.questions}
                                    </span>
                                    <span className="quiz-time">{t.quiz.minutes}</span>
                                </div>

                                <Link to={`/quiz/${quiz.id}`} className="btn-minimal primary">
                                    {t.quiz.startQuiz}
                                </Link>
                            </div>
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

            <AppFooter />
        </div>
    );
};

export default QuizzesPage;
