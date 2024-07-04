"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineReminderFactory = exports.defineVehicleFactory = exports.defineUserFactory = exports.initialize = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = void 0;
const internal_1 = require("@quramy/prisma-fabbrica/lib/internal");
var internal_2 = require("@quramy/prisma-fabbrica/lib/internal");
Object.defineProperty(exports, "resetSequence", { enumerable: true, get: function () { return internal_2.resetSequence; } });
Object.defineProperty(exports, "registerScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.registerScalarFieldValueGenerator; } });
Object.defineProperty(exports, "resetScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.resetScalarFieldValueGenerator; } });
const initializer = (0, internal_1.createInitializer)();
const { getClient } = initializer;
exports.initialize = initializer.initialize;
const modelFieldDefinitions = [{
        name: "User",
        fields: [{
                name: "reminders",
                type: "Reminder",
                relationName: "ReminderToUser"
            }]
    }, {
        name: "Vehicle",
        fields: []
    }, {
        name: "Reminder",
        fields: [{
                name: "user",
                type: "User",
                relationName: "ReminderToUser"
            }]
    }];
function autoGenerateUserScalarsOrEnums({ seq }) {
    return {
        ci: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "ci", isId: true, isUnique: false, seq }),
        password: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "password", isId: false, isUnique: false, seq }),
        role: "ADMIN",
        firstName: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "firstName", isId: false, isUnique: false, seq }),
        lastName: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "lastName", isId: false, isUnique: false, seq })
    };
}
function defineUserFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("User", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            ci: inputData.ci
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().user.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineUserFactory = ((options) => {
    return defineUserFactoryInternal(options ?? {}, {});
});
exports.defineUserFactory.withTransientFields = defaultTransientFieldValues => options => defineUserFactoryInternal(options ?? {}, defaultTransientFieldValues);
function autoGenerateVehicleScalarsOrEnums({ seq }) {
    return {
        plate: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "plate", isId: false, isUnique: true, seq }),
        type: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "type", isId: false, isUnique: false, seq }),
        brand: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "brand", isId: false, isUnique: false, seq }),
        model: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "model", isId: false, isUnique: false, seq }),
        color: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "color", isId: false, isUnique: false, seq })
    };
}
function defineVehicleFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Vehicle", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateVehicleScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().vehicle.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Vehicle",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineVehicleFactory = ((options) => {
    return defineVehicleFactoryInternal(options ?? {}, {});
});
exports.defineVehicleFactory.withTransientFields = defaultTransientFieldValues => options => defineVehicleFactoryInternal(options ?? {}, defaultTransientFieldValues);
function isReminderuserFactory(x) {
    return x?._factoryFor === "User";
}
function autoGenerateReminderScalarsOrEnums({ seq }) {
    return {
        title: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Reminder", fieldName: "title", isId: false, isUnique: false, seq }),
        description: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Reminder", fieldName: "description", isId: false, isUnique: false, seq }),
        reminderDate: (0, internal_1.getScalarFieldValueGenerator)().DateTime({ modelName: "Reminder", fieldName: "reminderDate", isId: false, isUnique: false, seq }),
        notificationMinutesBefore: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "Reminder", fieldName: "notificationMinutesBefore", isId: false, isUnique: false, seq })
    };
}
function defineReminderFactoryInternal({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }, defaultTransientFieldValues) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Reminder", modelFieldDefinitions);
        const handleAfterBuild = (0, internal_1.createCallbackChain)([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = (0, internal_1.createCallbackChain)([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = (0, internal_1.createCallbackChain)([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateReminderScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isReminderuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            };
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const [transientFields] = (0, internal_1.destructure)(defaultTransientFieldValues, inputData);
            const data = await build(inputData).then(screen);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient().reminder.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args) => Promise.all((0, internal_1.normalizeList)(...args).map(data => create(data)));
        const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Reminder",
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name, ...names) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}
exports.defineReminderFactory = ((options) => {
    return defineReminderFactoryInternal(options ?? {}, {});
});
exports.defineReminderFactory.withTransientFields = defaultTransientFieldValues => options => defineReminderFactoryInternal(options ?? {}, defaultTransientFieldValues);
