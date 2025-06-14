
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface PremiumCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  onClick: () => void;
  gradient?: string;
}

const PremiumCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor, 
  iconBg, 
  onClick,
  gradient = "from-white to-gray-50"
}: PremiumCardProps) => {
  return (
    <Card 
      className={`bg-gradient-to-br ${gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`${iconBg} p-3 rounded-2xl shadow-lg`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-display font-semibold text-gray-900 text-lg leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PremiumCard;
