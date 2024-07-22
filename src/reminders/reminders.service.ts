import { Injectable } from '@nestjs/common'
import { CreateReminderDto } from './dto/create-reminder.dto'
import { UpdateReminderDto } from './dto/update-reminder.dto'
import { Reminder } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ReminderNotFoundException } from './exceptions/reminder-not-found'
import { getLocalDate } from 'src/shared/functions/local-date'

@Injectable()
export class RemindersService {
  public constructor(private readonly prisma: PrismaService) {}

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
        reminderDate.getTime() - reminder.notificationMinutesBefore * 60000,
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
      const dateMinuteBefore = new Date(reminderDate.getTime() - 60000)
      const dateMinuteAfter = new Date(reminderDate.getTime() + 60000)

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
    return await this.prisma.reminder.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
      include: {
        user: true,
      },
    })
  }

  async updateReminder(id: number, data: UpdateReminderDto): Promise<Reminder> {
    const reminder = await this.getReminderById(id)

    if (!reminder) {
      throw new ReminderNotFoundException(id)
    }

    return await this.prisma.reminder.update({
      where: { id },
      data,
    })
  }

  async deleteReminder(id: number): Promise<Reminder> {
    const reminder = await this.getReminderById(id)

    if (!reminder) {
      throw new ReminderNotFoundException(id)
    }

    return await this.prisma.reminder.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id },
    })
  }
}
