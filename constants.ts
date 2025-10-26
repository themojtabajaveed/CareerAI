
import { Phase, Status } from './types';

export const INITIAL_PHASES: Phase[] = [
  {
    id: 1,
    title: 'Introspection',
    description: 'Discover your passions, strengths, and career goals to build a foundation for your journey.',
    unlocked: true,
    actionItems: [
      { id: 'ikigai', title: 'Guided Ikigai Journaling', status: Status.NotStarted, hasAiFeature: true },
      { id: 'research-roles', title: 'Research Industry/Role Aligns with Your Ikigai', status: Status.NotStarted },
      { id: 'outreach', title: 'Personalized Outreach to Connect with Recruiters/Founders', status: Status.NotStarted },
    ],
  },
  {
    id: 2,
    title: 'Exploration',
    description: 'Dive deep into project ideas, build your skills, and share your progress with the world.',
    unlocked: false,
    actionItems: [
      { id: 'research-projects', title: 'Research Project Topics Aligned with Target Firms', status: Status.NotStarted },
      { id: 'bip-generator', title: 'Daily Build-in-Public Post Generator', status: Status.NotStarted, hasAiFeature: true },
    ],
  },
  {
    id: 3,
    title: 'Reflection',
    description: 'Gather feedback, analyze your performance, and turn your experiences into powerful stories.',
    unlocked: false,
    actionItems: [
      { id: 'feedback-funnel', title: 'Peer/Mentor Feedback Funnel', status: Status.NotStarted },
      { id: 'sw-analyzer', title: 'Strength-Weakness Analyzer', status: Status.NotStarted, hasAiFeature: true },
      { id: 'case-study-generator', title: 'Case-study Generator', status: Status.NotStarted },
    ],
  },
  {
    id: 4,
    title: 'Action',
    description: 'Execute on your projects, optimize your process, and actively pursue job opportunities.',
    unlocked: false,
    actionItems: [
      { id: 'milestone-tracker', title: 'Project Milestone Tracker', status: Status.NotStarted },
      { id: 'delta-4', title: 'Delta 4 Prompt to Identify Friction & Delight Points', status: Status.NotStarted, hasAiFeature: true },
      { id: 'alerts', title: 'Alerts from Target Firms', status: Status.NotStarted },
    ],
  },
];
