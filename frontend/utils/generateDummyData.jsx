import names from './names';
import paymentReasons from './paymentReasons';

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomAmount = () => (Math.floor(Math.random() * 300) + 1).toFixed(2);
const getRandomDate = () => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 30);
  today.setDate(today.getDate() - randomDays);
  return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1)
    .toString().padStart(2, '0')}/${today.getFullYear()}`;
  
};
const getRandomReminder = () => {
  const reminders = ['daily', '2 days', '3 days', 'weekly', 'fortnightly', 'monthly'];
  return getRandomElement(reminders);
};

export const generateDummyData = (count) => {
  return Array.from({ length: count }, () => {
    const type = Math.random() > 0.5 ? 'owed' : 'owe';
    return {
      title: `Owed $${getRandomAmount()} ${type === 'owed' ? 'from' : 'to'} @${getRandomElement(names)} for ${getRandomElement(paymentReasons)}`,
      date: getRandomDate(),
      reminder: getRandomReminder(),
      type,
    };
  });
};
