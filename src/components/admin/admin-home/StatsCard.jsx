'use client';

import { 
  FolderOpen, 
  FileText, 
  Clock, 
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react'; // Replace IconComponents import

const iconMap = {
  projects: FolderOpen,
  blogs: FileText,
  pending: Clock,
  visitors: Users,
};

export default function StatsCard({ title, value, icon, trend, trendDirection }) {
  const Icon = iconMap[icon] || FolderOpen;
  const TrendIcon = trendDirection === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trendDirection === 'up' ? 'text-accent' : 'text-red-500';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 py-[47px] px-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`
          p-3 rounded-lg
          ${icon === 'projects' ? 'bg-primary-50' : ''}
          ${icon === 'blogs' ? 'bg-secondary-50' : ''}
          ${icon === 'pending' ? 'bg-red-50' : ''}
          ${icon === 'visitors' ? 'bg-accent-50' : ''}
        `}>
          <Icon className={`
            h-6 w-6
            ${icon === 'projects' ? 'text-primary' : ''}
            ${icon === 'blogs' ? 'text-secondary' : ''}
            ${icon === 'pending' ? 'text-red-500' : ''}
            ${icon === 'visitors' ? 'text-accent' : ''}
          `} />
        </div>
        
        <div className={`flex items-center ${trendColor}`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
}
