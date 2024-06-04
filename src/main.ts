function analyzeArray(data: number[]) {
  const average = () => {
    const sum = data.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );
    return sum / data.length;
  };

  const min = () => {
    return Math.min(...data);
  };

  const max = () => {
    return Math.max(...data);
  };

  const length = () => {
    return data.length;
  };
  return { average: average(), min: min(), max: max(), length: length() };
}
export default analyzeArray;
