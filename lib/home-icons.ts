import {
  BookOpen, Heart, Users, Award, Sparkles, MapPin, GraduationCap, School,
  Clock, DollarSign, Shield, ShoppingBag, HelpCircle, Calendar,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Heart, Users, Award, Sparkles, MapPin, GraduationCap, School,
  Clock, DollarSign, Shield, ShoppingBag, HelpCircle, Calendar,
};

export function getHomeIcon(name: string) {
  return ICON_MAP[name] ?? School;
}
