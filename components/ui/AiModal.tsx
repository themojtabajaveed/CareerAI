
import React, { useState } from 'react';
import Modal from './Modal';
import Icon from '../Icon';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputLabel: string;
  buttonText: string;
  aiFunction: (input: string) => Promise<string>;
}

const AiModal: React.FC<AiModalProps> = ({ isOpen, onClose, title, inputLabel, buttonText, aiFunction }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) {
        setError('Input cannot be empty.');
        return;
    }
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const response = await aiFunction(input);
      setResult(response);
    } catch (e) {
      const err = e as Error;
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setInput('');
    setResult('');
    setError('');
    setIsLoading(false);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <div>
        <label htmlFor="ai-input" className="block text-sm font-medium text-gray-300">
          {inputLabel}
        </label>
        <div className="mt-1">
          <textarea
            id="ai-input"
            rows={8}
            className="block w-full rounded-md border-gray-600 bg-gray-900 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Start writing here..."
          />
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex w-full justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:bg-blue-800 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
            </>
          ) : (
             <>
                <Icon name="sparkles" className="w-5 h-5 mr-2" />
                {buttonText}
             </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-500/20 p-4">
            <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-200">AI Analysis Result:</h4>
          <div className="prose prose-invert mt-2 w-full max-w-full rounded-md bg-gray-900 p-4 whitespace-pre-wrap text-gray-300">
             {result}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AiModal;
