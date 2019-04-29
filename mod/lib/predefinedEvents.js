module.exports = [
    {
        "message": "You are found yourself on the island, you feel sick, look someone to help you",
        "exec": function(res){
            res.resources.crystals = 0;
            res.resources.herbs = 0;

            lab.hud.island.townList.forEach(t => t.unlock())
        }
    },
    {
        "message": "While you walk you lost some health. Here you can buy some herbs",
        "exec": function(res){
            res.resources.crystals = 0;
            res.resources.herbs = 5;
        }
    },
    {
        "message": "Here you can buy some stones",
        "exec": function(res){
            res.resources.crystals = 5;
            res.resources.herbs = 0;
        }
    },
    {
        "message": "prrrrrrrrrrrrr",
        "exec": function(res){
            res.resources.crystals = 0;
            res.resources.herbs = 0;
        }
    }
];
