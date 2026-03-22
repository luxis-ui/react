import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Typography,
  Stack,
  FormControl,
  Box,
  InboxIcon,
  ChevronLeftIcon
} from '@luxis-ui/react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Dummy reset link logic
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <Box style={{ position: 'absolute', top: -48, left: -16 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/login')}
          aria-label="Go back"
        >
          <ChevronLeftIcon size={20} style={{ marginRight: 4 }} />
          Back
        </Button>
      </Box>

      <Typography variant="h2" className="auth-title" style={{ marginTop: 24 }}>Forgot Password</Typography>
      <Typography variant="body1" className="auth-subtitle">Enter your email and we&apos;ll send you a reset link.</Typography>

      {submitted ? (
        <Stack gap="md" align="center">
          <Typography variant="body1" style={{ color: 'var(--lxs-color-success-600)', textAlign: 'center' }}>
            Check your email for a link to reset your password. If it doesn&apos;t appear within a few minutes, check your spam folder.
          </Typography>
          <Button variant="primary" fullWidth onClick={() => navigate('/login')} style={{ marginTop: 16 }}>
            Return to Login
          </Button>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <FormControl>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                leftIcon={<InboxIcon size={18} />}
                required
                fullWidth
              />
            </FormControl>

            <Button type="submit" variant="primary" loading={loading} fullWidth style={{ marginTop: 16 }}>
              Send Reset Link
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
