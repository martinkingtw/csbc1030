const fs = require('fs');

fs.readFile('./sample_input_numbers.json', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let numberArr = JSON.parse(data)['numbers'];
  numberArr = numberArr.map((num) => num * 2);
  const numberArrJson = { numbers: numberArr };
  fs.writeFile('./sample_output_numbers.json', JSON.stringify(numberArrJson), (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Finished');
    return;
  });
});