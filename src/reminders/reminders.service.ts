import { Injectable } from '@nestjs/common'
import { CreateReminderDto } from './dto/create-reminder.dto'
import { UpdateReminderDto } from './dto/update-reminder.dto'
import { Reminder } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { ReminderNotFoundException } from './exceptions/reminder-not-found'

@Injectable()
export class RemindersService {
  public constructor(private readonly prisma: PrismaService) {}

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
