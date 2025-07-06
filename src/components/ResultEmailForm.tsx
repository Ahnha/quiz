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

const SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY'; // înlocuiește cu key-ul tău

const ResultEmailForm: React.FC<ResultEmailFormProps> = ({ quizTitle, score, resultText, onSent }) => {
    const [email, setEmail] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        setError('');

        if (!captchaToken) {
            setError('Te rugăm să completezi captcha.');
            return;
        }
        if (!email) {
            setError('Te rugăm să introduci un email.');
            return;
        }

        setSending(true);

        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            {
                to_email: email,
                quiz_title: quizTitle,
                quiz_score: score,
                quiz_result: resultText,
            },
            'YOUR_PUBLIC_KEY'
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
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
