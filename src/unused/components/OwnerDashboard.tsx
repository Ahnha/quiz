import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { SecurityUtils, ErrorLogger } from "../../config/security";
import "../../styles/ownerDashboard.css";

interface QuizResultData {
  id: string;
  timestamp: string;
  quizName: string;
  score: number;
  result: string;
  userEmail: string;
  sendToOwner: boolean;
}

/**
 * Owner Dashboard Component
 *
 * PATTERN: Single Responsibility Principle
 * - Manages quiz results display and filtering
 * - Handles data export and owner notifications
 *
 * PATTERN: Security First
 * - Secure data handling and validation
 * - Input sanitization and error handling
 */
const OwnerDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [results, setResults] = useState<QuizResultData[]>([]);
  const [filteredResults, setFilteredResults] = useState<QuizResultData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("all");

  useEffect(() => {
    // Load results from localStorage using secure utilities
    const storedResults = SecurityUtils.safeLocalStorageGet("quizResults", []);

    // Validate and filter out invalid results
    const validResults = storedResults.filter(
      (result: any) =>
        result &&
        typeof result === "object" &&
        SecurityUtils.isValidEmail(result.userEmail) &&
        SecurityUtils.isValidQuizScore(result.score) &&
        typeof result.quizName === "string" &&
        typeof result.result === "string",
    );

    setResults(validResults);
    setFilteredResults(validResults);
  }, []);

  useEffect(() => {
    let filtered = results;

    // Filter by search term with sanitization
    if (searchTerm) {
      const sanitizedSearch =
        SecurityUtils.sanitizeInput(searchTerm).toLowerCase();
      filtered = filtered.filter(
        (result) =>
          result.userEmail.toLowerCase().includes(sanitizedSearch) ||
          result.quizName.toLowerCase().includes(sanitizedSearch) ||
          result.result.toLowerCase().includes(sanitizedSearch),
      );
    }

    // Filter by quiz type
    if (selectedQuiz !== "all") {
      filtered = filtered.filter((result) => result.quizName === selectedQuiz);
    }

    setFilteredResults(filtered);
  }, [results, searchTerm, selectedQuiz]);

  const downloadAllResults = () => {
    try {
      const dataStr = JSON.stringify(filteredResults, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `all-quiz-results-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      ErrorLogger.log(error as Error, "Download All Results");
    }
  };

  const downloadSingleResult = (result: QuizResultData) => {
    try {
      const dataStr = JSON.stringify(result, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `quiz-result-${result.quizName.toLowerCase().replace(/\s+/g, "-")}-${result.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      ErrorLogger.log(error as Error, "Download Single Result");
    }
  };

  const getUniqueQuizNames = (): string[] => {
    const names = results.map((result) => result.quizName);
    return Array.from(new Set(names)).sort();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = SecurityUtils.sanitizeInput(e.target.value);
    setSearchTerm(sanitizedValue);
  };

  const handleQuizFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuiz(e.target.value);
  };

  return (
    <div className="owner-dashboard">
      <div className="dashboard-header glass-card">
        <h1>📊 {t.ownerDashboard?.title || "Quiz Results Dashboard"}</h1>
        <p>
          {t.ownerDashboard?.subtitle || "View and download all quiz results"}
        </p>
      </div>

      <div className="dashboard-controls glass-card">
        <div className="search-filters">
          <input
            type="text"
            placeholder={
              t.ownerDashboard?.searchPlaceholder ||
              "Search by email, quiz, or result..."
            }
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={selectedQuiz}
            onChange={handleQuizFilterChange}
            className="quiz-filter"
          >
            <option value="all">
              {t.ownerDashboard?.allQuizzes || "All Quizzes"}
            </option>
            {getUniqueQuizNames().map((quizName) => (
              <option key={quizName} value={quizName}>
                {quizName}
              </option>
            ))}
          </select>
          <button
            onClick={downloadAllResults}
            className="btn-minimal primary"
            disabled={filteredResults.length === 0}
          >
            📥 {t.ownerDashboard?.downloadAll || "Download All"}
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-number">{results.length}</span>
            <span className="stat-label">
              {t.ownerDashboard?.totalResults || "Total Results"}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{filteredResults.length}</span>
            <span className="stat-label">
              {t.ownerDashboard?.filteredResults || "Filtered Results"}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{getUniqueQuizNames().length}</span>
            <span className="stat-label">
              {t.ownerDashboard?.uniqueQuizzes || "Unique Quizzes"}
            </span>
          </div>
        </div>
      </div>

      <div className="results-container">
        {filteredResults.length === 0 ? (
          <div className="no-results glass-card">
            <h3>{t.ownerDashboard?.noResults || "No Results Found"}</h3>
            <p>
              {t.ownerDashboard?.noResultsSubtitle ||
                "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          filteredResults.map((result) => (
            <div key={result.id} className="result-card glass-card">
              <div className="result-header">
                <div className="result-info">
                  <h3>{result.quizName}</h3>
                  <p className="result-email">{result.userEmail}</p>
                  <p className="result-date">
                    {new Date(result.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="result-score">
                  <span className="score-number">{result.score}</span>
                  <span className="score-label">
                    {t.ownerDashboard?.score || "Score"}
                  </span>
                </div>
              </div>

              <div className="result-content">
                <p className="result-text">{result.result}</p>
              </div>

              <div className="result-actions">
                <button
                  className="btn-minimal secondary"
                  onClick={() => downloadSingleResult(result)}
                >
                  📥 {t.ownerDashboard?.download || "Download"}
                </button>
                {result.sendToOwner && (
                  <span className="owner-flag">
                    📧 {t.ownerDashboard?.sentToOwner || "Sent to Owner"}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
