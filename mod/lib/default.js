'use strict'

module.exports = {
    genParamsForTown: function(params){
        params = params || {};
        var res = {
            resources:{
                herbs: 10,
                crystals: 10
            },
            prices: {
                herbs: 3,
                crystals: 1
            },
            message:"Something strange happened, please check code"
        }
        let ev = lib.math.rnde(lib.events);        
        ev.exec(res);
        res.message = ev.message;
        return res;
    }
}