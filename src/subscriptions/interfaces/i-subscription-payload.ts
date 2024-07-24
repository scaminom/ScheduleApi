export interface ISubscriptionPayload {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
  expirationTime?: number
}
