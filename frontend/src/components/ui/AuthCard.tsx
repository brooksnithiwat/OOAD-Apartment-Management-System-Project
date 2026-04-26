import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <section className="w-full bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
      <header className="mb-6">
        <h1 className="m-0 text-2xl font-castoro text-dark-blue">{title}</h1>
        <p className="m-0 mt-1 text-sm text-blue-600">{subtitle}</p>
      </header>
      {children}
    </section>
  );
};
