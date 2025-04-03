
import React from 'react';
import { 
  Stethoscope, 
  ActivitySquare, // Replace Tooth with ActivitySquare
  Eye, 
  Hand, 
  Bone, 
  Heart,
  Clock,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Clipboard,
  CheckCircle2,
  XCircle,
  Timer
} from 'lucide-react';

type IconName = 
  | 'stethoscope'
  | 'tooth'
  | 'eye'
  | 'hand'
  | 'bone'
  | 'heart'
  | 'clock'
  | 'calendar'
  | 'map-pin'
  | 'user'
  | 'mail'
  | 'phone'
  | 'clipboard'
  | 'check-circle'
  | 'x-circle'
  | 'timer';

interface TreatmentIconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export const TreatmentIcon: React.FC<TreatmentIconProps> = ({ 
  name, 
  className = '', 
  size = 24 
}) => {
  const iconMap = {
    'stethoscope': Stethoscope,
    'tooth': ActivitySquare, // Replace Tooth with ActivitySquare
    'eye': Eye,
    'hand': Hand,
    'bone': Bone,
    'heart': Heart,
    'clock': Clock,
    'calendar': Calendar,
    'map-pin': MapPin,
    'user': User,
    'mail': Mail,
    'phone': Phone,
    'clipboard': Clipboard,
    'check-circle': CheckCircle2,
    'x-circle': XCircle,
    'timer': Timer
  };
  
  const IconComponent = iconMap[name] || Stethoscope;
  
  return <IconComponent className={className} size={size} />;
};
