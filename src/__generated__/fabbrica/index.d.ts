import type { User } from '@prisma/client'
import type { Vehicle } from '@prisma/client'
import type { Appointment } from '@prisma/client'
import type { Role } from '@prisma/client'
import type { APOITMENT_STATUS } from '@prisma/client'
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
  Appointment?: Prisma.AppointmentCreateNestedManyWithoutUserInput
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
  Appointment?: Prisma.AppointmentCreateNestedManyWithoutVehicleInput
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
type AppointmentvehicleFactory = {
  _factoryFor: 'Vehicle'
  build: () => PromiseLike<
    Prisma.VehicleCreateNestedOneWithoutAppointmentInput['create']
  >
}
type AppointmentuserFactory = {
  _factoryFor: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutAppointmentInput['create']
  >
}
type AppointmentFactoryDefineInput = {
  clientName?: string
  description?: string | null
  date?: Date
  status?: APOITMENT_STATUS
  deletedAt?: Date | null
  vehicle:
    | AppointmentvehicleFactory
    | Prisma.VehicleCreateNestedOneWithoutAppointmentInput
  user:
    | AppointmentuserFactory
    | Prisma.UserCreateNestedOneWithoutAppointmentInput
}
type AppointmentFactoryDefineOptions = {
  defaultData: Resolver<AppointmentFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<AppointmentFactoryDefineInput>, BuildDataOptions>
    }
  }
}
type AppointmentTraitKeys<TOptions extends AppointmentFactoryDefineOptions> =
  keyof TOptions['traits']
export interface AppointmentFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Appointment'
  build(
    inputData?: Partial<Prisma.AppointmentCreateInput>,
  ): PromiseLike<Prisma.AppointmentCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.AppointmentCreateInput>,
  ): PromiseLike<Prisma.AppointmentCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.AppointmentCreateInput>[],
  ): PromiseLike<Prisma.AppointmentCreateInput[]>
  pickForConnect(inputData: Appointment): Pick<Appointment, 'id'>
  create(
    inputData?: Partial<Prisma.AppointmentCreateInput>,
  ): PromiseLike<Appointment>
  createList(
    inputData: number | readonly Partial<Prisma.AppointmentCreateInput>[],
  ): PromiseLike<Appointment[]>
  createForConnect(
    inputData?: Partial<Prisma.AppointmentCreateInput>,
  ): PromiseLike<Pick<Appointment, 'id'>>
}
export interface AppointmentFactoryInterface<
  TOptions extends
    AppointmentFactoryDefineOptions = AppointmentFactoryDefineOptions,
> extends AppointmentFactoryInterfaceWithoutTraits {
  use(
    name: AppointmentTraitKeys<TOptions>,
    ...names: readonly AppointmentTraitKeys<TOptions>[]
  ): AppointmentFactoryInterfaceWithoutTraits
}
export declare function defineAppointmentFactory<
  TOptions extends AppointmentFactoryDefineOptions,
>(options?: TOptions): AppointmentFactoryInterface<TOptions>
