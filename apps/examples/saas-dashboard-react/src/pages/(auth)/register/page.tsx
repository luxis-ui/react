import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  EyeIcon,
  UserIcon
} from '@luxis-ui/react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Dummy registration logic
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <Box>
      <Typography variant="h2" className="auth-title">Create Account</Typography>
      <Typography variant="body1" className="auth-subtitle">Sign up to get started with LuxisUI.</Typography>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <FormControl>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Full Name"
              leftIcon={<UserIcon size={18} />}
              required
              fullWidth
            />
          </FormControl>

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

          <FormControl>
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
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              label="I agree to the Terms & Conditions"
              color="primary"
              required
            />
          </Flex>

          <Button type="submit" variant="primary" loading={loading} fullWidth style={{ marginTop: 8 }}>
            Sign Up
          </Button>
        </Stack>
      </form>



      <Flex justify="center" style={{ marginTop: 24 }}>
        <Typography variant="body2" style={{ color: 'var(--lxs-color-neutral-500)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--lxs-color-primary-600)', textDecoration: 'none', fontWeight: 600 }}>
            Log in
          </Link>
        </Typography>
      </Flex>
    </Box>
  );
}
