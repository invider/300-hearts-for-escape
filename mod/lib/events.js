module.exports = [
    {
        "message": "something happened with crystals",
        "exec": function(res){
            res.resources.crystals = 0;
            res.prices.crystals = 20;
        }
    },
    {
        "message": "something happened with grass",
        "exec": function(res){
            res.resources.herbs = 0;
            res.prices.herbs = 20;
        }
    },
    {
        "message": "Rabbits has been eat half of grass in this town",
        "exec": function(res){
            res.resources.herbs = res.resources.herbs / 2;
            res.prices.herbs = Math.ceil(res.prices.herbs * 2);
        }
    },
    {
        "message": "Thieve stoled 2/3 gems",
        "exec": function(res){
            res.resources.crystals = res.resources.crystals * 2 / 3;
            res.prices.crystals = Math.ceil(res.prices.crystals * 3 / 2);
        }
    },
    {
        "message": "A terrible monsters have eaten all resources",
        "exec": function(res){
            res.resources.crystals = 0;
            res.resources.crystals = 0;
            res.resources.herbs = 0;
            res.prices.herbs = 0;
        }
    },
]

]