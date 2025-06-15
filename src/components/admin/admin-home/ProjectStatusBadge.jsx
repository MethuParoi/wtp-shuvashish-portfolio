// components/dashboard/ProjectStatusBadge.jsx
export default function ProjectStatusBadge({ status }) {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-accent text-gray-900';
      case 'in progress':
        return 'bg-primary text-gray-900';
      case 'new':
        return 'bg-secondary text-white';
      default:
        return 'bg-neutral-200 text-gray-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
}
