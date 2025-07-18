export interface User {
  id: string;
  email: string;
  accessToken: string;
  isAccountPendingVerification?: boolean;
}

export interface AuthResponse {
  message?: string;
  accessToken?: string;
  isAccountCreated?: boolean;
  isAccountPendingVerification?: boolean;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

// Use direct API calls to happyadda.com
const API_BASE_URL = 'https://api.happyadda.com/api';

class AuthService {
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Check for stored auth data on initialization
    this.initializeAuth();
  }

  private initializeAuth() {
    try {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');

      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);
        this.user = {
          ...userData,
          accessToken: storedToken,
        };
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear invalid stored data
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.user));
  }

  private setUser(user: User | null) {
    this.user = user;
    if (user) {
      localStorage.setItem(
        'auth_user',
        JSON.stringify({
          id: user.id,
          email: user.email,
          isAccountPendingVerification: user.isAccountPendingVerification,
        })
      );
      localStorage.setItem('auth_token', user.accessToken);
    } else {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
    this.notifyListeners();
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    // Immediately call with current state
    callback(this.user);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  private async makeRequest(
    endpoint: string,
    data: any,
    method: string = 'POST'
  ): Promise<Response> {
    const url = `${API_BASE_URL}/${endpoint}`;
    console.log(`Making ${method} request to: ${url}`);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(`Response status: ${response.status}`);
      return response;
    } catch (error) {
      console.error(`Network error for ${endpoint}:`, error);

      // Check if it's a CORS error
      if (
        error instanceof TypeError &&
        error.message.includes('Failed to fetch')
      ) {
        throw new Error(
          'Network error: Unable to connect to the server. Please check your internet connection and try again.'
        );
      }

      throw error;
    }
  }

  async signIn(
    email: string,
    password: string
  ): Promise<{ data: { user: User } | null; error: Error | null }> {
    try {
      console.log('Attempting to sign in with email:', email);

      const response = await this.makeRequest('auth/login', {
        email,
        password,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          'Login failed with status:',
          response.status,
          'Error:',
          errorText
        );

        if (response.status === 401) {
          throw new Error('Invalid email or password');
        }
        if (response.status === 404) {
          throw new Error('No account found with this email address');
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }

        throw new Error(`Login failed: ${response.statusText}`);
      }

      const data: AuthResponse = await response.json();
      console.log('Login response:', data);

      console.log(
        `the account verification boolean is ${data.isAccountPendingVerification}`
      );

      // Handle case where account is pending verification
      if (data.isAccountPendingVerification) {
        // throw new Error(
        //   'Your account is pending verification. Please check your email and verify your account before signing in.'
        // );
      }

      if (!data.accessToken) {
        throw new Error('Login failed - no access token received');
      }

      // Create user object
      const user: User = {
        id: this.generateUserId(email),
        email,
        accessToken: data.accessToken,
        isAccountPendingVerification: false,
      };

      this.setUser(user);
      console.log('Login successful for user:', email);
      return { data: { user }, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error: error as Error };
    }
  }

  async signUp(
    email: string,
    password: string
  ): Promise<{ data: { user: User } | null; error: Error | null }> {
    try {
      console.log('Attempting to sign up with email:', email);

      const response = await this.makeRequest('auth/createAccount', {
        email,
        password,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          'Sign up failed with status:',
          response.status,
          'Error:',
          errorText
        );

        if (response.status === 409 || response.status === 400) {
          throw new Error('An account with this email already exists');
        }
        if (response.status === 404) {
          throw new Error('Sign up service not found. Please contact support.');
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }

        throw new Error(`Sign up failed: ${response.statusText}`);
      }

      const data: AuthResponse = await response.json();
      console.log('Sign up response:', data);

      if (data.message !== 'success') {
        throw new Error('Account creation failed');
      }

      // According to API docs, account is created but pending verification
      // No access token is provided at this stage
      if (data.isAccountPendingVerification) {
        // Don't set user in auth state since they need to verify first
        return {
          data: null,
          error: new Error(
            'Account created successfully! Please check your email and click the verification link to activate your account.'
          ),
        };
      }

      // If for some reason we get an access token immediately, set the user
      if (data.accessToken) {
        const user: User = {
          id: this.generateUserId(email),
          email,
          accessToken: data.accessToken,
          isAccountPendingVerification: false,
        };

        this.setUser(user);
        return { data: { user }, error: null };
      }

      // Default case - account created but needs verification
      return {
        data: null,
        error: new Error(
          'Account created successfully! Please check your email and click the verification link to activate your account.'
        ),
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: error as Error };
    }
  }

  async verifyAccount(
    verificationToken: string
  ): Promise<{ data: { user: User } | null; error: Error | null }> {
    try {
      console.log('Attempting to verify account with token');

      const response = await this.makeRequest('auth/verifyAccount', {
        VerificationToken: verificationToken,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          'Account verification failed with status:',
          response.status,
          'Error:',
          errorText
        );

        if (response.status === 400) {
          throw new Error('Invalid or expired verification token');
        }
        if (response.status === 404) {
          throw new Error('Verification token not found');
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }

        throw new Error(`Account verification failed: ${response.statusText}`);
      }

      const data: AuthResponse = await response.json();
      console.log('Account verification response:', data);

      if (data.message !== 'success' || !data.accessToken) {
        throw new Error('Account verification failed');
      }

      // We don't have the email from the token, so we'll need to get it from somewhere
      // For now, we'll use a placeholder - in a real app, the API should return user info
      const user: User = {
        id: 'verified_user_' + Date.now(),
        email: 'verified@user.com', // This should come from the API response
        accessToken: data.accessToken,
        isAccountPendingVerification: false,
      };

      this.setUser(user);
      console.log('Account verification successful');
      return { data: { user }, error: null };
    } catch (error) {
      console.error('Account verification error:', error);
      return { data: null, error: error as Error };
    }
  }

  async signOut(): Promise<{ error: Error | null }> {
    try {
      console.log('Signing out user');
      this.setUser(null);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async resetPassword(
    email: string
  ): Promise<{ data: any; error: Error | null }> {
    try {
      console.log('Requesting password reset for email:', email);

      const response = await this.makeRequest('auth/request-password-reset', {
        email,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          'Password reset request failed with status:',
          response.status,
          'Error:',
          errorText
        );

        if (response.status === 404) {
          throw new Error('No account found with this email address');
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }

        throw new Error(`Password reset failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Password reset response:', data);

      return { data, error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      return { data: null, error: error as Error };
    }
  }

  async processPasswordReset(
    resetToken: string,
    password: string
  ): Promise<{ data: any; error: Error | null }> {
    try {
      console.log(
        'Processing password reset with token:',
        resetToken.substring(0, 15) + '...'
      );
      console.log('New password length:', password.length);

      console.log('Payload being sent to API:', {
        resetToken,
        password,
      });
      console.log('Making PATCH request to auth/request-password-reset');

      const response = await this.makeRequest(
        'auth/request-password-reset',
        { resetToken: resetToken, password },
        'PATCH'
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Password reset failed - Status: ${response.status}, Response: ${errorText}`
        );

        if (response.status === 400 || response.status === 401) {
          throw new Error(
            'Invalid or expired reset token. Please request a new password reset link from your email.'
          );
        }
        if (response.status === 404) {
          throw new Error(
            'Reset token not found. Please request a new password reset link.'
          );
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }

        // Try to parse error message from response
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(
            errorData.message ||
              errorData.error ||
              `Password reset failed: ${response.statusText}`
          );
        } catch {
          throw new Error(
            `Password reset failed: ${errorText || response.statusText}`
          );
        }
      }

      const data = await response.json();
      console.log('Password reset successful:', data);

      return { data, error: null };
    } catch (error) {
      console.error('Password reset processing error:', error);
      return { data: null, error: error as Error };
    }
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getAccessToken(): string | null {
    return this.user?.accessToken || null;
  }

  private generateUserId(email: string): string {
    // Generate a simple ID from email hash
    // In a real app, you'd get this from your API
    return btoa(email)
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 16);
  }
}

export const authService = new AuthService();
