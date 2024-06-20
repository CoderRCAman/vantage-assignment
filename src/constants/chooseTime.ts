export const intervals = [
  '00:00',
  '04:00',
  '08:00',
  '12:00',
  '16:00',
  '20:00',
  '23:00',
];

export function convertTo12Hour(time24: string): string {
  // Split the input time into hours and minutes
  const [hourString, minuteString] = time24.split(':');
  const hours = parseInt(hourString, 10);
  const minutes = parseInt(minuteString, 10);

  // Determine the period (AM or PM)
  const period = hours >= 12 ? 'PM' : 'AM';

  // Adjust hours for 12-hour format
  const adjustedHours = hours % 12 || 12; // Use modulus to handle 0 as 12

  // Format the adjusted hours and minutes with leading zeros
  const formattedHours = adjustedHours.toString().padStart(2, '0');
  const formattedMinutes = minuteString.padStart(2, '0');

  // Return the formatted time string
  return `${formattedHours}:${formattedMinutes} ${period}`;
}
