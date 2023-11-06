export default function (str: string, maxLength?: number) {
  if (maxLength === undefined || str.length <= maxLength) return str
  return `${str.slice(0, maxLength - 3)}...`
}
