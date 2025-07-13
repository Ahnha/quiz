import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/privacyPolicy.css';

const termsContent = {
    en: {
        title: 'Terms of Service',
        lastUpdated: 'Last updated: June 2024',
        introduction: 'Welcome to Skin Studio! By using our website and services, you agree to these Terms of Service. Please read them carefully.',
        sections: [
            {
                title: '1. Acceptance of Terms',
                content: [
                    'By accessing or using Skin Studio, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.'
                ]
            },
            {
                title: '2. Educational Purpose Only',
                content: [
                    'All information and recommendations provided by Skin Studio are for educational and informational purposes only. They do not constitute medical advice. Always consult a qualified healthcare provider or dermatologist for medical concerns.'
                ]
            },
            {
                title: '3. User Responsibilities',
                content: [
                    'You agree to use Skin Studio only for lawful purposes and in accordance with these Terms. You are responsible for the accuracy of the information you provide.'
                ]
            },
            {
                title: '4. Intellectual Property',
                content: [
                    'All content, trademarks, logos, and designs on Skin Studio are the property of the site owner or its licensors. You may not copy, reproduce, or distribute any content without permission.'
                ]
            },
            {
                title: '5. Limitation of Liability',
                content: [
                    'Skin Studio is provided "as is" without warranties of any kind. We are not liable for any damages or losses resulting from your use of the site or reliance on its content.'
                ]
            },
            {
                title: '6. Privacy',
                content: [
                    'Your privacy is important to us. Please review our ',
                    <Link key="privacy" to="/privacy-policy" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Privacy Policy</Link>,
                    ' to understand how we collect, use, and protect your information.'
                ]
            },
            {
                title: '7. Changes to Terms',
                content: [
                    'We may update these Terms from time to time. Continued use of Skin Studio after changes means you accept the new Terms.'
                ]
            },
            {
                title: '8. Governing Law',
                content: [
                    'These Terms are governed by the laws of Romania, without regard to its conflict of law principles.'
                ]
            },
            {
                title: '9. Contact',
                content: [
                    'For questions about these Terms, contact us at ',
                    <a key="email" href="mailto:info@skinstudio.app" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>info@skinstudio.app</a>,
                    '.'
                ]
            }
        ]
    },
    ro: {
        title: 'Termeni și Condiții',
        lastUpdated: 'Ultima actualizare: Iunie 2024',
        introduction: 'Bine ai venit la Skin Studio! Prin utilizarea site-ului și serviciilor noastre, ești de acord cu acești Termeni și Condiții. Te rugăm să îi citești cu atenție.',
        sections: [
            {
                title: '1. Acceptarea Termenilor',
                content: [
                    'Prin accesarea sau utilizarea Skin Studio, ești de acord cu acești Termeni și cu Politica noastră de Confidențialitate. Dacă nu ești de acord, te rugăm să nu folosești serviciile noastre.'
                ]
            },
            {
                title: '2. Scop Exclusiv Educațional',
                content: [
                    'Toate informațiile și recomandările oferite de Skin Studio sunt doar în scop educațional și informativ. Nu constituie sfaturi medicale. Consultă întotdeauna un medic sau dermatolog pentru probleme medicale.'
                ]
            },
            {
                title: '3. Responsabilitățile Utilizatorului',
                content: [
                    'Ești de acord să folosești Skin Studio doar în scopuri legale și în conformitate cu acești Termeni. Ești responsabil pentru acuratețea informațiilor furnizate.'
                ]
            },
            {
                title: '4. Proprietate Intelectuală',
                content: [
                    'Tot conținutul, mărcile, logo-urile și designurile Skin Studio aparțin proprietarului site-ului sau licențiatorilor săi. Nu ai voie să copiezi, reproduci sau distribui conținut fără permisiune.'
                ]
            },
            {
                title: '5. Limitarea Răspunderii',
                content: [
                    'Skin Studio este oferit "ca atare", fără garanții de niciun fel. Nu suntem răspunzători pentru daune sau pierderi rezultate din utilizarea site-ului sau din încrederea acordată conținutului.'
                ]
            },
            {
                title: '6. Confidențialitate',
                content: [
                    'Confidențialitatea ta este importantă pentru noi. Te rugăm să consulți ',
                    <Link key="privacy" to="/privacy-policy" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Politica de Confidențialitate</Link>,
                    ' pentru a înțelege cum colectăm, folosim și protejăm datele tale.'
                ]
            },
            {
                title: '7. Modificarea Termenilor',
                content: [
                    'Putem actualiza acești Termeni periodic. Continuarea utilizării Skin Studio după modificări înseamnă că accepți noii Termeni.'
                ]
            },
            {
                title: '8. Legea Aplicabilă',
                content: [
                    'Acești Termeni sunt guvernați de legile României, fără a ține cont de principiile privind conflictul de legi.'
                ]
            },
            {
                title: '9. Contact',
                content: [
                    'Pentru întrebări despre acești Termeni, scrie-ne la ',
                    <a key="email" href="mailto:info@skinstudio.app" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>info@skinstudio.app</a>,
                    '.'
                ]
            }
        ]
    }
};

const TermsOfService: React.FC = () => {
    const { language } = useLanguage();
    const content = termsContent[language] || termsContent.en;

    return (
        <div className="privacy-policy-page">
            <div className="privacy-container">
                <div className="privacy-header">
                    <Link to="/" className="back-link">← {language === 'ro' ? 'Înapoi la Acasă' : 'Back to Home'}</Link>
                    <h1>{content.title}</h1>
                    <p className="last-updated">{content.lastUpdated}</p>
                </div>
                <div className="privacy-content">
                    <div className="introduction">
                        <p>{content.introduction}</p>
                    </div>
                    {content.sections.map((section, idx) => (
                        <div key={idx} className="policy-section">
                            <h2>{section.title}</h2>
                            <ul>
                                {section.content.map((item, itemIdx) => (
                                    <li key={itemIdx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TermsOfService; 