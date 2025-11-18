/**
 * Utility functions for the application
 */

/**
 * Combines class names conditionally
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncates text to a specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

