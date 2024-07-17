/* eslint-disable */
export default async () => {
    const t = {
        ["./users/users.module"]: await import("./users/users.module")
    };
    return { "@nestjs/swagger": { "models": [[import("./users/dto/create-user.dto"), { "CreateUserDto": { ci: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, type: () => Object }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String } } }], [import("./users/dto/update-user.dto"), { "UpdateUserDto": {} }], [import("./auth/dto/sign-in.dto"), { "SignInDto": { ci: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./vehicles/dto/create-vehicle.dto"), { "CreateVehicleDto": { plate: { required: true, type: () => String }, type: { required: true, type: () => String }, brand: { required: true, type: () => String }, model: { required: true, type: () => String }, color: { required: true, type: () => String } } }], [import("./vehicles/dto/update-vehicle.dto"), { "UpdateVehicleDto": {} }], [import("./appoitments/dto/create-appointment.dto"), { "CreateAppointmentDto": { clientName: { required: true, type: () => String }, vehicleId: { required: true, type: () => Number }, description: { required: false, type: () => String }, date: { required: true, type: () => Date }, status: { required: true, type: () => Object }, userId: { required: true, type: () => String } } }], [import("./appoitments/dto/update-appointment.dto"), { "UpdateAppointmentDto": {} }], [import("./reminders/dto/create-reminder.dto"), { "CreateReminderDto": { title: { required: true, type: () => String }, description: { required: true, type: () => String }, reminderDate: { required: true, type: () => Object }, notificationMinutesBefore: { required: true, type: () => Number }, userId: { required: true, type: () => String } } }], [import("./reminders/dto/update-reminder.dto"), { "UpdateReminderDto": {} }], [import("./inspections/dto/create-inspection.dto"), { "CreateInspectionDto": { appointmentId: { required: true, type: () => Number }, status: { required: true, type: () => Object }, jobs: { required: false, type: () => [String] }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date } } }], [import("./inspections/dto/update-inspection.dto"), { "UpdateInspectionDto": {} }], [import("./jobs/dto/create-job.dto"), { "CreateJobDto": { inspectionId: { required: true, type: () => Number }, name: { required: true, type: () => String }, status: { required: true, type: () => Object } } }], [import("./jobs/dto/update-job.dto"), { "UpdateJobDto": {} }], [import("./reminders/entities/reminder.entity"), { "Reminder": { id: { required: true, type: () => Number }, description: { required: true, type: () => String }, title: { required: true, type: () => String }, completed: { required: true, type: () => Boolean }, date: { required: true, type: () => Date }, notificationMinutes: { required: true, type: () => String }, createdAt: { required: true, type: () => Date } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./users/users.controller"), { "UsersController": { "getAllUsers": { type: [t["./users/users.module"].UsersModule] }, "signupUser": { type: t["./users/users.module"].UsersModule }, "getUser": { type: t["./users/users.module"].UsersModule } } }], [import("./auth/auth.controller"), { "AuthController": { "signIn": {}, "signUp": { type: Object }, "logout": { type: Object } } }], [import("./vehicles/vehicles.controller"), { "VehiclesController": { "create": { type: Object }, "findAll": { type: Object }, "findOne": { type: Object }, "update": { type: Object }, "remove": { type: Object } } }], [import("./appoitments/appointments.controller"), { "ApointmentsController": { "create": { type: Object }, "findAll": { type: Object }, "findOne": { type: Object }, "update": { type: Object }, "remove": { type: Object } } }], [import("./reminders/reminders.controller"), { "RemindersController": { "create": { type: Object }, "findAll": { type: [Object] }, "findOne": { type: Object }, "update": { type: Object }, "remove": { type: Object } } }], [import("./inspections/inspections.controller"), { "InspectionsController": { "create": { type: Object }, "findAll": { type: Object }, "findOne": { type: Object }, "update": { type: Object }, "remove": { type: Object } } }], [import("./jobs/jobs.controller"), { "JobsController": { "create": { type: Object }, "findAll": { type: Object }, "findOne": { type: Object }, "update": { type: Object }, "remove": { type: Object } } }]] } };
};