export class PodPinnerLog {
  static log(str: string) {
    console.log(`\texpo-pod-pinner: ${str}`)
  }

  static error(str: string) {
    console.error(`\texpo-pod-pinner: ${str}`)
  }
}
