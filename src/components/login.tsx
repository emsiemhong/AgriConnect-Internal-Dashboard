import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F3EE' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-[#5BA66B] mb-2">AgriConnect</h1>
            <p className="text-gray-600">Staff Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="staff@agriconnect.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer">
                Remember Me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg"
              style={{ backgroundColor: '#5BA66B' }}
            >
              Login
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Powered by AgriConnect
          </div>
        </div>
      </div>
    </div>
  );
}
