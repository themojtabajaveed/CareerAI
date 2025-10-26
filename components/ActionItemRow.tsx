
import React from 'react';
import { ActionItem, Status } from '../types';
import Icon from './Icon';
import StatusBadge from './ui/StatusBadge';

interface ActionItemRowProps {
  item: ActionItem;
  onStatusChange: (newStatus: Status) => void;
  onAiActionClick: () => void;
}

const ActionItemRow: React.FC<ActionItemRowProps> = ({ item, onStatusChange, onAiActionClick }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-gray-900/50 hover:bg-gray-700/50 transition-colors">
      <p className="text-gray-200">{item.title}</p>
      <div className="flex items-center space-x-4">
        {item.hasAiFeature && (
          <button
            onClick={onAiActionClick}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
          >
            <Icon name="sparkles" className="w-4 h-4" />
            <span>AI Assist</span>
          </button>
        )}
        <div className="relative group">
          <StatusBadge status={item.status} />
          <select
            value={item.status}
            onChange={(e) => onStatusChange(e.target.value as Status)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          >
            <option value={Status.NotStarted}>Not Started</option>
            <option value={Status.InProgress}>In Progress</option>
            <option value={Status.Done}>Done</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ActionItemRow;
