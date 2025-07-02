import moment from "moment";

export const timeArray = [
  { label: "12:00 AM", value: "12:00 AM" },
  { label: "1:00 AM", value: "1:00 AM" },
  { label: "2:00 AM", value: "2:00 AM" },
  { label: "3:00 AM", value: "3:00 AM" },
  { label: "4:00 AM", value: "4:00 AM" },
  { label: "5:00 AM", value: "5:00 AM" },
  { label: "6:00 AM", value: "6:00 AM" },
  { label: "7:00 AM", value: "7:00 AM" },
  { label: "8:00 AM", value: "8:00 AM" },
  { label: "9:00 AM", value: "9:00 AM" },
  { label: "10:00 AM", value: "10:00 AM" },
  { label: "11:00 AM", value: "11:00 AM" },
  { label: "12:00 PM", value: "12:00 PM" },
  { label: "1:00 PM", value: "1:00 PM" },
  { label: "2:00 PM", value: "2:00 PM" },
  { label: "3:00 PM", value: "3:00 PM" },
  { label: "4:00 PM", value: "4:00 PM" },
  { label: "5:00 PM", value: "5:00 PM" },
  { label: "6:00 PM", value: "6:00 PM" },
  { label: "7:00 PM", value: "7:00 PM" },
  { label: "8:00 PM", value: "8:00 PM" },
  { label: "9:00 PM", value: "9:00 PM" },
  { label: "10:00 PM", value: "10:00 PM" },
];

export const daysData = [
    { label: moment().subtract(1, 'day').format('dddd'), key: 'yesterday' },
    { label: 'Today', key: 'today' },
    { label: 'Tomorrow', key: 'tomorrow' },
    { label: moment().add(2, 'days').format('dddd'), key: 'dayAfter' },
    { label: moment().add(3, 'days').format('dddd'), key: 'nextDay' }
];
