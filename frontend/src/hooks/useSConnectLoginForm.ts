import { useRef, useState, useCallback } from 'react';

export function useSConnectLoginForm(onLogin: (value: string) => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = useCallback(() => {
    const value = inputRef.current?.value?.trim();
    if (!value) {
      setValidationError('Please enter your Employee ID.');
      return;
    }
    setValidationError(null);
    onLogin(value);
  }, [onLogin]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
  }, []);

  const openErrorModal = useCallback(() => setShowErrorModal(true), []);
  const closeErrorModal = useCallback(() => setShowErrorModal(false), []);

  return {
    inputRef,
    validationError,
    showErrorModal,
    handleSubmit,
    handleKeyDown,
    handleInput,
    openErrorModal,
    closeErrorModal
  };
}
