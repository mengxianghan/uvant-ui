/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 */
export const unknownProp = null

export const numericProp = [Number, String]

export const truthProp = {
    type: Boolean,
    default: true,
}

export const makeRequiredProp = (type) => ({
    type,
    required: true,
})

export const makeArrayProp = () => ({
    type: Array,
    default: () => [],
})

export const makeNumberProp = (defaultVal) => ({
    type: Number,
    default: defaultVal,
})

export const makeNumericProp = (defaultVal) => ({
    type: numericProp,
    default: defaultVal,
})

export const makeStringProp = (defaultVal, validator) => ({
    type: String,
    default: defaultVal,
    validator,
})

export const makeFunctionProp = (defaultVal = () => {}) => ({
    type: Function,
    default: defaultVal,
})
