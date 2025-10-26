
import React from 'react';
import { Status } from '../../types';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block cursor-pointer";
  let colorClasses = "";

  switch (status) {
    case Status.Done:
      colorClasses = "bg-green-500/20 text-green-300";
      break;
    case Status.InProgress:
      colorClasses = "bg-yellow-500/20 text-yellow-300";
      break;
    case Status.NotStarted:
    default:
      colorClasses = "bg-gray-600/50 text-gray-300";
      break;
  }

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
