import csv from 'csvtojson';

const converter = (setState: (value: any[]) => void, data: string) => {
  csv({ checkType: true }).fromString(data).then(setState);
};

export default converter;
