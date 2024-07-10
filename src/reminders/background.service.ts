import { Injectable, Logger } from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { RemindersGateway } from './reminders.gateway'

@Injectable()
export class BackgroundService {
  private readonly logger = new Logger(BackgroundService.name)

  constructor(
    private readonly remindersService: RemindersService,
    private readonly remindersGateway: RemindersGateway,
  ) {}

  async checkReminders() {
    // const dueNotifications = await this.remindersService.getDueNotifications()
    // for (const reminder of dueNotifications) {
    //   this.remindersGateway.sendReminder(reminder)
    //   this.logger.log(`Pre-notification sent: ${reminder.title}`)
    //   await this.remindersService.markNotificationAsSent(reminder.id)
    // }

    const dueReminders = await this.remindersService.getPendingReminders()
    for (const reminder of dueReminders) {
      this.remindersGateway.sendReminder(reminder)
      this.logger.log(`Reminder sent: ${reminder.title}`)
      await this.remindersService.markReminderAsCompleted(reminder.id)
    }
  }
}
