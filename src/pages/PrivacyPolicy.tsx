import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import "../styles/privacyPolicy.css";

/**
 * Privacy Policy Page Component
 *
 * PATTERN: Single Responsibility Principle
 * - Displays comprehensive privacy policy
 * - GDPR compliant information
 * - User rights and data handling
 */
const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();

  const privacyContent = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: December 2024",
      introduction:
        "At Skin Studio, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data in compliance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.",

      sections: [
        {
          title: "Information We Collect",
          content: [
            "Personal information (name, email address) when you complete our quizzes",
            "Quiz responses and results to provide personalized recommendations",
            "Usage data to improve our website and services",
            "Technical information (IP address, browser type) for security purposes",
          ],
        },
        {
          title: "How We Use Your Information",
          content: [
            "Provide personalized skincare recommendations based on quiz results",
            "Send quiz results and reports to your email address",
            "Improve our website functionality and user experience",
            "Ensure website security and prevent fraud",
            "Comply with legal obligations and regulations",
          ],
        },
        {
          title: "Legal Basis for Processing",
          content: [
            "Consent: When you explicitly agree to our data processing",
            "Legitimate Interest: To provide and improve our services",
            "Contract: To fulfill our obligations when you use our services",
            "Legal Obligation: To comply with applicable laws and regulations",
          ],
        },
        {
          title: "Data Sharing and Third Parties",
          content: [
            "We do not sell, trade, or rent your personal information",
            "We may share data with trusted service providers who assist in operating our website",
            "All third-party providers are bound by strict confidentiality agreements",
            "We may disclose information if required by law or to protect our rights",
          ],
        },
        {
          title: "Your Rights Under GDPR",
          content: [
            "Right to Access: Request a copy of your personal data",
            "Right to Rectification: Correct inaccurate or incomplete data",
            "Right to Erasure: Request deletion of your personal data",
            "Right to Restrict Processing: Limit how we use your data",
            "Right to Data Portability: Receive your data in a structured format",
            "Right to Object: Object to processing of your personal data",
            "Right to Withdraw Consent: Withdraw consent at any time",
          ],
        },
        {
          title: "Data Security",
          content: [
            "We implement appropriate technical and organizational security measures",
            "All data is encrypted during transmission and storage",
            "Regular security audits and updates are performed",
            "Access to personal data is strictly controlled and monitored",
          ],
        },
        {
          title: "Data Retention",
          content: [
            "Quiz results are retained for 2 years unless you request deletion",
            "Email addresses are retained until you unsubscribe or request deletion",
            "Technical logs are retained for 90 days for security purposes",
            "You can request deletion of your data at any time",
          ],
        },
        {
          title: "Cookies and Tracking",
          content: [
            "We use cookies to enhance your browsing experience",
            "Necessary cookies are required for website functionality",
            "Analytics cookies help us understand website usage",
            "Marketing cookies are used only with your explicit consent",
            "You can manage cookie preferences through our consent banner",
          ],
        },
        {
          title: "International Data Transfers",
          content: [
            "Your data is processed within the European Economic Area (EEA)",
            "If data is transferred outside the EEA, we ensure adequate protection",
            "We use standard contractual clauses approved by the European Commission",
            "All transfers comply with GDPR requirements",
          ],
        },
        {
          title: "Children's Privacy",
          content: [
            "Our services are not intended for children under 16 years of age",
            "We do not knowingly collect personal information from children under 16",
            "If we become aware of such collection, we will delete the information immediately",
            "Parents or guardians should contact us if they believe we have collected children's data",
          ],
        },
        {
          title: "Changes to This Policy",
          content: [
            "We may update this Privacy Policy from time to time",
            "Significant changes will be communicated via email or website notice",
            "Continued use of our services constitutes acceptance of updated policies",
            "You can review the current policy on this page at any time",
          ],
        },
        {
          title: "Contact Information",
          content: [
            "For privacy-related questions or concerns, please contact us:",
            "Email: privacy@skinstudio.app",
            "Address: [Your Business Address]",
            "Phone: [Your Phone Number]",
            "We will respond to your inquiry within 30 days",
          ],
        },
      ],
    },
    ro: {
      title: "Politica de Confidențialitate",
      lastUpdated: "Ultima actualizare: Decembrie 2024",
      introduction:
        "La Skin Studio, suntem dedicați protejării confidențialității dumneavoastră și asigurării securității informațiilor personale. Această Politică de Confidențialitate explică cum colectăm, utilizăm și protejăm datele dumneavoastră în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) și alte legi aplicabile privind confidențialitatea.",

      sections: [
        {
          title: "Informațiile pe care le colectăm",
          content: [
            "Informații personale (nume, adresă de email) când completați quiz-urile noastre",
            "Răspunsuri și rezultate ale quiz-urilor pentru a oferi recomandări personalizate",
            "Date de utilizare pentru a îmbunătăți site-ul și serviciile noastre",
            "Informații tehnice (adresa IP, tipul browserului) în scopuri de securitate",
          ],
        },
        {
          title: "Cum utilizăm informațiile dumneavoastră",
          content: [
            "Oferim recomandări personalizate de îngrijire a pielii bazate pe rezultatele quiz-urilor",
            "Trimitem rezultatele quiz-urilor și rapoartele pe adresa dumneavoastră de email",
            "Îmbunătățim funcționalitatea site-ului și experiența utilizatorului",
            "Asigurăm securitatea site-ului și prevenim frauda",
            "Respectăm obligațiile legale și reglementările",
          ],
        },
        {
          title: "Baza legală pentru procesare",
          content: [
            "Consimțământ: Când sunteți de acord explicit cu procesarea datelor noastre",
            "Interes legitim: Pentru a oferi și îmbunătăți serviciile noastre",
            "Contract: Pentru a-și îndeplini obligațiile când utilizați serviciile noastre",
            "Obligație legală: Pentru a respecta legile și reglementările aplicabile",
          ],
        },
        {
          title: "Partajarea datelor și terțe părți",
          content: [
            "Nu vindem, nu tranzacționăm și nu închiriem informațiile dumneavoastră personale",
            "Putem partaja date cu furnizori de servicii de încredere care ne ajută să operăm site-ul",
            "Toți furnizorii terți sunt obligați de acorduri stricte de confidențialitate",
            "Putem dezvălui informații dacă este necesar de lege sau pentru a-și proteja drepturile",
          ],
        },
        {
          title: "Drepturile dumneavoastră conform GDPR",
          content: [
            "Dreptul de acces: Solicitați o copie a datelor dumneavoastră personale",
            "Dreptul de rectificare: Corectați datele inexacte sau incomplete",
            "Dreptul la ștergere: Solicitați ștergerea datelor dumneavoastră personale",
            "Dreptul de restricționare a procesării: Limitați modul în care utilizăm datele",
            "Dreptul la portabilitatea datelor: Primiți datele într-un format structurat",
            "Dreptul de opoziție: Vă opuneți procesării datelor personale",
            "Dreptul de retragere a consimțământului: Retrageți consimțământul oricând",
          ],
        },
        {
          title: "Securitatea datelor",
          content: [
            "Implementăm măsuri tehnice și organizatorice de securitate adecvate",
            "Toate datele sunt criptate în timpul transmisiei și stocării",
            "Se efectuează audituri de securitate și actualizări regulate",
            "Accesul la datele personale este strict controlat și monitorizat",
          ],
        },
        {
          title: "Păstrarea datelor",
          content: [
            "Rezultatele quiz-urilor sunt păstrate timp de 2 ani, cu excepția cazului în care solicitați ștergerea",
            "Adresele de email sunt păstrate până când vă dezabonați sau solicitați ștergerea",
            "Jurnalele tehnice sunt păstrate timp de 90 de zile în scopuri de securitate",
            "Puteți solicita ștergerea datelor dumneavoastră oricând",
          ],
        },
        {
          title: "Cookie-uri și urmărire",
          content: [
            "Utilizăm cookie-uri pentru a-și îmbunătăți experiența de navigare",
            "Cookie-urile necesare sunt obligatorii pentru funcționalitatea site-ului",
            "Cookie-urile de analiză ne ajută să înțelegem utilizarea site-ului",
            "Cookie-urile de marketing sunt utilizate doar cu consimțământul explicit",
            "Puteți gestiona preferințele pentru cookie-uri prin banner-ul nostru de consimțământ",
          ],
        },
        {
          title: "Transferuri internaționale de date",
          content: [
            "Datele dumneavoastră sunt procesate în cadrul Zonei Economice Europene (ZEE)",
            "Dacă datele sunt transferate în afara ZEE, asigurăm protecția adecvată",
            "Utilizăm clauze contractuale standard aprobate de Comisia Europeană",
            "Toate transferurile respectă cerințele GDPR",
          ],
        },
        {
          title: "Confidențialitatea copiilor",
          content: [
            "Serviciile noastre nu sunt destinate copiilor sub 16 ani",
            "Nu colectăm în mod intenționat informații personale de la copiii sub 16 ani",
            "Dacă devenim conștienți de o astfel de colectare, vom șterge informațiile imediat",
            "Părinții sau tutorii ar trebui să ne contacteze dacă cred că am colectat date ale copiilor",
          ],
        },
        {
          title: "Modificări ale acestei politici",
          content: [
            "Putem actualiza această Politică de Confidențialitate din când în când",
            "Modificările semnificative vor fi comunicate prin email sau notificare pe site",
            "Utilizarea continuă a serviciilor noastre constituie acceptarea politicilor actualizate",
            "Puteți revizui politica actuală pe această pagină oricând",
          ],
        },
        {
          title: "Informații de contact",
          content: [
            "Pentru întrebări sau nelămuriri legate de confidențialitate, vă rugăm să ne contactați:",
            "Email: privacy@skinstudio.app",
            "Adresă: [Adresa dvs. de afaceri]",
            "Telefon: [Numărul dvs. de telefon]",
            "Vă vom răspunde la întrebarea dumneavoastră în termen de 30 de zile",
          ],
        },
      ],
    },
  };

  const content =
    privacyContent[language as keyof typeof privacyContent] ||
    privacyContent.en;

  return (
    <div className="privacy-policy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
          <h1>{content.title}</h1>
          <p className="last-updated">{content.lastUpdated}</p>
        </div>

        <div className="privacy-content">
          <div className="introduction">
            <p>{content.introduction}</p>
          </div>

          {content.sections.map((section, index) => (
            <div key={index} className="policy-section">
              <h2>{section.title}</h2>
              <ul>
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="contact-section">
            <h2>{content.sections[content.sections.length - 1].title}</h2>
            <div className="contact-info">
              {content.sections[content.sections.length - 1].content
                .slice(1)
                .map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
