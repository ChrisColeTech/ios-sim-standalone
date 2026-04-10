import type { TwoColSidebarConfig } from '../../types/layouts';

export const HEALTH_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search',
  sections: [
    {
      id: 'nav',
      rows: [
        { id: 'summary', title: 'Summary' },
        { id: 'sharing', title: 'Sharing' }
      ]
    },
    {
      id: 'categories',
      header: 'Health Categories',
      rows: [
        { id: 'activity', title: 'Activity' },
        { id: 'body', title: 'Body Measurements' },
        { id: 'cycle', title: 'Cycle Tracking' },
        { id: 'hearing', title: 'Hearing' },
        { id: 'heart', title: 'Heart' },
        { id: 'medications', title: 'Medications' },
        { id: 'mental', title: 'Mental Wellbeing' },
        { id: 'mobility', title: 'Mobility' },
        { id: 'nutrition', title: 'Nutrition' },
        { id: 'respiratory', title: 'Respiratory' },
        { id: 'sleep', title: 'Sleep' },
        { id: 'symptoms', title: 'Symptoms' }
      ]
    }
  ]
};

export const HEALTH_PINNED_CARDS = [
  {
    id: 'steps',
    label: 'Steps',
    labelColor: 'text-red-500',
    time: '9:18 AM',
    value: '3,310',
    unit: 'steps',
    hasChart: true
  },
  {
    id: 'cycle',
    label: 'Cycle Tracking',
    labelColor: 'text-cyan-500',
    time: 'Mar 30',
    value: 'Headache',
    unit: '2 Days Ago',
    hasChart: false
  },
  {
    id: 'sleep',
    label: 'Sleep Score',
    labelColor: 'text-cyan-600',
    time: 'Today',
    value: 'High',
    unit: '92 points',
    hasChart: false
  },
  {
    id: 'activity',
    label: 'Activity',
    labelColor: 'text-red-500',
    time: '9:38 AM',
    value: '',
    unit: '',
    hasChart: false,
    activityRings: true,
    activityData: { move: '670 cal', exercise: '39 min', stand: '4 hr' }
  },
  {
    id: 'audio',
    label: 'Headphone Audio Levels',
    labelColor: 'text-blue-500',
    time: '7:14 AM',
    value: '',
    unit: '7-Day Exposure',
    status: 'OK',
    hasChart: true
  },
  {
    id: 'mind',
    label: 'State of Mind',
    labelColor: 'text-purple-500',
    time: 'Yesterday',
    value: 'A Slightly Pleasant Day',
    unit: 'Grateful · Friends, Family',
    hasChart: false
  }
];

export const HEALTH_PROFILE = {
  name: 'Lani',
  initials: 'L'
};
