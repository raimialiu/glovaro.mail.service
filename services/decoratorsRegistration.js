function DecoratorFN(fastify) {
    const _fn = fastify
    function register(name, value, dependecies = [], handler=null) {
        _fn.decorate(name, value, dependecies)
    }

    return {
        register
    }
}

module.exports = {DecoratorFN}