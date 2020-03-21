function fadein() {
    lab.background.hidden = true

    lab.spawn(dna.Transition, {
        Z: 1001,
        fadein: 0,
        keep: .5,
        fadeout: 1,

        onFadeout: function() {
            lab.background.hidden = false
            lab.hud.hidden = false

            setTimeout(() => lab.hud.popup.show(
                res.txt.welcome, () => {
                    lab.hud.island.town['dareburg'].known = true
                    lab.hud.island.town['dareburg'].unlock()
                }), 1000)
        },

        onHidden: function() {
            trap('ambient')
        },

    })

}
