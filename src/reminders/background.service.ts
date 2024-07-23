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
    const { firstReminders, secondReminders } =
      await this.remindersService.getPendingReminders()
    for (const reminder of firstReminders) {
      console.log('Sending reminder...')
      this.remindersGateway.sendReminderOnCreate()
      this.logger.log(`Reminder sent: ${reminder.title}`)

      await this.remindersService.markReminderPartialSent(reminder.id)
    }

    for (const reminder of secondReminders) {
      console.log('Sending reminder...')
      this.remindersGateway.sendReminderOnCreate()
      this.logger.log(`Reminder sent: ${reminder.title}`)

      await this.remindersService.markReminderCompleteSent(reminder.id)
    }
  }
}
