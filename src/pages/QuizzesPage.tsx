import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollToTop } from '../hooks/useScrollToTop';
import SEO from '../components/SEO';
import Navbar from './components/Navbar';
import AppFooter from '../components/AppFooter';
import { quizzes } from '../quiz/quizzes';
import '../styles/global.css';
import '../styles/quiz.css';

/**
 * Helper function to get localized text
 */
const getLocalizedText = (text: string | { ro: string; en: string }, language: 'en' | 'ro'): string => {
    if (typeof text === 'string') {
        return text;
    }
    return text[language];
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
                        <p className="quiz-subtitle">
                            {t.quiz.subtitle}
                        </p>
                    </div>

                    <div className="quiz-grid">
                        {quizzes.map((quiz) => (
                            <Link key={quiz.id} to={`/quiz/${quiz.id}`} className="quiz-card glass-card" style={{ textDecoration: 'none' }}>
                                <div className="quiz-card-header">
                                    <div className="quiz-icon">
                                        <div className="icon-circle">{quiz.icon}</div>
                                    </div>
                                    <h3 className="quiz-name">{getLocalizedText(quiz.title, language)}</h3>
                                </div>

                                <p className="quiz-description">{getLocalizedText(quiz.description, language)}</p>

                                <div className="quiz-meta">
                                    <span className="quiz-duration">
                                        ⏱️ {quiz.questions.length} {t.quiz.questions}
                                    </span>
                                    <span className="quiz-time">{t.quiz.minutes}</span>
                                </div>

                                <div className="btn-minimal primary">
                                    {t.quiz.startQuiz}
                                </div>
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
                        <div className="medical-disclaimer-icon">⚠️</div>
                        <div className="medical-disclaimer-text">
                            <h3>{t.quiz.medicalDisclaimer?.title || '⚠️ Medical Disclaimer'}</h3>
                            <p>{t.quiz.medicalDisclaimer?.text || 'This information is based on my own research and does not represent medical advice. Always consult with a qualified healthcare provider or dermatologist for medical concerns.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            <AppFooter />
        </div>
    );
};

export default QuizzesPage;
