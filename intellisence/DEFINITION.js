const http = require('http');

var opt = {
  host: 'localhost',
  port: 9999,
}

const handleData = function(response) {
	var str = '';

	response.on('data', (chunk) => {
		str += chunk;
	})
    response.on('abort', () => {
    })
	response.on('end', () => {
        if (response.statusCode === 200) {
            console.log(str)
        } else {
            console.error(str)
        }
	})
}

//process.argv.forEach(a => console.error('!' + a))
let mode = process.argv[2] || 'DEFINITION'
let context = process.argv[3] || ''
let file = process.argv[4] || ''
if (context && !file) {
    file = context
    context = ''
}
console.error('mode: ' + mode)
console.error('context: ' + context)
console.error('file: ' + file)

const modeParam = encodeURIComponent(mode)
const contextParam = encodeURIComponent(context)
const fileParam = encodeURIComponent(file)
opt.path = `/help/definition?mode=${modeParam}&context=${contextParam}&file=${fileParam}`

const request = http.request(opt, handleData).end()
request.on('error', (err) => {
    console.error(err)
})
