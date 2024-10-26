import capitalize from '@/utils/capitalize';

export default function errorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return capitalize(error.message);
  }
  if (typeof error === 'string') {
    return capitalize(error);
  }
  return fallback;
}
