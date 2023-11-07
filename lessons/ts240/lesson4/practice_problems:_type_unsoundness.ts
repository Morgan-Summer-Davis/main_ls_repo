function isNumber(arg: any): arg is number {
  return typeof arg === 'number';
}

function safeGet<T>(arr: T[], index: number) {
  if (index >= 0 && index < arr.length) return arr[index];
  
  return undefined;
}