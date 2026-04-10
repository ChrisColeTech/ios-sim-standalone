import type { CalculatorButton } from '../../types/layouts';
import type { TwoColSidebarConfig } from '../../types/layouts';

export const CALCULATOR_DEFAULT_VALUE = '96';

export const CALCULATOR_HISTORY_SIDEBAR: TwoColSidebarConfig = {
  sections: [
    {
      id: 'recent',
      header: 'Previous 7 Days',
      rows: [
        { id: 'h1', title: '2.84386698', subtitle: '³√(23)' },
        { id: 'h2', title: '6.70820393', subtitle: '√(45)' },
        { id: 'h3', title: '-8.60927152', subtitle: '-26÷3.02' },
        { id: 'h4', title: '-26', subtitle: '(-89)+63' },
        { id: 'h5', title: '0.12306702', subtitle: 'sin(7)÷cos(8)' },
        { id: 'h6', title: '0.12068914', subtitle: 'sin(7×cos(8))' },
        { id: 'h7', title: '4.64158883', subtitle: '³√(100)' },
        { id: 'h8', title: '1,560', subtitle: '78×20' },
        { id: 'h9', title: '2', subtitle: '³√(8)' },
        { id: 'h10', title: '2', subtitle: '102÷51' },
        { id: 'h11', title: '4.64705882', subtitle: '553÷119' },
      ]
    }
  ]
};

export const CALCULATOR_BASIC_BUTTONS: CalculatorButton[] = [
  { id: '7', label: '7', variant: 'digit' },
  { id: '8', label: '8', variant: 'digit' },
  { id: '9', label: '9', variant: 'digit' },
  { id: 'del', label: '⌫', variant: 'function' },
  { id: 'div', label: '÷', variant: 'operator' },
  { id: '4', label: '4', variant: 'digit' },
  { id: '5', label: '5', variant: 'digit' },
  { id: '6', label: '6', variant: 'digit' },
  { id: 'neg', label: '+/-', variant: 'function' },
  { id: 'mul', label: '×', variant: 'operator' },
  { id: '1', label: '1', variant: 'digit' },
  { id: '2', label: '2', variant: 'digit' },
  { id: '3', label: '3', variant: 'digit' },
  { id: 'pct', label: '%', variant: 'function' },
  { id: 'sub', label: '−', variant: 'operator' },
  { id: 'mode', label: '⌗', variant: 'function' },
  { id: '0', label: '0', variant: 'digit' },
  { id: 'dot', label: '.', variant: 'digit' },
  { id: 'eq', label: '=', variant: 'operator' },
  { id: 'add', label: '+', variant: 'operator' }
];

export const CALCULATOR_SCI_BUTTONS: CalculatorButton[] = [
  { id: '(', label: '(', variant: 'function' },
  { id: ')', label: ')', variant: 'function' },
  { id: 'mc', label: 'mc', variant: 'function' },
  { id: 'mplus', label: 'm+', variant: 'function' },
  { id: 'mminus', label: 'm-', variant: 'function' },
  { id: 'mr', label: 'mr', variant: 'function' },
  ...CALCULATOR_BASIC_BUTTONS
];
