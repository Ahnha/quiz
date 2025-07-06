import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';

interface ResultEmailFormProps {
    quizTitle: string;
    score: number;
    resultText: string;
    onSent: () => void;
}

const SITE_KEY = '6Ld2LnorAAAAAGZEx4BdyxobZF9Ql04R5bZGgp34'; // Cheia ta reală de reCAPTCHA

const ResultEmailForm: React.FC<ResultEmailFormProps> = ({ quizTitle, score, resultText, onSent }) => {
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        setError('');

        if (!captchaToken) {
            setError('Te rugăm să completezi captcha.');
            return;
        }
        if (!userEmail) {
            setError('Te rugăm să introduci un email.');
            return;
        }
        if (!userName) {
            setError('Te rugăm să introduci numele tău.');
            return;
        }

        setSending(true);

        emailjs.send(
            'service_b0eycgy',     // Service ID EmailJS
            'template_quiz',       // Template ID EmailJS
            {
                to_email: userEmail,
                quiz_title: quizTitle,
                quiz_score: score,
                quiz_result: resultText,
                from_page: 'Quiz App',
                user_name: userName,
            },
            'qpMdCwldZeAqODpQR'    // Public key EmailJS
        ).then(() => {
            onSent();
        }).catch((e) => {
            setError('A apărut o eroare la trimiterea emailului.');
            console.error(e);
        }).finally(() => {
            setSending(false);
        });
    };

    return (
        <Box textAlign="center">
            <Typography variant="h6" mb={2}>
                Trimite rezultatul pe email
            </Typography>
            <TextField
                label="Numele tău"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="center" mb={2}>
                <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                />
            </Box>
            {error && <Typography color="error" mb={2}>{error}</Typography>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={sending}
            >
                Trimite
            </Button>
        </Box>
    );
};

export default ResultEmailForm;
