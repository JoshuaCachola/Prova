export const convertDate = date => {
  const dateArr = date.split('-');

  return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
};

export const convertDateToDay = (run) => {
  const timeOfDay = ['morning', 'afternoon', 'evening'];
  const hour = run.timeOfDay.split(':')[0];
  let num;

  if (hour >= 5 && hour < 12) {
    num = 0;
  } else if (hour >= 12 && hour <= 18) {
    num = 1;
  } else {
    num = 2;
  }

  return `${run.day} ${timeOfDay[num]} run`;
};
