import React, { useEffect } from 'react';

export interface ToastProps {
  id: number;
  message: string;
  type: 'success' | 'info';
  onDismiss: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, onDismiss]);

  const baseClasses = "flex items-center w-full max-w-xs p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg shadow-lg border border-gray-700";
  const typeClasses = {
    success: 'text-green-400 bg-green-900/50',
    info: 'text-blue-400 bg-blue-900/50',
  };

  const Icon = () => {
    if (type === 'success') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
    );
  };

  return (
    <div className={baseClasses} role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${typeClasses[type]} rounded-lg`}>
            <Icon />
        </div>
        <div className="ml-3 text-sm font-normal text-gray-200">{message}</div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-gray-800 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg focus:ring-2 focus:ring-gray-600 p-1.5 inline-flex h-8 w-8" onClick={() => onDismiss(id)}>
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
    </div>
  );
};

interface ToastContainerProps {
    toasts: Omit<ToastProps, 'onDismiss'>[];
    onDismiss: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
    return (
        <div className="fixed bottom-5 right-5 z-[100]">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}
