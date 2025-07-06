import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';

interface ResultEmailFormProps {
    userEmail: string;
    userName: string;
    quizTitle: string;
    score: number;
    resultText: string;
    onSent: () => void;
}

const SITE_KEY = '6Ld2LnorAAAAAGZEx4BdyxobZF9Ql04R5bZGgp34';

const ResultEmailForm: React.FC<ResultEmailFormProps> = ({ userEmail, userName, quizTitle, score, resultText, onSent }) => {
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
            'service_b0eycgy',
            'template_quiz',
            {
                to_email: userEmail,
                quiz_title: quizTitle,
                quiz_score: score,
                quiz_result: resultText,
                from_page: 'Quiz App',  // label personalizat
                user_name: userName,
            },
            'qpMdCwldZeAqODpQR'
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
                    sitekey={"6Ld2LnorAAAAAGZEx4BdyxobZF9Ql04R5bZGgp34"}
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
