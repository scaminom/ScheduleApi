import type { User } from "@prisma/client";
import type { Vehicle } from "@prisma/client";
import type { Reminder } from "@prisma/client";
import type { Role } from "@prisma/client";
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
    password?: string;
    role?: Role;
    firstName?: string;
    lastName?: string;
    deletedAt?: Date | null;
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
type VehicleFactoryDefineInput = {
    plate?: string;
    type?: string;
    brand?: string;
    model?: string;
    color?: string;
};
type VehicleTransientFields = Record<string, unknown> & Partial<Record<keyof VehicleFactoryDefineInput, never>>;
type VehicleFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<VehicleFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Vehicle, Prisma.VehicleCreateInput, TTransients>;
type VehicleFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<VehicleFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: VehicleFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Vehicle, Prisma.VehicleCreateInput, TTransients>;
type VehicleTraitKeys<TOptions extends VehicleFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;
export interface VehicleFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Vehicle";
    build(inputData?: Partial<Prisma.VehicleCreateInput & TTransients>): PromiseLike<Prisma.VehicleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.VehicleCreateInput & TTransients>): PromiseLike<Prisma.VehicleCreateInput>;
    buildList(list: readonly Partial<Prisma.VehicleCreateInput & TTransients>[]): PromiseLike<Prisma.VehicleCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.VehicleCreateInput & TTransients>): PromiseLike<Prisma.VehicleCreateInput[]>;
    pickForConnect(inputData: Vehicle): Pick<Vehicle, "id">;
    create(inputData?: Partial<Prisma.VehicleCreateInput & TTransients>): PromiseLike<Vehicle>;
    createList(list: readonly Partial<Prisma.VehicleCreateInput & TTransients>[]): PromiseLike<Vehicle[]>;
    createList(count: number, item?: Partial<Prisma.VehicleCreateInput & TTransients>): PromiseLike<Vehicle[]>;
    createForConnect(inputData?: Partial<Prisma.VehicleCreateInput & TTransients>): PromiseLike<Pick<Vehicle, "id">>;
}
export interface VehicleFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends VehicleFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): VehicleFactoryInterfaceWithoutTraits<TTransients>;
}
interface VehicleFactoryBuilder {
    <TOptions extends VehicleFactoryDefineOptions>(options?: TOptions): VehicleFactoryInterface<{}, VehicleTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends VehicleTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends VehicleFactoryDefineOptions<TTransients>>(options?: TOptions) => VehicleFactoryInterface<TTransients, VehicleTraitKeys<TOptions>>;
}
export declare const defineVehicleFactory: VehicleFactoryBuilder;
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
