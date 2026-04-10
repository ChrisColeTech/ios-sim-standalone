import { useState } from 'react';
import { ensureProtocol } from '../utils/safari';

export function useSafariAddressBar(url: string, onNavigate: (url: string) => void) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const startEditing = () => { setInputValue(url); setEditing(true); };
  const cancelEditing = () => setEditing(false);
  const submitUrl = () => {
    onNavigate(ensureProtocol(inputValue));
    setEditing(false);
  };

  return { editing, inputValue, setInputValue, startEditing, cancelEditing, submitUrl };
}
