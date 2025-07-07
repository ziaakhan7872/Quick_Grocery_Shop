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
    { 
        label: moment().subtract(1, 'day').format('dddd'), 
        key: moment().subtract(1, 'day').format('MM-DD-YYYY') // Yesterday
    },
    { 
        label: 'Today', 
        key: moment().format('MM-DD-YYYY') // Today
    },
    { 
        label: 'Tomorrow', 
        key: moment().add(1, 'day').format('MM-DD-YYYY') // Tomorrow
    },
    ...Array.from({ length: 6 }, (_, index) => {
        // Generate the next 6 days starting from today
        return {
            label: moment().add(index + 1, 'days').format('dddd'),
            key: moment().add(index + 1, 'days').format('MM-DD-YYYY') // Date in MM-DD-YYYY format
        };
    })
];



