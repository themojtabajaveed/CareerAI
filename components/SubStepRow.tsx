import React, { useState, useEffect } from 'react';
import { SubStep, Status } from '../types';
import Icon from './Icon';

interface SubStepRowProps {
  subStep: SubStep;
  onDetailsChange: (details: string) => void;
  onAiActionClick: () => void;
  onViewDetails: (details: string) => void;
}

const SubStepRow: React.FC<SubStepRowProps> = ({ subStep, onDetailsChange, onAiActionClick, onViewDetails }) => {
  const isDone = subStep.status === Status.Done;
  const [details, setDetails] = useState(subStep.details || '');

  useEffect(() => {
    setDetails(subStep.details || '');
  }, [subStep.details]);

  const handleManualSave = () => {
    if (details !== (subStep.details || '')) {
      onDetailsChange(details);
    }
  };

  return (
    <div className="p-3 rounded-md bg-gray-800/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
            {subStep.type === 'manual' ? (
                <div className={`w-4 h-4 rounded-full flex-shrink-0 ${isDone ? 'bg-green-500' : 'bg-gray-600'}`} />
            ) : (
                <Icon name="sparkles" className={`w-4 h-4 flex-shrink-0 ${isDone ? 'text-green-400' : 'text-blue-400'}`} />
            )}
            <p className={`ml-3 text-sm ${isDone ? 'text-gray-500' : 'text-gray-300'}`}>{subStep.title}</p>
        </div>
        
        {subStep.type === 'ai' && (
            <div>
                {!isDone ? (
                    <button
                        onClick={onAiActionClick}
                        className="flex items-center space-x-2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
                    >
                        <Icon name="sparkles" className="w-3 h-3" />
                        <span>AI Assist</span>
                    </button>
                ) : (
                    <div className="flex items-center space-x-3">
                        <span className="text-xs text-green-400 font-medium">Completed</span>
                         <button
                            onClick={() => onViewDetails(subStep.details || 'No result saved.')}
                            className="px-3 py-1 text-xs font-medium text-gray-200 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
                        >
                            View Result
                        </button>
                    </div>
                )}
            </div>
        )}
      </div>
      
      {subStep.type === 'manual' && (
        <div className="mt-2 pl-7">
            <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                onBlur={handleManualSave}
                rows={2}
                placeholder="Add notes or details here... saving is automatic."
                className="block w-full text-sm rounded-md border-gray-600 bg-gray-900 text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
        </div>
      )}
    </div>
  );
};

export default SubStepRow;