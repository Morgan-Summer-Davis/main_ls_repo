function test(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    if ('test' in data) {
      console.log(data.test)
    }
  }
}