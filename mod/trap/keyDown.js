module.exports = function(e) {
    // cheat code accumulator
    if (!_.paused && !e.repeat) {
        lab.cheat.key(e.key)
    }
};
