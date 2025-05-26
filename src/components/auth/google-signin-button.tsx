
"use client";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { ChromeIcon } from 'lucide-react'; // Using ChromeIcon as a placeholder for Google G

export function GoogleSignInButton() {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <Button 
      variant="outline" 
      onClick={signInWithGoogle} 
      disabled={loading}
      className="w-full"
    >
      <ChromeIcon className="mr-2 h-4 w-4" /> {/* Placeholder for Google icon */}
      Sign in with Google
    </Button>
  );
}

// If you have an SVG for Google icon, you can use it like this:
// const GoogleIcon = () => ( <svg>...</svg> );
