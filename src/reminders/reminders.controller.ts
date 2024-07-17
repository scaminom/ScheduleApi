import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { RemindersService } from './reminders.service'
import { CreateReminderDto } from './dto/create-reminder.dto'
import { UpdateReminderDto } from './dto/update-reminder.dto'
import { Public } from 'src/auth/strategies/public.strategy'
import { ApiTags } from '@nestjs/swagger'

@Public()
@ApiTags('reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.createReminder(createReminderDto)
  }

  @Get()
  findAll() {
    return this.remindersService.getAllReminders()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remindersService.getReminderById(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.remindersService.updateReminder(+id, updateReminderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.remindersService.deleteReminder(+id)
  }
}
