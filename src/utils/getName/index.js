// export const firstWord = (string) => string.split(' ')[0];
export const getName = (string) => string.match(/^[\w\d]+/gs)[0];
