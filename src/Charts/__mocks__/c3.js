let functions = ({
    // focus: () => undefined,
    revert: () => undefined,
    load: () => undefined,
    color: () => undefined
})

module.exports = {
    generate: () => functions,
    updateGenerate: (mocked) => {
        functions = {
            ...functions,
            ...mocked
        };
    }
}
