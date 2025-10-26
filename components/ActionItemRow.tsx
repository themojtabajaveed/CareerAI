import React, { useState } from 'react';
import { ActionItem, Status, SubStep } from '../types';
import SubStepRow from './SubStepRow';
import Icon from './Icon';

interface ActionItemRowProps {
  item: ActionItem;
  onSubStepDetailsChange: (subStepId: string, details: string) => void;
  onAiActionClick: (subStep: SubStep) => void;
  onViewDetails: (details: string) => void;
}

const ActionItemRow: React.FC<ActionItemRowProps> = ({ item, onSubStepDetailsChange, onAiActionClick, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = item.subSteps.filter(s => s.status === Status.Done).length;
  const totalCount = item.subSteps.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = completedCount === totalCount;

  return (
    <div className="rounded-md bg-gray-900/50">
      <div 
        className="flex items-center justify-between p-3 hover:bg-gray-700/50 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        <p className={`text-gray-200 ${isComplete ? 'line-through text-gray-500' : ''}`}>{item.title}</p>
        <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2">
             <span className="text-xs text-gray-400">{completedCount}/{totalCount}</span>
             <div className="w-20 bg-gray-700 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
           </div>
           <Icon name="chevron-down" className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className="p-3 border-t border-gray-700/50 space-y-2">
          {item.subSteps.map(subStep => (
            <SubStepRow 
              key={subStep.id}
              subStep={subStep}
              onDetailsChange={(details) => onSubStepDetailsChange(subStep.id, details)}
              onAiActionClick={() => onAiActionClick(subStep)}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionItemRow;