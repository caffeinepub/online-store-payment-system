import { useState } from 'react';
import { Lock } from 'lucide-react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

const ADMIN_PASSCODE = '3415';

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode. Please try again.');
      setPasscode('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg border shadow-card p-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
            <p className="text-center text-muted-foreground mb-6">
              Enter the passcode to access the admin panel
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="passcode" className="block text-sm font-medium mb-2">
                  Passcode
                </label>
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter passcode"
                  autoFocus
                />
              </div>
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-md">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Access Admin Panel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage your store items</p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <ItemForm />
        </div>
        <div>
          <ItemList />
        </div>
      </div>
    </div>
  );
}
