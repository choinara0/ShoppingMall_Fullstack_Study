// local에서 작업을 하고 있는지, production에서 작업을 하고 있는지 판단 후, 분기함.
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}