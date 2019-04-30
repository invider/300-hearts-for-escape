module.exports = [
    {
        "exec": function(rs){
            rs.resources.herbs = 0
            rs.prices.herbs = 3
        }
    },
    {
        // townfolks are celebrating good harvest of herbs! you got 5 for free.
        "exec": function(rs){
            rs.resources.herbs = 50
            rs.prices.herbs = 1
            lab.hero.herbs += 5
        }
    },
    {
        //a thieve stole crystals!
        "exec": function(rs){
            rs.resources.crystals = 1
            rs.prices.crystals = 6
        }
    },
    {
        // miners discovered new crystal deposit.
        "exec": function(rs){
            rs.resources.crystals = 21
            rs.prices.crystals = 1
        }
    },
    {
        // a drunk alchemist broke down the potion stand.
        "exec": function(rs){
            rs.resources.potion = 0
            rs.prices.potion = 7
        }
    },
    {
        // alchemistry students were practicing potionmaking.
        "exec": function(rs){
            rs.resources.potion = 17
            rs.prices.potion = 2
        }
    },
    {
        // a magician took all the gold for his experiments.
        "exec": function(rs){
            rs.resources.gold = 0
            rs.prices.gold = 8
        }
    },
    {
        // alchemist accidentally turned stone into gold.
        "exec": function(rs){
            rs.resources.gold = 8
            rs.prices.gold = 3
        }
    },
    {
        // rabbits ate half of the herbs in this town.
        "exec": function(rs){
            rs.resources.herbs = rs.resources.herbs/2
            rs.prices.herbs = 3
        }
    },
    {
        // a terrible monster have eaten all resources.
        "exec": function(rs){
            rs.resources.herbs = 0
            rs.prices.herbs = 3
            rs.resources.crystals = 0
            rs.prices.crystals = 5
            rs.resources.potion = 0
            rs.prices.potion = 8
            rs.resources.gold = 0
            rs.prices.gold = 10
        }
    },
    {
        // a gnome caravan with a lot of crystals has arrived to this town.
        "exec": function(rs){
            rs.resources.crystals = 25
            rs.prices.crystals = 1
        }
    },
    {
        // a villager found a barrel of potion in his backyard.
        "exec": function(rs){
            rs.resources.potion = 15
            rs.prices.potion = 1
        }
    },
    {
        // townsfolk are worried about spreading of the desiese
        "exec": function(rs){}
    },
    {
        // people are wary of strangers. don't stay here for long!
        "exec": function(rs){}
    },
    {
        "exec": function(rs){}
    },
    {
        "exec": function(rs){}
    },
    {
        // robbers stole some of your stuff!
        "exec": function(rs){
            lab.hero.rob()
        }
    },
    {
        // local authorities confiscated some of your belongings.
        "exec": function(rs){
            lab.hero.rob()
        }
    },
];
