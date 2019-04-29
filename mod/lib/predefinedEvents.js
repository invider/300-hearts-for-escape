module.exports = [
    {
        "exec": function(rs){
        },
        "ok": function() {
            lab.hud.island.town['central town'].known = true
            lab.hud.island.town['central town'].unlock()
            lab.hud.island.town['dareburg'].locked = true
        },
    },
    {
        "exec": function(rs){ 
            rs.resources = {
                herbs: 3,
                crystals: 0,
                potion: 0,
                gold: 0,
            }
        },
        "ok": function() {
            lab.hud.market.show(
                () => {
                    lab.hud.island.town['dareburg'].unlock()
                    lab.hud.island.town['central town'].locked = true
                },
                (actuator) => {
                    if (actuator.name === 'complete'
                            && lab.hud.market.trade.herbs === 3) {
                        return true
                    }
                    return false
                })
        },
    },
    {
        "exec": function(res){
        },
        "ok": function() {
            lab.hero.herbs = 0
            lab.hud.island.town['port of hope'].known = true
            lab.hud.island.town['port of hope'].unlock()
            lab.hud.island.town['dareburg'].locked = true
        },
    },
    {
        "exec": function(res){
        },
        "ok": function() {
            lab.hud.island.townList.forEach(t => t.unlock())
        },
    }
];
