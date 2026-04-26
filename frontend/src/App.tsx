import { useMemo, useState } from 'react';

import { AuthCard } from './components/ui/AuthCard';
import { AuthSwitch } from './components/ui/AuthSwitch';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import type { AuthMode } from './types/auth';

export const App = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const cardContent = useMemo(() => {
    if (authMode === 'login') {
      return {
        title: 'Welcome Back',
        subtitle: 'Sign in to continue to your dashboard.',
        page: <LoginPage />,
      };
    }

    return {
      title: 'Create Account',
      subtitle: 'Register to start managing your apartment platform.',
      page: <RegisterPage />,
    };
  }, [authMode]);

  return (
    <main className="min-h-screen w-full md:w-[min(520px,92vw)] mx-auto flex justify-center items-center md:py-8 py-2">
      <AuthCard title={cardContent.title} subtitle={cardContent.subtitle}>
        <AuthSwitch currentMode={authMode} onModeChange={setAuthMode} />
        {cardContent.page}
      </AuthCard>
    </main>
  );
};
