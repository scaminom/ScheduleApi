import type { User } from "@prisma/client";
import type { Vehicle } from "@prisma/client";
import type { Appointment } from "@prisma/client";
import type { Reminder } from "@prisma/client";
import type { Inspection } from "@prisma/client";
import type { Job } from "@prisma/client";
import type { Role } from "@prisma/client";
import type { APPOINTMENT_STATUS } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions = {
    readonly seq: number;
};
export declare const initialize: (options: import("@quramy/prisma-fabbrica/lib/initialize").InitializeOptions) => void;
type UserFactoryDefineInput = {
    ci?: string;
    password?: string;
    role?: Role;
    firstName?: string;
    lastName?: string;
    deletedAt?: Date | null;
    Appointment?: Prisma.AppointmentCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
};
type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>;
        };
    };
};
type UserTraitKeys<TOptions extends UserFactoryDefineOptions> = keyof TOptions["traits"];
export interface UserFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "ci">;
    create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
    createList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Pick<User, "ci">>;
}
export interface UserFactoryInterface<TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions> extends UserFactoryInterfaceWithoutTraits {
    use(name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]): UserFactoryInterfaceWithoutTraits;
}
export declare function defineUserFactory<TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<TOptions>;
type VehicleFactoryDefineInput = {
    plate?: string;
    type?: string;
    brand?: string;
    model?: string;
    color?: string;
    Appointment?: Prisma.AppointmentCreateNestedManyWithoutVehicleInput;
};
type VehicleFactoryDefineOptions = {
    defaultData?: Resolver<VehicleFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<VehicleFactoryDefineInput>, BuildDataOptions>;
        };
    };
};
type VehicleTraitKeys<TOptions extends VehicleFactoryDefineOptions> = keyof TOptions["traits"];
export interface VehicleFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Vehicle";
    build(inputData?: Partial<Prisma.VehicleCreateInput>): PromiseLike<Prisma.VehicleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.VehicleCreateInput>): PromiseLike<Prisma.VehicleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.VehicleCreateInput>[]): PromiseLike<Prisma.VehicleCreateInput[]>;
    pickForConnect(inputData: Vehicle): Pick<Vehicle, "id">;
    create(inputData?: Partial<Prisma.VehicleCreateInput>): PromiseLike<Vehicle>;
    createList(inputData: number | readonly Partial<Prisma.VehicleCreateInput>[]): PromiseLike<Vehicle[]>;
    createForConnect(inputData?: Partial<Prisma.VehicleCreateInput>): PromiseLike<Pick<Vehicle, "id">>;
}
export interface VehicleFactoryInterface<TOptions extends VehicleFactoryDefineOptions = VehicleFactoryDefineOptions> extends VehicleFactoryInterfaceWithoutTraits {
    use(name: VehicleTraitKeys<TOptions>, ...names: readonly VehicleTraitKeys<TOptions>[]): VehicleFactoryInterfaceWithoutTraits;
}
export declare function defineVehicleFactory<TOptions extends VehicleFactoryDefineOptions>(options?: TOptions): VehicleFactoryInterface<TOptions>;
type AppointmentvehicleFactory = {
    _factoryFor: "Vehicle";
    build: () => PromiseLike<Prisma.VehicleCreateNestedOneWithoutAppointmentInput["create"]>;
};
type AppointmentuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAppointmentInput["create"]>;
};
type AppointmentFactoryDefineInput = {
    clientName?: string;
    description?: string | null;
    date?: Date;
    status?: APPOINTMENT_STATUS;
    deletedAt?: Date | null;
    vehicle: AppointmentvehicleFactory | Prisma.VehicleCreateNestedOneWithoutAppointmentInput;
    user: AppointmentuserFactory | Prisma.UserCreateNestedOneWithoutAppointmentInput;
    Inspection?: Prisma.InspectionCreateNestedManyWithoutAppointmentInput;
};
type AppointmentFactoryDefineOptions = {
    defaultData: Resolver<AppointmentFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<AppointmentFactoryDefineInput>, BuildDataOptions>;
        };
    };
};
type AppointmentTraitKeys<TOptions extends AppointmentFactoryDefineOptions> = keyof TOptions["traits"];
export interface AppointmentFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Appointment";
    build(inputData?: Partial<Prisma.AppointmentCreateInput>): PromiseLike<Prisma.AppointmentCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AppointmentCreateInput>): PromiseLike<Prisma.AppointmentCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.AppointmentCreateInput>[]): PromiseLike<Prisma.AppointmentCreateInput[]>;
    pickForConnect(inputData: Appointment): Pick<Appointment, "id">;
    create(inputData?: Partial<Prisma.AppointmentCreateInput>): PromiseLike<Appointment>;
    createList(inputData: number | readonly Partial<Prisma.AppointmentCreateInput>[]): PromiseLike<Appointment[]>;
    createForConnect(inputData?: Partial<Prisma.AppointmentCreateInput>): PromiseLike<Pick<Appointment, "id">>;
}
export interface AppointmentFactoryInterface<TOptions extends AppointmentFactoryDefineOptions = AppointmentFactoryDefineOptions> extends AppointmentFactoryInterfaceWithoutTraits {
    use(name: AppointmentTraitKeys<TOptions>, ...names: readonly AppointmentTraitKeys<TOptions>[]): AppointmentFactoryInterfaceWithoutTraits;
}
export declare function defineAppointmentFactory<TOptions extends AppointmentFactoryDefineOptions>(options: TOptions): AppointmentFactoryInterface<TOptions>;
type ReminderuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutRemindersInput["create"]>;
};
type ReminderFactoryDefineInput = {
    title?: string;
    description?: string;
    isCompleted?: boolean | null;
    createdAt?: Date | null;
    deletedAt?: Date | null;
    reminderDate?: Date;
    notificationMinutesBefore?: number;
    notificationSent?: boolean;
    user?: ReminderuserFactory | Prisma.UserCreateNestedOneWithoutRemindersInput;
};
type ReminderFactoryDefineOptions = {
    defaultData?: Resolver<ReminderFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<ReminderFactoryDefineInput>, BuildDataOptions>;
        };
    };
};
type ReminderTraitKeys<TOptions extends ReminderFactoryDefineOptions> = keyof TOptions["traits"];
export interface ReminderFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Reminder";
    build(inputData?: Partial<Prisma.ReminderCreateInput>): PromiseLike<Prisma.ReminderCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ReminderCreateInput>): PromiseLike<Prisma.ReminderCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ReminderCreateInput>[]): PromiseLike<Prisma.ReminderCreateInput[]>;
    pickForConnect(inputData: Reminder): Pick<Reminder, "id">;
    create(inputData?: Partial<Prisma.ReminderCreateInput>): PromiseLike<Reminder>;
    createList(inputData: number | readonly Partial<Prisma.ReminderCreateInput>[]): PromiseLike<Reminder[]>;
    createForConnect(inputData?: Partial<Prisma.ReminderCreateInput>): PromiseLike<Pick<Reminder, "id">>;
}
export interface ReminderFactoryInterface<TOptions extends ReminderFactoryDefineOptions = ReminderFactoryDefineOptions> extends ReminderFactoryInterfaceWithoutTraits {
    use(name: ReminderTraitKeys<TOptions>, ...names: readonly ReminderTraitKeys<TOptions>[]): ReminderFactoryInterfaceWithoutTraits;
}
export declare function defineReminderFactory<TOptions extends ReminderFactoryDefineOptions>(options?: TOptions): ReminderFactoryInterface<TOptions>;
type InspectionappointmentFactory = {
    _factoryFor: "Appointment";
    build: () => PromiseLike<Prisma.AppointmentCreateNestedOneWithoutInspectionInput["create"]>;
};
type InspectionFactoryDefineInput = {
    startDate?: Date;
    endDate?: Date;
    status?: APPOINTMENT_STATUS;
    appointment: InspectionappointmentFactory | Prisma.AppointmentCreateNestedOneWithoutInspectionInput;
    jobs?: Prisma.JobCreateNestedManyWithoutInspectionInput;
};
type InspectionFactoryDefineOptions = {
    defaultData: Resolver<InspectionFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<InspectionFactoryDefineInput>, BuildDataOptions>;
        };
    };
};
type InspectionTraitKeys<TOptions extends InspectionFactoryDefineOptions> = keyof TOptions["traits"];
export interface InspectionFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Inspection";
    build(inputData?: Partial<Prisma.InspectionCreateInput>): PromiseLike<Prisma.InspectionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.InspectionCreateInput>): PromiseLike<Prisma.InspectionCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.InspectionCreateInput>[]): PromiseLike<Prisma.InspectionCreateInput[]>;
    pickForConnect(inputData: Inspection): Pick<Inspection, "id">;
    create(inputData?: Partial<Prisma.InspectionCreateInput>): PromiseLike<Inspection>;
    createList(inputData: number | readonly Partial<Prisma.InspectionCreateInput>[]): PromiseLike<Inspection[]>;
    createForConnect(inputData?: Partial<Prisma.InspectionCreateInput>): PromiseLike<Pick<Inspection, "id">>;
}
export interface InspectionFactoryInterface<TOptions extends InspectionFactoryDefineOptions = InspectionFactoryDefineOptions> extends InspectionFactoryInterfaceWithoutTraits {
    use(name: InspectionTraitKeys<TOptions>, ...names: readonly InspectionTraitKeys<TOptions>[]): InspectionFactoryInterfaceWithoutTraits;
}
export declare function defineInspectionFactory<TOptions extends InspectionFactoryDefineOptions>(options: TOptions): InspectionFactoryInterface<TOptions>;
type JobinspectionFactory = {
    _factoryFor: "Inspection";
    build: () => PromiseLike<Prisma.InspectionCreateNestedOneWithoutJobsInput["create"]>;
};
type JobFactoryDefineInput = {
    name?: string;
    status?: APPOINTMENT_STATUS;
    inspection: JobinspectionFactory | Prisma.InspectionCreateNestedOneWithoutJobsInput;
};
type JobFactoryDefineOptions = {
    defaultData: Resolver<JobFactoryDefineInput, BuildDataOptions>;
    traits?: {
        [traitName: string | symbol]: {
            data: Resolver<Partial<JobFactoryDefineInput>, BuildDataOptions>;
        };
    };
};
type JobTraitKeys<TOptions extends JobFactoryDefineOptions> = keyof TOptions["traits"];
export interface JobFactoryInterfaceWithoutTraits {
    readonly _factoryFor: "Job";
    build(inputData?: Partial<Prisma.JobCreateInput>): PromiseLike<Prisma.JobCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.JobCreateInput>): PromiseLike<Prisma.JobCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.JobCreateInput>[]): PromiseLike<Prisma.JobCreateInput[]>;
    pickForConnect(inputData: Job): Pick<Job, "id">;
    create(inputData?: Partial<Prisma.JobCreateInput>): PromiseLike<Job>;
    createList(inputData: number | readonly Partial<Prisma.JobCreateInput>[]): PromiseLike<Job[]>;
    createForConnect(inputData?: Partial<Prisma.JobCreateInput>): PromiseLike<Pick<Job, "id">>;
}
export interface JobFactoryInterface<TOptions extends JobFactoryDefineOptions = JobFactoryDefineOptions> extends JobFactoryInterfaceWithoutTraits {
    use(name: JobTraitKeys<TOptions>, ...names: readonly JobTraitKeys<TOptions>[]): JobFactoryInterfaceWithoutTraits;
}
export declare function defineJobFactory<TOptions extends JobFactoryDefineOptions>(options: TOptions): JobFactoryInterface<TOptions>;
