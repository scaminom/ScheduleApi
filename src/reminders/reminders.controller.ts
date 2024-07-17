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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'

@Public()
@ApiTags('reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reminder' })
  @ApiBody({ type: CreateReminderDto })
  @ApiResponse({
    status: 201,
    description: 'The reminder has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.createReminder(createReminderDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all reminders' })
  @ApiResponse({ status: 200, description: 'List of reminders.' })
  findAll() {
    return this.remindersService.getAllReminders()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reminder by ID' })
  @ApiParam({ name: 'id', description: 'Reminder ID', type: 'integer' })
  @ApiResponse({ status: 200, description: 'The reminder details.' })
  @ApiResponse({ status: 404, description: 'Reminder not found.' })
  findOne(@Param('id') id: string) {
    return this.remindersService.getReminderById(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a reminder' })
  @ApiParam({ name: 'id', description: 'Reminder ID', type: 'integer' })
  @ApiBody({ type: UpdateReminderDto })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Reminder not found.' })
  update(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    return this.remindersService.updateReminder(+id, updateReminderDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reminder' })
  @ApiParam({ name: 'id', description: 'Reminder ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'The reminder has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Reminder not found.' })
  remove(@Param('id') id: string) {
    return this.remindersService.deleteReminder(+id)
  }
}
