import type { User } from '@prisma/client'
import type { Vehicle } from '@prisma/client'
import type { Reminder } from '@prisma/client'
import type { Role } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import type { Resolver } from '@quramy/prisma-fabbrica/lib/internal'
export {
  resetSequence,
  registerScalarFieldValueGenerator,
  resetScalarFieldValueGenerator,
} from '@quramy/prisma-fabbrica/lib/internal'
type BuildDataOptions = {
  readonly seq: number
}
export declare const initialize: (
  options: import('@quramy/prisma-fabbrica/lib/initialize').InitializeOptions,
) => void
type UserFactoryDefineInput = {
  ci?: string
  password?: string
  role?: Role
  firstName?: string
  lastName?: string
  deletedAt?: Date | null
  reminders?: Prisma.ReminderCreateNestedManyWithoutUserInput
}
type UserFactoryDefineOptions = {
  defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>
    }
  }
}
type UserTraitKeys<TOptions extends UserFactoryDefineOptions> =
  keyof TOptions['traits']
export interface UserFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'User'
  build(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Prisma.UserCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Prisma.UserCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[],
  ): PromiseLike<Prisma.UserCreateInput[]>
  pickForConnect(inputData: User): Pick<User, 'ci'>
  create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>
  createList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[],
  ): PromiseLike<User[]>
  createForConnect(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Pick<User, 'ci'>>
}
export interface UserFactoryInterface<
  TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions,
> extends UserFactoryInterfaceWithoutTraits {
  use(
    name: UserTraitKeys<TOptions>,
    ...names: readonly UserTraitKeys<TOptions>[]
  ): UserFactoryInterfaceWithoutTraits
}
export declare function defineUserFactory<
  TOptions extends UserFactoryDefineOptions,
>(options?: TOptions): UserFactoryInterface<TOptions>
type VehicleFactoryDefineInput = {
  plate?: string
  type?: string
  brand?: string
  model?: string
  color?: string
}
type VehicleFactoryDefineOptions = {
  defaultData?: Resolver<VehicleFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<VehicleFactoryDefineInput>, BuildDataOptions>
    }
  }
}
type VehicleTraitKeys<TOptions extends VehicleFactoryDefineOptions> =
  keyof TOptions['traits']
export interface VehicleFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Vehicle'
  build(
    inputData?: Partial<Prisma.VehicleCreateInput>,
  ): PromiseLike<Prisma.VehicleCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.VehicleCreateInput>,
  ): PromiseLike<Prisma.VehicleCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.VehicleCreateInput>[],
  ): PromiseLike<Prisma.VehicleCreateInput[]>
  pickForConnect(inputData: Vehicle): Pick<Vehicle, 'id'>
  create(inputData?: Partial<Prisma.VehicleCreateInput>): PromiseLike<Vehicle>
  createList(
    inputData: number | readonly Partial<Prisma.VehicleCreateInput>[],
  ): PromiseLike<Vehicle[]>
  createForConnect(
    inputData?: Partial<Prisma.VehicleCreateInput>,
  ): PromiseLike<Pick<Vehicle, 'id'>>
}
export interface VehicleFactoryInterface<
  TOptions extends VehicleFactoryDefineOptions = VehicleFactoryDefineOptions,
> extends VehicleFactoryInterfaceWithoutTraits {
  use(
    name: VehicleTraitKeys<TOptions>,
    ...names: readonly VehicleTraitKeys<TOptions>[]
  ): VehicleFactoryInterfaceWithoutTraits
}
export declare function defineVehicleFactory<
  TOptions extends VehicleFactoryDefineOptions,
>(options?: TOptions): VehicleFactoryInterface<TOptions>
type ReminderuserFactory = {
  _factoryFor: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutRemindersInput['create']
  >
}
type ReminderFactoryDefineInput = {
  title?: string
  description?: string
  isCompleted?: boolean | null
  createdAt?: Date | null
  deletedAt?: Date | null
  reminderDate?: Date
  notificationMinutesBefore?: number
  user?: ReminderuserFactory | Prisma.UserCreateNestedOneWithoutRemindersInput
}
type ReminderFactoryDefineOptions = {
  defaultData?: Resolver<ReminderFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<ReminderFactoryDefineInput>, BuildDataOptions>
    }
  }
}
type ReminderTraitKeys<TOptions extends ReminderFactoryDefineOptions> =
  keyof TOptions['traits']
export interface ReminderFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Reminder'
  build(
    inputData?: Partial<Prisma.ReminderCreateInput>,
  ): PromiseLike<Prisma.ReminderCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.ReminderCreateInput>,
  ): PromiseLike<Prisma.ReminderCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.ReminderCreateInput>[],
  ): PromiseLike<Prisma.ReminderCreateInput[]>
  pickForConnect(inputData: Reminder): Pick<Reminder, 'id'>
  create(inputData?: Partial<Prisma.ReminderCreateInput>): PromiseLike<Reminder>
  createList(
    inputData: number | readonly Partial<Prisma.ReminderCreateInput>[],
  ): PromiseLike<Reminder[]>
  createForConnect(
    inputData?: Partial<Prisma.ReminderCreateInput>,
  ): PromiseLike<Pick<Reminder, 'id'>>
}
export interface ReminderFactoryInterface<
  TOptions extends ReminderFactoryDefineOptions = ReminderFactoryDefineOptions,
> extends ReminderFactoryInterfaceWithoutTraits {
  use(
    name: ReminderTraitKeys<TOptions>,
    ...names: readonly ReminderTraitKeys<TOptions>[]
  ): ReminderFactoryInterfaceWithoutTraits
}
export declare function defineReminderFactory<
  TOptions extends ReminderFactoryDefineOptions,
>(options?: TOptions): ReminderFactoryInterface<TOptions>
