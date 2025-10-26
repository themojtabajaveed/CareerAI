import React, { useState, useCallback, useMemo } from 'react';
import { Phase, Status, ActionItemId, SubStep, ActionItem } from './types';
import { INITIAL_PHASES } from './constants';
import * as geminiService from './services/geminiService';
import Header from './components/Header';
import PhaseCard from './components/PhaseCard';
import ConversationalAiModal from './components/ui/ConversationalAiModal';
import Modal from './components/ui/Modal';
import { ToastContainer } from './components/ui/Toast';
import { markdownToHtml } from './utils/markdown';

interface ActiveModalInfo {
  phaseId: number;
  itemId: ActionItemId;
  subStep: SubStep;
  aiFunction: (inputs: string[]) => Promise<string>;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

const App: React.FC = () => {
  const [phases, setPhases] = useState<Phase[]>(INITIAL_PHASES);
  const [activeModal, setActiveModal] = useState<ActiveModalInfo | null>(null);
  const [viewingDetails, setViewingDetails] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(currentToasts => [...currentToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  }, []);

  const updateSubStep = useCallback((phaseId: number, itemId: ActionItemId, subStepId: string, updates: Partial<SubStep>) => {
    setPhases(currentPhases => {
      const newPhases = currentPhases.map(p => {
        if (p.id === phaseId) {
          return {
            ...p,
            actionItems: p.actionItems.map(item => {
              if (item.id === itemId) {
                return {
                  ...item,
                  subSteps: item.subSteps.map(subStep =>
                    subStep.id === subStepId ? { ...subStep, ...updates } : subStep
                  )
                };
              }
              return item;
            }),
          };
        }
        return p;
      });

      const currentPhase = newPhases.find(p => p.id === phaseId);
      if (currentPhase) {
        const allSubstepsDone = currentPhase.actionItems.every(item =>
          item.subSteps.every(subStep => subStep.status === Status.Done)
        );
        if (allSubstepsDone) {
          const nextPhaseIndex = newPhases.findIndex(p => p.id === phaseId + 1);
          if (nextPhaseIndex !== -1 && !newPhases[nextPhaseIndex].unlocked) {
            newPhases[nextPhaseIndex].unlocked = true;
            addToast(`Phase ${phaseId} complete! You've unlocked Phase ${phaseId + 1}.`, 'info');
          }
        }
      }

      return newPhases;
    });
  }, [addToast]);

  const handleSubStepDetailsChange = useCallback((phaseId: number, itemId: ActionItemId, subStepId: string, details: string) => {
    const isNowDone = details.trim().length > 0;
    const currentPhase = phases.find(p => p.id === phaseId);
    const currentItem = currentPhase?.actionItems.find(i => i.id === itemId);
    const currentSubStep = currentItem?.subSteps.find(s => s.id === subStepId);
    const wasDone = currentSubStep?.status === Status.Done;

    updateSubStep(phaseId, itemId, subStepId, {
      details,
      status: isNowDone ? Status.Done : Status.NotStarted,
    });

    if (isNowDone && !wasDone) {
        addToast('Task progress saved!');
    }
  }, [updateSubStep, phases, addToast]);

  const aiFunctionMap: { [key in ActionItemId]?: (inputs: string[]) => Promise<string> } = useMemo(() => ({
    'ikigai': geminiService.summarizeJournal,
    'bip-generator': geminiService.generateSocialPosts,
    'sw-analyzer': geminiService.analyzeFeedback,
    'delta-4': geminiService.runDelta4Analysis,
  }), []);

  const handleAiActionClick = useCallback((phaseId: number, item: ActionItem, subStep: SubStep) => {
    const aiFunction = aiFunctionMap[item.id];
    if (aiFunction) {
      setActiveModal({
        phaseId,
        itemId: item.id,
        subStep,
        aiFunction,
      });
    }
  }, [aiFunctionMap]);

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleAiComplete = (result: string) => {
    if (activeModal) {
      updateSubStep(activeModal.phaseId, activeModal.itemId, activeModal.subStep.id, {
        details: result,
        status: Status.Done,
      });
      addToast('AI task completed!');
      handleCloseModal();
    }
  };

  const getModalTitle = (itemId: ActionItemId): string => {
    const titleMap: Record<ActionItemId, string> = {
      'ikigai': 'Guided Ikigai Journaling',
      'bip-generator': 'Build-in-Public Post Generator',
      'sw-analyzer': 'Strength-Weakness Analyzer',
      'delta-4': 'Delta 4 Analysis',
      'research-roles': '', 'outreach': '', 'research-projects': '', 'feedback-funnel': '', 'case-study-generator': '', 'milestone-tracker': '', 'alerts': '',
    };
    return titleMap[itemId] || 'AI Assistant';
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <main className="container mx-auto max-w-4xl py-8 px-4">
        <div className="space-y-6">
          {phases.map(phase => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              onSubStepDetailsChange={handleSubStepDetailsChange}
              onAiActionClick={handleAiActionClick}
              onViewDetails={setViewingDetails}
            />
          ))}
        </div>
      </main>
      {activeModal && activeModal.subStep.questions && (
        <ConversationalAiModal
          isOpen={!!activeModal}
          onClose={handleCloseModal}
          onComplete={handleAiComplete}
          title={getModalTitle(activeModal.itemId)}
          questions={activeModal.subStep.questions}
          aiFunction={activeModal.aiFunction}
        />
      )}
      {viewingDetails !== null && (
         <Modal isOpen={viewingDetails !== null} onClose={() => setViewingDetails(null)} title="AI Generated Result">
            <div 
              className="prose prose-invert mt-2 w-full max-w-full rounded-md bg-gray-900 p-4 text-gray-300 max-h-[60vh] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(viewingDetails) }}
            />
        </Modal>
      )}
    </div>
  );
};

export default App;