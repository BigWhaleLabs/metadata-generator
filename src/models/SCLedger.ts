export default interface SCLedger {
  [originalAddress: string]: { original: string; derivative: string }
}
