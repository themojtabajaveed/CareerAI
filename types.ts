export enum Status {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Done = 'Done'
}

export type ActionItemId =
  | 'ikigai'
  | 'research-roles'
  | 'outreach'
  | 'research-projects'
  | 'bip-generator'
  | 'feedback-funnel'
  | 'sw-analyzer'
  | 'case-study-generator'
  | 'milestone-tracker'
  | 'delta-4'
  | 'alerts';

export type SubStepType = 'manual' | 'ai';

export interface SubStep {
  id: string;
  title: string;
  status: Status;
  type: SubStepType;
  questions?: string[];
  details?: string;
}

export interface ActionItem {
  id: ActionItemId;
  title: string;
  subSteps: SubStep[];
}

export interface Phase {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  actionItems: ActionItem[];
}