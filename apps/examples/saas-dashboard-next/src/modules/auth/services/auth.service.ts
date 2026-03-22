export interface LoginResult {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string;
      role?: string;
    };
    token: string;
  };
}

/**
 * Simulated login function.
 * Accepts only email: admin@luxisui.com, password: admin
 */
export function login(email: string, password: string): Promise<LoginResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: '1',
              name: 'Admin User',
              email: 'admin@luxisui.com',
              avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
              role: 'admin',
            },
            token: 'mock-token-123',
          },
        });
    }, 700);
  });
}
