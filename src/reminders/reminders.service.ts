import { ConflictException, Injectable } from '@nestjs/common'
import { CreateReminderDto } from './dto/create-reminder.dto'
import { UpdateReminderDto } from './dto/update-reminder.dto'
import { Reminder } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ReminderNotFoundException } from './exceptions/reminder-not-found'
import { getLocalDate } from 'src/shared/functions/local-date'
import { IReminderFilters } from './interfaces/i-reminder-filters'
import { RemindersGateway } from './reminders.gateway'

@Injectable()
export class RemindersService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly remindersGateway: RemindersGateway,
  ) {}

  async getPendingReminders(): Promise<{
    firstReminders: Reminder[]
    secondReminders: Reminder[]
  }> {
    const firstRemindersToFilter = await this.prisma.reminder.findMany({
      where: {
        notificationSent: false,
        minutesBeforeNotificationSent: false,
        deletedAt: null,
      },
    })

    const firstReminders = firstRemindersToFilter.filter((reminder) => {
      const now = getLocalDate()
      const reminderDate = new Date(reminder.reminderDate)
      const dateMinutesBefore = new Date(
        reminderDate.getTime() - reminder.notificationMinutesBefore * 60000 - 1,
      )

      return now >= dateMinutesBefore && now <= reminderDate
    })

    const secondRemindersToFilter = await this.prisma.reminder.findMany({
      where: {
        notificationSent: false,
        minutesBeforeNotificationSent: true,
        deletedAt: null,
      },
    })

    const secondReminders = secondRemindersToFilter.filter((reminder) => {
      const now = getLocalDate()
      const reminderDate = new Date(reminder.reminderDate)
      const dateMinuteBefore = new Date(reminderDate.getTime() - 60000 - 1)
      const dateMinuteAfter = new Date(reminderDate.getTime() + 60000 - 1)

      return now >= dateMinuteBefore && now <= dateMinuteAfter
    })

    return { firstReminders, secondReminders }
  }

  // async getDueNotifications(): Promise<Reminder[]> {
  //   const now = new Date()
  //   return this.prisma.reminder.findMany({
  //     where: {
  //       isCompleted: false,
  //       notificationSent: false,
  //       deletedAt: null,
  //       OR: [
  //         { reminderDate: { lte: new Date(now.getTime() + 15 * 60000) } },
  //         { reminderDate: { lte: new Date(now.getTime() + 30 * 60000) } },
  //         { reminderDate: { lte: new Date(now.getTime() + 60 * 60000) } },
  //       ],
  //     },
  //   })
  // }

  // async markNotificationAsSent(id: number): Promise<Reminder> {
  //   return this.prisma.reminder.update({
  //     where: { id },
  //     data: { notificationSent: true },
  //   })
  // }

  async markReminderCompleteSent(id: number): Promise<Reminder> {
    return this.prisma.reminder.update({
      where: { id },
      data: { notificationSent: true },
    })
  }

  async markReminderPartialSent(id: number): Promise<Reminder> {
    return this.prisma.reminder.update({
      where: { id },
      data: { minutesBeforeNotificationSent: true },
    })
  }

  /** Find reminders by filters
   * @param params IReminderFilters
   * @returns Promise<Reminder[]>
   * @throws {ConflictException} if the start date is greater than the end date
   */
  async findByFilters(params: IReminderFilters): Promise<Reminder[]> {
    if (
      params.startDate &&
      params.endDate &&
      params.startDate > params.endDate
    ) {
      throw new ConflictException(
        'Fecha de inicio no puede ser mayor a la fecha de fin',
      )
    }

    return await this.prisma.reminder.findMany({
      where: {
        ...params,
        reminderDate:
          params.startDate && params.endDate
            ? {
                lte: params.endDate,
                gte: params.startDate,
              }
            : params.startDate
              ? { gte: params.startDate }
              : params.endDate
                ? { lte: params.endDate }
                : undefined,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            ci: true,
            role: true,
          },
        },
      },
    })
  }

  async getAllReminders(): Promise<Reminder[]> {
    return await this.prisma.reminder.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        user: true,
      },
    })
  }

  async getReminderById(id: number): Promise<Reminder | null> {
    const reminder = await this.prisma.reminder.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        user: true,
      },
    })

    if (!reminder) {
      throw new ReminderNotFoundException(id)
    }

    return reminder
  }

  async createReminder(data: CreateReminderDto): Promise<Reminder> {
    const reminder = await this.prisma.reminder.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
      include: {
        user: true,
      },
    })

    this.remindersGateway.broadCastReminderCreation(reminder)

    return reminder
  }

  async updateReminder(id: number, data: UpdateReminderDto): Promise<Reminder> {
    const reminder = await this.getReminderById(id)

    if (!reminder) {
      throw new ReminderNotFoundException(id)
    }

    const reminderUpdated = await this.prisma.reminder.update({
      where: { id },
      data,
    })

    this.remindersGateway.broadCastReminderUpdate(reminder)

    return reminderUpdated
  }

  async deleteReminder(id: number): Promise<Reminder> {
    const reminder = await this.getReminderById(id)

    if (!reminder) {
      throw new ReminderNotFoundException(id)
    }

    const reminderDeleted = await this.prisma.reminder.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id },
    })

    this.remindersGateway.broadCastReminderDeletion(reminderDeleted)

    return reminderDeleted
  }
}
