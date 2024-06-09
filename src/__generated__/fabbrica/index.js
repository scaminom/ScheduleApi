"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineVehicleFactory = exports.defineUserFactory = exports.initialize = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = void 0;
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
        fields: []
    }, {
        name: "Vehicle",
        fields: []
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
function defineUserFactoryInternal({ defaultData: defaultDataResolver, traits: traitsDefs = {} }) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("User", modelFieldDefinitions);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            ci: inputData.ci
        });
        const create = async (inputData = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient().user.create({ data });
        };
        const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
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
function defineUserFactory(options) {
    return defineUserFactoryInternal(options ?? {});
}
exports.defineUserFactory = defineUserFactory;
function autoGenerateVehicleScalarsOrEnums({ seq }) {
    return {
        plate: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "plate", isId: false, isUnique: true, seq }),
        type: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "type", isId: false, isUnique: false, seq }),
        brand: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "brand", isId: false, isUnique: false, seq }),
        model: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "model", isId: false, isUnique: false, seq }),
        color: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Vehicle", fieldName: "color", isId: false, isUnique: false, seq })
    };
}
function defineVehicleFactoryInternal({ defaultData: defaultDataResolver, traits: traitsDefs = {} }) {
    const getFactoryWithTraits = (traitKeys = []) => {
        const seqKey = {};
        const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
        const screen = (0, internal_1.createScreener)("Vehicle", modelFieldDefinitions);
        const build = async (inputData = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateVehicleScalarsOrEnums({ seq });
            const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = (0, internal_1.normalizeResolver)(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue({ seq });
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue({ seq }));
            const defaultAssociations = {};
            const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
            return data;
        };
        const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
        const pickForConnect = (inputData) => ({
            id: inputData.id
        });
        const create = async (inputData = {}) => {
            const data = await build(inputData).then(screen);
            return await getClient().vehicle.create({ data });
        };
        const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
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
function defineVehicleFactory(options) {
    return defineVehicleFactoryInternal(options ?? {});
}
exports.defineVehicleFactory = defineVehicleFactory;
