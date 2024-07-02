import { Injectable } from '@nestjs/common'
import { CreateReminderDto } from './dto/create-reminder.dto'
import { UpdateReminderDto } from './dto/update-reminder.dto'
import { Reminder } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class RemindersService {
  public constructor(private readonly prisma: PrismaService) {}

  async getAllReminders(): Promise<Reminder[]> {
    return await this.prisma.reminder.findMany({
      include: {
        user: true,
      },
    })
  }

  async getReminderById(id: number): Promise<Reminder> {
    return await this.prisma.reminder.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })
  }

  async createReminder(data: CreateReminderDto): Promise<Reminder> {
    return await this.prisma.reminder.create({
      data,
      include: {
        user: true,
      },
    })
  }

  async updateReminder(id: number, data: UpdateReminderDto): Promise<Reminder> {
    return await this.prisma.reminder.update({
      where: { id },
      data,
    })
  }

  async deleteReminder(id: number): Promise<Reminder> {
    return await this.prisma.reminder.delete({
      where: { id },
    })
  }
}
