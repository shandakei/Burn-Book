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
    const type = getRandomElement(['pending', 'received', 'sent']);
    const owedOweType = type === 'pending' ? getRandomElement(['owed', 'owe']) : null;
    const title = type === 'pending' 
      ? `${owedOweType === 'owed' ? 'Owed' : 'Owe'} $${getRandomAmount()} ${owedOweType === 'owed' ? 'from' : 'to'} @${getRandomElement(names)} for ${getRandomElement(paymentReasons)}`
      : `$${getRandomAmount()} from @${getRandomElement(names)} for ${getRandomElement(paymentReasons)}`;
    
    return {
      title,
      date: getRandomDate(),
      reminder: type === 'pending' ? getRandomReminder() : null,
      type,
      owedOweType,
      // cardStyle: owedOweType === 'owed' ? 'white' : 'black',
    };
  });
};
