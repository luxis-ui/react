'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  Input,
  Typography,
  Flex,
  Stack,
  FormControl,
  Checkbox,
  Box,
  InboxIcon,
  EyeIcon
} from '@luxis-ui/react';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { login } from '@/modules/auth/services/auth.service';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.error('Login error:', err);
      setLoading(false);
      setError('Something went wrong');
    }
  };

  return (
    <Box>
      <Typography variant="h2" className="auth-title">Welcome Back</Typography>
      <Typography variant="body1" className="auth-subtitle">Please enter your credentials to sign in.</Typography>

      <form className='mt-4' onSubmit={handleSubmit}>
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

          <FormControl error={error}>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<EyeIcon size={18} />}
              rightIcon={
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <EyeIcon size={18} />
                </Button>
              }
              required
              fullWidth
            />
          </FormControl>

          <Flex justify="between" align="center" style={{ marginTop: 4 }}>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              label="Remember me"
            />
            <Typography variant="body2">
              <Link href="/forgot-password" style={{ color: 'var(--lxs-color-primary-600)', textDecoration: 'none', fontWeight: 500 }}>
                Forgot Password?
              </Link>
            </Typography>
          </Flex>

          <Button type="submit" variant="primary" loading={loading} fullWidth style={{ marginTop: 8 }}>
            Sign In
          </Button>
        </Stack>
      </form>



      <Flex justify="center" style={{ marginTop: 24 }}>
        <Typography variant="body2" style={{ color: 'var(--lxs-color-neutral-500)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: 'var(--lxs-color-primary-600)', textDecoration: 'none', fontWeight: 600 }}>
            Sign Up
          </Link>
        </Typography>
      </Flex>
    </Box>
  );
}
