import type { IProject, TProjectStatus } from '@/features/project/client';

/**
 * Badge per status. The dot carries the color; the label always names the
 * status so it never relies on color alone. Hues reuse the chart slots
 * (validated on the dark surface) plus amber for planning, gray for on hold.
 */
export const PROJECT_STATUS: Record<TProjectStatus, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: 'var(--chart-1)' },
  IN_PROGRESS: { label: 'In progress', color: 'var(--chart-2)' },
  PLANNING: { label: 'Planning', color: '#c98500' },
  HOLD: { label: 'On hold', color: 'var(--secondary-text)' },
};

/**
 * Where clicking the card goes, whatever the status: its preview link (a live
 * demo or, for unfinished projects, often the repo), else its first source.
 * Null means the card has nowhere to go.
 */
export const getProjectLink = (project: IProject): string | null =>
  project.preview || project.sources?.[0]?.url || null;
