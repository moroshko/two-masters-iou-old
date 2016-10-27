export const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
};

const amountRegex = /^\d+(\.\d{1,2})?$/;

export const isAmountValid = amount => {
  const trimmedAmount = amount.trim();

  return amountRegex.test(trimmedAmount) && parseFloat(trimmedAmount) !== 0;
};

export const isDescriptionValid = description =>
  description.trim() !== '';

export const isDateValid = date => {
  const timestamp = Date.parse(date);

  return !isNaN(timestamp) &&
    timestamp > 1420070400000 && // new Date('2015-01-01').getTime()
    timestamp < 3313526400000;   // new Date('2075-01-01').getTime()
};

export const isRecordValid = ({ lender, borrower, amount, description, date }) =>
  lender !== null &&
  borrower !== null &&
  isAmountValid(amount) &&
  isDescriptionValid(description) &&
  isDateValid(date);

const MONTHS = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};

export const formatRecordDate = recordDate => {
  const currentYear = (new Date()).getFullYear();
  const month = MONTHS[recordDate.slice(5, 7)];
  const day = recordDate.slice(8, 10);

  if (recordDate.startsWith(currentYear)) {
    return `${day} ${month}`;
  }

  const year = recordDate.slice(0, 4);

  return `${day} ${month}, ${year}`;
};

export const shortenLenderOrBorrower = lenderOrBorrower => {
  switch (lenderOrBorrower) {
    case 'leva': return 'L';
    case 'danik': return 'D';
    case '2masters': return '2M';
    default: return '?';
  }
};

export const getLevaOwesDanikDiff = ({ lender, borrower, amount }) => {
  if (lender === '2masters' && borrower === 'danik') {
    return -amount / 2;
  }

  if (lender === '2masters' && borrower === 'leva') {
    return amount / 2;
  }

  if (lender === 'leva' && borrower === '2masters') {
    return -amount / 2;
  }

  if (lender === 'danik' && borrower === '2masters') {
    return amount / 2;
  }

  if (lender === 'leva' && borrower === 'danik') {
    return -amount;
  }

  if (lender === 'danik' && borrower === 'leva') {
    return amount;
  }

  return 0;
};

