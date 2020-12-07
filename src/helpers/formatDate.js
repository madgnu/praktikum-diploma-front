const strMonths = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export default function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = strMonths[date.getMonth()];
  const day = date.getDate();
  return `${day} ${month}, ${year}`;
}
