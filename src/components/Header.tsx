
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
}

const Header = ({ title, subtitle, onBack, showBack = true }: HeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 safe-area-top">
      <div className="flex items-center space-x-3 mb-1">
        {showBack && onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20 h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="font-display font-bold text-xl">{title}</h1>
          {subtitle && (
            <p className="text-indigo-100 text-sm opacity-90">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
