'use client';

import { 
  Plus
} from 'lucide-react';

const iconMap = {
  admin: Plus,
  moderator: Plus,
  
};

export default function AddRoleCard({ title, value, icon }) {
  const Icon = iconMap[icon];


  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 py-[47px] px-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`
          p-3 rounded-lg
          ${icon === 'admin' ? 'bg-primary-50' : ''}
          ${icon === 'moderator' ? 'bg-secondary-50' : ''}
          
        `}>
          <Icon className={`
            h-6 w-6
            ${icon === 'admin' ? 'text-primary' : ''}
            ${icon === 'moderator' ? 'text-secondary' : ''}
            
          `} />
        </div>
        
        <div className={`flex items-center`}>
          <h3 className="text-2xl font-bold text-gray-700 mb-1">{title}</h3>
        </div>
      </div>
      
      <div>
        
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );
}
