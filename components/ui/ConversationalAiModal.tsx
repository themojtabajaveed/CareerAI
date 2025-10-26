import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { markdownToHtml } from '../../utils/markdown';

interface ConversationalAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: string) => void;
  title: string;
  questions: string[];
  aiFunction: (inputs: string[]) => Promise<string>;
}

const ConversationalAiModal: React.FC<ConversationalAiModalProps> = ({ isOpen, onClose, onComplete, title, questions, aiFunction }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers([]);
      setCurrentAnswer('');
      setIsLoading(false);
      setResult('');
      setError('');
      setSubmittedAnswers([]);
    }
  }, [isOpen]);

  const handleSubmit = async (finalAnswers: string[]) => {
    setIsLoading(true);
    setResult('');
    setError('');
    setSubmittedAnswers(finalAnswers);
    try {
      const response = await aiFunction(finalAnswers);
      setResult(response);
    } catch (e) {
      const err = e as Error;
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNext = () => {
    if (!currentAnswer.trim()) {
      setError('Please provide an answer before proceeding.');
      return;
    }
    setError('');
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    setCurrentAnswer('');
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleRetryOrRegenerate = () => {
    if (submittedAnswers.length > 0) {
        handleSubmit(submittedAnswers);
    }
  };

  const renderContent = () => {
    if (isLoading) {
        return (
             <div className="text-center py-12">
                <div role="status" className="inline-block">
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-600 animate-spin fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5424 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-4 text-gray-400">Analyzing your input...</p>
            </div>
        );
    }
    
    if (error) {
        return (
          <div>
              <div className="rounded-md bg-red-900/50 p-4 border border-red-500/50">
                  <h4 className="text-md font-semibold text-red-300">An Error Occurred</h4>
                  <p className="mt-2 text-sm text-red-400">{error}</p>
              </div>
               <div className="mt-6">
                  <button
                  type="button"
                  onClick={handleRetryOrRegenerate}
                  className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                  Retry
                  </button>
              </div>
          </div>
        )
      }

    if (result) {
      return (
        <div>
            <h4 className="text-md font-semibold text-gray-200">AI Analysis Result:</h4>
            <div 
                className="prose prose-invert mt-2 w-full max-w-full rounded-md bg-gray-900 p-4 text-gray-300 max-h-[40vh] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(result) }}
            />
             <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                <button
                type="button"
                onClick={() => onComplete(result)}
                className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                Complete & Mark as Done
                </button>
                <button
                    type="button"
                    onClick={handleRetryOrRegenerate}
                    className="inline-flex w-full justify-center items-center rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                    Regenerate
                </button>
            </div>
        </div>
      )
    }

    return (
      <div>
        <div className="mb-4">
            <span className="text-sm font-semibold text-blue-400">Step {currentStep + 1} of {questions.length}</span>
            <p className="mt-1 text-md text-gray-300">
             {questions[currentStep]}
            </p>
        </div>
        <div>
          <textarea
            id="ai-input"
            rows={8}
            className="block w-full rounded-md border-gray-600 bg-gray-900 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Your thoughts here..."
          />
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {currentStep < questions.length - 1 ? 'Next' : 'Generate Analysis'}
            {/* FIX: Corrected typo in svg viewBox attribute from '0 0 24" 24"' to '0 0 24 24' */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {renderContent()}
    </Modal>
  );
};

export default ConversationalAiModal;