import dayjs from 'dayjs';

/**
 * Format a number into a human-friendly currency string.
 *
 * Example:
 * - formatCurrency(10)            => "$10.00"
 * - formatCurrency(10, "EUR")    => "€10.00" (depending on browser/locale)
 *
 * Notes for beginners:
 * - `Intl.NumberFormat` is a built-in JavaScript feature that formats numbers
 *   according to a locale and currency rules.
 * - We wrap it in `try/catch` because an invalid `currency` code (like "XYZ")
 *   can throw an error.
 */
export const formatCurrency = (value: number, currency = 'USD'): string => {
    try {
        // Create a formatter for money values (like USD, EUR, etc.)
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            // Always show 2 digits after the decimal (like 10.00)
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    } catch {
        // Fallback: if formatting fails, at least show the number with 2 decimals.
        // `toFixed(2)` returns a string (not a number).
        return value.toFixed(2);
    }
};

/**
 * Turn an ISO date-time string into a simple date label (MM/DD/YYYY).
 *
 * What comes in:
 * - `value` is optional, so it might be `undefined`.
 * - It is expected to be something Day.js can parse (often an ISO string).
 *
 * What we return:
 * - A formatted date like "04/02/2026"
 * - "Not provided" if the input is missing or can't be parsed
 */
export const formatSubscriptionDateTime = (value?: string): string => {
    // If the caller didn't give us a value, show a friendly message.
    if (!value) return 'Not provided';

    // Parse the input date using Day.js (a lightweight date library).
    const parsedDate = dayjs(value);

    // Check whether the parsing succeeded.
    return parsedDate.isValid()
        // If valid, format it as MM/DD/YYYY.
        ? parsedDate.format('MM/DD/YYYY')
        // If invalid, avoid crashing and show a friendly message.
        : 'Not provided';
};

/**
 * Convert a status value into a more readable label.
 *
 * Example:
 * - "active"   => "Active"
 * - "pending"  => "Pending"
 *
 * If the status is missing, we return "Unknown".
 */
export const formatStatusLabel = (value?: string): string => {
    // If the value is empty/undefined, we don't know what to display.
    if (!value) return 'Unknown';

    // Uppercase the first character, then append the rest.
    return value.charAt(0).toUpperCase() + value.slice(1);
};
