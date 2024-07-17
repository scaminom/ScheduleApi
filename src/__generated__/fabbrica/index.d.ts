import type { User } from "@prisma/client";
import type { Appointment } from "@prisma/client";
import type { Reminder } from "@prisma/client";
import type { Inspection } from "@prisma/client";
import type { Job } from "@prisma/client";
import type { Role } from "@prisma/client";
import type { APPOINTMENT_STATUS } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import type { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions<TTransients extends Record<string, unknown>> = {
    readonly seq: number;
} & TTransients;
type TraitName = string | symbol;
type CallbackDefineOptions<TCreated, TCreateInput, TTransients extends Record<string, unknown>> = {
    onAfterBuild?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onBeforeCreate?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onAfterCreate?: (created: TCreated, transientFields: TTransients) => void | PromiseLike<void>;
};
export declare const initialize: (options: import("@quramy/prisma-fabbrica/lib/initialize").InitializeOptions) => void;
type UserFactoryDefineInput = {
    ci?: string;
    color?: string;
    password?: string;
    role?: Role;
    firstName?: string;
    lastName?: string;
    deletedAt?: Date | null;
    Appointment?: Prisma.AppointmentCreateNestedManyWithoutUserInput;
    reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput;
};
type UserTransientFields = Record<string, unknown> & Partial<Record<keyof UserFactoryDefineInput, never>>;
type UserFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: UserFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;
type UserTraitKeys<TOptions extends UserFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface UserFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<Prisma.UserCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "ci">;
    create(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User>;
    createList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<User[]>;
    createList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Pick<User, "ci">>;
}
export interface UserFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends UserFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): UserFactoryInterfaceWithoutTraits<TTransients>;
}
interface UserFactoryBuilder {
    <TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<{}, UserTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends UserTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends UserFactoryDefineOptions<TTransients>>(options?: TOptions) => UserFactoryInterface<TTransients, UserTraitKeys<TOptions>>;
}
export declare const defineUserFactory: UserFactoryBuilder;
type AppointmentuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAppointmentInput["create"]>;
};
type AppointmentFactoryDefineInput = {
    clientName?: string;
    vehicleDescription?: string;
    description?: string | null;
    date?: Date;
    status?: APPOINTMENT_STATUS;
    deletedAt?: Date | null;
    user: AppointmentuserFactory | Prisma.UserCreateNestedOneWithoutAppointmentInput;
    Inspection?: Prisma.InspectionCreateNestedManyWithoutAppointmentInput;
};
type AppointmentTransientFields = Record<string, unknown> & Partial<Record<keyof AppointmentFactoryDefineInput, never>>;
type AppointmentFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<AppointmentFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Appointment, Prisma.AppointmentCreateInput, TTransients>;
type AppointmentFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<AppointmentFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: AppointmentFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Appointment, Prisma.AppointmentCreateInput, TTransients>;
type AppointmentTraitKeys<TOptions extends AppointmentFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface AppointmentFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Appointment";
    build(inputData?: Partial<Prisma.AppointmentCreateInput & TTransients>): PromiseLike<Prisma.AppointmentCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AppointmentCreateInput & TTransients>): PromiseLike<Prisma.AppointmentCreateInput>;
    buildList(list: readonly Partial<Prisma.AppointmentCreateInput & TTransients>[]): PromiseLike<Prisma.AppointmentCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.AppointmentCreateInput & TTransients>): PromiseLike<Prisma.AppointmentCreateInput[]>;
    pickForConnect(inputData: Appointment): Pick<Appointment, "id">;
    create(inputData?: Partial<Prisma.AppointmentCreateInput & TTransients>): PromiseLike<Appointment>;
    createList(list: readonly Partial<Prisma.AppointmentCreateInput & TTransients>[]): PromiseLike<Appointment[]>;
    createList(count: number, item?: Partial<Prisma.AppointmentCreateInput & TTransients>): PromiseLike<Appointment[]>;
    createForConnect(inputData?: Partial<Prisma.AppointmentCreateInput & TTransients>): PromiseLike<Pick<Appointment, "id">>;
}
export interface AppointmentFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends AppointmentFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): AppointmentFactoryInterfaceWithoutTraits<TTransients>;
}
interface AppointmentFactoryBuilder {
    <TOptions extends AppointmentFactoryDefineOptions>(options: TOptions): AppointmentFactoryInterface<{}, AppointmentTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends AppointmentTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends AppointmentFactoryDefineOptions<TTransients>>(options: TOptions) => AppointmentFactoryInterface<TTransients, AppointmentTraitKeys<TOptions>>;
}
export declare const defineAppointmentFactory: AppointmentFactoryBuilder;
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
type ReminderTransientFields = Record<string, unknown> & Partial<Record<keyof ReminderFactoryDefineInput, never>>;
type ReminderFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<ReminderFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Reminder, Prisma.ReminderCreateInput, TTransients>;
type ReminderFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<ReminderFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: ReminderFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Reminder, Prisma.ReminderCreateInput, TTransients>;
type ReminderTraitKeys<TOptions extends ReminderFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface ReminderFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Reminder";
    build(inputData?: Partial<Prisma.ReminderCreateInput & TTransients>): PromiseLike<Prisma.ReminderCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ReminderCreateInput & TTransients>): PromiseLike<Prisma.ReminderCreateInput>;
    buildList(list: readonly Partial<Prisma.ReminderCreateInput & TTransients>[]): PromiseLike<Prisma.ReminderCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.ReminderCreateInput & TTransients>): PromiseLike<Prisma.ReminderCreateInput[]>;
    pickForConnect(inputData: Reminder): Pick<Reminder, "id">;
    create(inputData?: Partial<Prisma.ReminderCreateInput & TTransients>): PromiseLike<Reminder>;
    createList(list: readonly Partial<Prisma.ReminderCreateInput & TTransients>[]): PromiseLike<Reminder[]>;
    createList(count: number, item?: Partial<Prisma.ReminderCreateInput & TTransients>): PromiseLike<Reminder[]>;
    createForConnect(inputData?: Partial<Prisma.ReminderCreateInput & TTransients>): PromiseLike<Pick<Reminder, "id">>;
}
export interface ReminderFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends ReminderFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): ReminderFactoryInterfaceWithoutTraits<TTransients>;
}
interface ReminderFactoryBuilder {
    <TOptions extends ReminderFactoryDefineOptions>(options?: TOptions): ReminderFactoryInterface<{}, ReminderTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends ReminderTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends ReminderFactoryDefineOptions<TTransients>>(options?: TOptions) => ReminderFactoryInterface<TTransients, ReminderTraitKeys<TOptions>>;
}
export declare const defineReminderFactory: ReminderFactoryBuilder;
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
type InspectionTransientFields = Record<string, unknown> & Partial<Record<keyof InspectionFactoryDefineInput, never>>;
type InspectionFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<InspectionFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Inspection, Prisma.InspectionCreateInput, TTransients>;
type InspectionFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<InspectionFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: InspectionFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Inspection, Prisma.InspectionCreateInput, TTransients>;
type InspectionTraitKeys<TOptions extends InspectionFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface InspectionFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Inspection";
    build(inputData?: Partial<Prisma.InspectionCreateInput & TTransients>): PromiseLike<Prisma.InspectionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.InspectionCreateInput & TTransients>): PromiseLike<Prisma.InspectionCreateInput>;
    buildList(list: readonly Partial<Prisma.InspectionCreateInput & TTransients>[]): PromiseLike<Prisma.InspectionCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.InspectionCreateInput & TTransients>): PromiseLike<Prisma.InspectionCreateInput[]>;
    pickForConnect(inputData: Inspection): Pick<Inspection, "id">;
    create(inputData?: Partial<Prisma.InspectionCreateInput & TTransients>): PromiseLike<Inspection>;
    createList(list: readonly Partial<Prisma.InspectionCreateInput & TTransients>[]): PromiseLike<Inspection[]>;
    createList(count: number, item?: Partial<Prisma.InspectionCreateInput & TTransients>): PromiseLike<Inspection[]>;
    createForConnect(inputData?: Partial<Prisma.InspectionCreateInput & TTransients>): PromiseLike<Pick<Inspection, "id">>;
}
export interface InspectionFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends InspectionFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): InspectionFactoryInterfaceWithoutTraits<TTransients>;
}
interface InspectionFactoryBuilder {
    <TOptions extends InspectionFactoryDefineOptions>(options: TOptions): InspectionFactoryInterface<{}, InspectionTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends InspectionTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends InspectionFactoryDefineOptions<TTransients>>(options: TOptions) => InspectionFactoryInterface<TTransients, InspectionTraitKeys<TOptions>>;
}
export declare const defineInspectionFactory: InspectionFactoryBuilder;
type JobinspectionFactory = {
    _factoryFor: "Inspection";
    build: () => PromiseLike<Prisma.InspectionCreateNestedOneWithoutJobsInput["create"]>;
};
type JobFactoryDefineInput = {
    name?: string;
    status?: APPOINTMENT_STATUS;
    inspection: JobinspectionFactory | Prisma.InspectionCreateNestedOneWithoutJobsInput;
};
type JobTransientFields = Record<string, unknown> & Partial<Record<keyof JobFactoryDefineInput, never>>;
type JobFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<JobFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Job, Prisma.JobCreateInput, TTransients>;
type JobFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<JobFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: JobFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Job, Prisma.JobCreateInput, TTransients>;
type JobTraitKeys<TOptions extends JobFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface JobFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Job";
    build(inputData?: Partial<Prisma.JobCreateInput & TTransients>): PromiseLike<Prisma.JobCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.JobCreateInput & TTransients>): PromiseLike<Prisma.JobCreateInput>;
    buildList(list: readonly Partial<Prisma.JobCreateInput & TTransients>[]): PromiseLike<Prisma.JobCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.JobCreateInput & TTransients>): PromiseLike<Prisma.JobCreateInput[]>;
    pickForConnect(inputData: Job): Pick<Job, "id">;
    create(inputData?: Partial<Prisma.JobCreateInput & TTransients>): PromiseLike<Job>;
    createList(list: readonly Partial<Prisma.JobCreateInput & TTransients>[]): PromiseLike<Job[]>;
    createList(count: number, item?: Partial<Prisma.JobCreateInput & TTransients>): PromiseLike<Job[]>;
    createForConnect(inputData?: Partial<Prisma.JobCreateInput & TTransients>): PromiseLike<Pick<Job, "id">>;
}
export interface JobFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends JobFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): JobFactoryInterfaceWithoutTraits<TTransients>;
}
interface JobFactoryBuilder {
    <TOptions extends JobFactoryDefineOptions>(options: TOptions): JobFactoryInterface<{}, JobTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends JobTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends JobFactoryDefineOptions<TTransients>>(options: TOptions) => JobFactoryInterface<TTransients, JobTraitKeys<TOptions>>;
}
export declare const defineJobFactory: JobFactoryBuilder;
