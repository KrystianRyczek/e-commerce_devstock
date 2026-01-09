export const getRandomDateInNext7Days = (): Date => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 7) + 1; // Random number between 1 and 7
  const randomDate = new Date(today);
  randomDate.setDate(today.getDate() + randomDays);
  return randomDate;
};
export const addDaysToDate = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};
