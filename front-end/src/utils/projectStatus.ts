import { TProjectStatus } from '../api/portfolioApi';

/** ACTIVE is the only interactive state; every other status shows its own overlay label. */
export const PROJECT_STATUS_LABEL: Record<TProjectStatus, string | null> = {
  ACTIVE: null,
  IN_PROGRESS: 'In progress...',
  HOLD: 'On hold...',
  PLANNING: 'Planning...',
};

export const isProjectOpenable = (status: TProjectStatus): boolean => status === 'ACTIVE';
