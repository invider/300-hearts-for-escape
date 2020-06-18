const http = require('http');

var opt = {
  host: 'localhost',
  port: 9999,
}

function printResult(res) {
	console.log(res)
}

const handleData = function(response) {
	var str = '';

	response.on('data', function (chunk) {
		str += chunk;
	})
	response.on('end', function () {
		printResult(str)
	})
}

let mode = process.argv[2] || 'INTELLISENCE'
let context = process.argv[3] || ''
let file = process.argv[4] || ''
if (context && !file) {
    file = context
    context = ''
}

const modeParam = encodeURIComponent(mode)
const contextParam = encodeURIComponent(context)
const fileParam = encodeURIComponent(file)
opt.path = `/help/autocomplete?mode=${modeParam}&context=${contextParam}&file=${fileParam}`
http.request(opt, handleData).end()

