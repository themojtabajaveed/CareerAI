
import React, { useState } from 'react';
import { Phase, ActionItemId, Status } from '../types';
import ActionItemRow from './ActionItemRow';
import Icon from './Icon';

interface PhaseCardProps {
  phase: Phase;
  onStatusChange: (phaseId: number, itemId: ActionItemId, newStatus: Status) => void;
  onAiActionClick: (itemId: ActionItemId) => void;
}

const PhaseIcon: React.FC<{ phaseId: number }> = ({ phaseId }) => {
    const icons: { [key: number]: 'brain' | 'telescope' | 'users' | 'target' } = {
        1: 'brain',
        2: 'telescope',
        3: 'users',
        4: 'target',
    };
    return <Icon name={icons[phaseId]} className="w-8 h-8 text-blue-400" />;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onStatusChange, onAiActionClick }) => {
    const [isOpen, setIsOpen] = useState(phase.unlocked);
    
    const progress = (phase.actionItems.filter(item => item.status === Status.Done).length / phase.actionItems.length) * 100;

    const handleToggle = () => {
        if(phase.unlocked) {
            setIsOpen(!isOpen);
        }
    }
    
    return (
    <div className={`rounded-lg shadow-lg transition-all duration-300 ${phase.unlocked ? 'bg-gray-800' : 'bg-gray-800/50'}`}>
        <div 
            className={`flex items-center justify-between p-4 cursor-pointer ${phase.unlocked ? 'hover:bg-gray-700/50' : 'cursor-not-allowed'}`}
            onClick={handleToggle}
        >
            <div className="flex items-center space-x-4">
                <PhaseIcon phaseId={phase.id} />
                <div>
                    <h2 className="text-xl font-bold text-white">{phase.id} · {phase.title}</h2>
                    <p className="text-sm text-gray-400">{phase.description}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {!phase.unlocked && <Icon name="lock" className="w-5 h-5 text-gray-400" />}
                 <div className="w-24 bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                {phase.unlocked && <Icon name="chevron-down" className={`w-6 h-6 text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
            </div>
        </div>
        {isOpen && phase.unlocked && (
            <div className="border-t border-gray-700 p-4">
                <div className="space-y-3">
                    {phase.actionItems.map(item => (
                        <ActionItemRow
                            key={item.id}
                            item={item}
                            onStatusChange={(newStatus) => onStatusChange(phase.id, item.id, newStatus)}
                            onAiActionClick={() => onAiActionClick(item.id)}
                        />
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default PhaseCard;
