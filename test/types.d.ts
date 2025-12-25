// Type declaration for test environment
import 'vitest'

declare global {
  namespace NodeJS {
    interface Process {
      browser?: boolean
    }
  }
}

export {}

