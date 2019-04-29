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

MapScreen.prototype.pause = function() {
    this.disabled = true
}

MapScreen.prototype.resume = function() {
    this._ls.forEach(e => {
        if (e._hover) e._hover = false
    })
    this.disabled = false
}

MapScreen.prototype.populate = function() {
    atlas.forEach(t => {
        const town = sys.spawn('Town', t, this)
        this.town[town.name] = town
        this.townList.push(town)
    })
    sys.spawn('Ship', {}, this)
}

module.exports = MapScreen
