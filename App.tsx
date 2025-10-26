
import React, { useState, useCallback } from 'react';
import { Phase, Status, ActionItemId } from './types';
import { INITIAL_PHASES } from './constants';
import * as geminiService from './services/geminiService';
import Header from './components/Header';
import PhaseCard from './components/PhaseCard';
import AiModal from './components/ui/AiModal';

const App: React.FC = () => {
  const [phases, setPhases] = useState<Phase[]>(INITIAL_PHASES);
  const [activeModal, setActiveModal] = useState<ActionItemId | null>(null);

  const handleStatusChange = useCallback((phaseId: number, itemId: ActionItemId, newStatus: Status) => {
    setPhases(currentPhases => {
      const newPhases = currentPhases.map(p => {
        if (p.id === phaseId) {
          return {
            ...p,
            actionItems: p.actionItems.map(item =>
              item.id === itemId ? { ...item, status: newStatus } : item
            ),
          };
        }
        return p;
      });

      const currentPhase = newPhases.find(p => p.id === phaseId);
      if (currentPhase && currentPhase.actionItems.every(item => item.status === Status.Done)) {
        const nextPhaseIndex = newPhases.findIndex(p => p.id === phaseId + 1);
        if (nextPhaseIndex !== -1) {
          newPhases[nextPhaseIndex].unlocked = true;
        }
      }

      return newPhases;
    });
  }, []);

  const handleAiActionClick = useCallback((itemId: ActionItemId) => {
    setActiveModal(itemId);
  }, []);

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'ikigai':
        return (
          <AiModal
            isOpen={activeModal === 'ikigai'}
            onClose={handleCloseModal}
            title="Guided Ikigai Journaling"
            inputLabel="Write about your passions, what you are good at, what the world needs, and what you can be paid for."
            buttonText="Analyze Journal Entry"
            aiFunction={geminiService.summarizeJournal}
          />
        );
      case 'bip-generator':
        return (
          <AiModal
            isOpen={activeModal === 'bip-generator'}
            onClose={handleCloseModal}
            title="Build-in-Public Post Generator"
            inputLabel="Describe your project update or what you learned today."
            buttonText="Generate Social Posts"
            aiFunction={geminiService.generateSocialPosts}
          />
        );
      case 'sw-analyzer':
        return (
          <AiModal
            isOpen={activeModal === 'sw-analyzer'}
            onClose={handleCloseModal}
            title="Strength-Weakness Analyzer"
            inputLabel="Paste feedback you have received from peers or mentors."
            buttonText="Analyze Feedback"
            aiFunction={geminiService.analyzeFeedback}
          />
        );
      case 'delta-4':
         return (
          <AiModal
            isOpen={activeModal === 'delta-4'}
            onClose={handleCloseModal}
            title="Delta 4 Analysis"
            inputLabel="Describe a recent experience, project milestone, or user interaction."
            buttonText="Identify Friction & Delight"
            aiFunction={geminiService.runDelta4Analysis}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="container mx-auto max-w-4xl py-8 px-4">
        <div className="space-y-6">
          {phases.map(phase => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              onStatusChange={handleStatusChange}
              onAiActionClick={handleAiActionClick}
            />
          ))}
        </div>
      </main>
      {renderModalContent()}
    </div>
  );
};

export default App;
