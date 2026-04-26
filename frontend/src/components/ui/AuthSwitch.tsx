import { AuthMode } from '../../types/auth';

interface AuthSwitchProps {
  currentMode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export const AuthSwitch = ({ currentMode, onModeChange }: AuthSwitchProps) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-1 p-1 bg-blue-50 rounded-lg" role="tablist" aria-label="Authentication mode">
      <button
        type="button"
        role="tab"
        aria-selected={currentMode === 'login'}
        className={`py-2 px-3 rounded-md font-bold text-sm transition-colors ${
          currentMode === 'login'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-blue-600 border border-blue-200'
        }`}
        onClick={() => onModeChange('login')}
      >
        Login
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={currentMode === 'register'}
        className={`py-2 px-3 rounded-md font-bold text-sm transition-colors ${
          currentMode === 'register'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-blue-600 border border-blue-200'
        }`}
        onClick={() => onModeChange('register')}
      >
        Register
      </button>
    </div>
  );
};
