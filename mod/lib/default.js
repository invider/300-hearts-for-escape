'use strict'

module.exports = {
    genParamsForTown: function(params){
        params = params || {};
        var rs = {
            resources:{
                herbs: 10,
                crystals: 10
            },
            prices: {
                herbs: 3,
                crystals: 1
            },
            message:"Something strange happened, please check code"
        };
        let ev;
        if (env.turn-1 < lib.predefinedEvents.length){
            ev = lib.predefinedEvents[env.turn-1];
            rs.message = res.txt.startup[env.turn-1]
        } else {
            ev = lib.math.rnde(lib.events);
            rs.message = res.txt.event[lib.events.indexOf(ev)]
        }
        ev.exec(rs);
        return rs;
    }
}
