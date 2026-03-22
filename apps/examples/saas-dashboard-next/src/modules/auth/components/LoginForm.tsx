'use client';

import { useState } from 'react';
import { Button, Input, Card, Typography, Flex } from '@luxis-ui/react';
import { login } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await login(email, password);
      setLoading(false);
      if (result.success && result.data) {
        setAuth(result.data.user, result.data.token);
        router.replace('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong');
    }
  };

  return (
    <Card style={{ maxWidth: 380, margin: '0 auto', padding: 32 }}>
      <Typography variant="h4" style={{ marginBottom: 8 }}>
        Sign in to your account
      </Typography>
      <Typography variant="body2" style={{ color: '#737373', marginBottom: 24 }}>
        Welcome back! Please enter your credentials.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap={16}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoFocus
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && (
            <Typography variant="body2" style={{ color: '#dc2626', marginBottom: 8 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="primary" loading={loading} fullWidth>
            Sign In
          </Button>
        </Flex>
      </form>
      <Flex justify="between" style={{ marginTop: 18 }}>
        <Typography variant="body2" style={{ color: '#737373' }}>
          <a href="#" style={{ textDecoration: 'underline', color: '#6366f1' }}>
            Forgot password?
          </a>
        </Typography>
        <Typography variant="body2" style={{ color: '#737373' }}>
          <a href="#" style={{ textDecoration: 'underline', color: '#6366f1' }}>
            Create account
          </a>
        </Typography>
      </Flex>
    </Card>
  );
}
