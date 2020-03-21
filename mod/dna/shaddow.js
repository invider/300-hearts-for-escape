// travel representation of a hero

const Z = 5

function draw() {
    
    const hero = lab.hero
    const t = hero.travel
    if (!t) return

    const dest = t.destination
    const orig = t.origin

    image(res.person,
        dest.x + t.dx * t.time,
        dest.y + t.dy * t.time,
        res.person.width, res.person.height)
}
