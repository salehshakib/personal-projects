interface ProgressResult {
  milestone: number;
  percentage: number;
  difference: number;
}

export function calculateProgress(num: number): ProgressResult {
  const milestones = [10, 50, 100, 500, 1000, 2500, 5000, 10000];

  for (const milestone of milestones) {
    if (num <= milestone) {
      const percentage = num / milestone;
      const difference = milestone - num;
      return { milestone, percentage, difference };
    }
  }

  // Handle numbers larger than all milestones
  return { milestone: num, percentage: 1, difference: 0 };
}
