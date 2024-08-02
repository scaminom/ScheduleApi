import { Injectable, Logger } from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { RemindersGateway } from './reminders.gateway'

@Injectable()
export class RemindersBackgroundService {
  private readonly logger = new Logger(RemindersBackgroundService.name)

  constructor(
    private readonly remindersService: RemindersService,
    private readonly remindersGateway: RemindersGateway,
  ) {}

  async checkReminders() {
    const { firstReminders, secondReminders } =
      await this.remindersService.getPendingReminders()
    for (const reminder of firstReminders) {
      this.remindersGateway.broadcastReminderFirstNotification(reminder)
      this.logger.log(`Reminder sent: ${reminder.title}`)

      await this.remindersService.markReminderPartialSent(reminder.id)
    }

    for (const reminder of secondReminders) {
      this.remindersGateway.broadcastReminderSecondNotification(reminder)
      this.logger.log(`Reminder sent: ${reminder.title}`)

      await this.remindersService.markReminderCompleteSent(reminder.id)
    }
  }
}
