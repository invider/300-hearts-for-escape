'use strict'

// @depends(dna/Screen)
const Screen = dna.Screen

// @depends(res/atlas)
const atlas = res.atlas

const MapScreen = function(dat) {
    this.town = {}
    this.townList = []

    Screen.call(this, dat)

    this.populate()
    sys.spawn('Panel', {}, this)
}
MapScreen.prototype = Object.create(Screen.prototype)

MapScreen.prototype.populate = function() {
    atlas.forEach(t => {
        const town = sys.spawn('Town', t, this)
        this.town[town.name] = town
        this.townList.push(town)
    })
}

module.exports = MapScreen
