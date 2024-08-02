import { Injectable } from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { RemindersGateway } from './reminders.gateway'

@Injectable()
export class RemindersBackgroundService {
  constructor(
    private readonly remindersService: RemindersService,
    private readonly remindersGateway: RemindersGateway,
  ) {}

  async checkReminders() {
    const { firstReminders, secondReminders } =
      await this.remindersService.getPendingReminders()
    for (const reminder of firstReminders) {
      this.remindersGateway.broadcastReminderFirstNotification(reminder)

      await this.remindersService.markReminderPartialSent(reminder.id)
    }

    for (const reminder of secondReminders) {
      this.remindersGateway.broadcastReminderSecondNotification(reminder)

      await this.remindersService.markReminderCompleteSent(reminder.id)
    }
  }
}
