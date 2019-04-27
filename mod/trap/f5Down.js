let shots = 0

module.exports = function(e) {
    if (e.repeat) return
    lib.img.screenshot('outbreak-' + ++shots)
}
