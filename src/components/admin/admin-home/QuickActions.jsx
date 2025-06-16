'use client';

import { Plus, Edit, Upload, Settings } from 'lucide-react'; // Replace IconComponents import

const quickActions = [
  {
    title: "Add New Project",
    description: "Create a new project entry",
    icon: Plus,
    href: "/admin/add-project",
    color: "primary"
  },
  {
    title: "Write New Blog",
    description: "Create a new blog post",
    icon: Edit,
    href: "/admin/add-blog",
    color: "secondary"
  }
  
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 py-2 px-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Links</h2>
      
      <div className="space-y-2">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <a
              key={index}
              href={action.href}
              className="flex items-center p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 hover:border-neutral-200 transition-colors group"
            >
              <div className={`
                p-3 rounded-lg mr-4
                ${action.color === 'primary' ? 'bg-primary-50 text-primary' : ''}
                ${action.color === 'secondary' ? 'bg-secondary-50 text-secondary' : ''}
                ${action.color === 'accent' ? 'bg-accent-50 text-accent' : ''}
                ${action.color === 'neutral' ? 'bg-neutral-100 text-gray-600' : ''}
              `}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
