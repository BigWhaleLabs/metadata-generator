export default interface SCLedger {
  [address: string]: { original: string; derivative: string }
}
