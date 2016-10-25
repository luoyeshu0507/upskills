// function countBlackCells(n, m) {
// 	var max = Math.max(n, m);
// 	var min = Math.min(n, m);
// 	var stepLen = max / min;
// 	var stepCount = getStepLen(stepLen);
// 	var position = 0;
// 	var sum = -2;
// 	for(var i = 0; i < min; i++){
// 		if(position === Math.floor(position)) {
// 			sum += stepCount + 2;
// 		} else {
// 			sum += getStepLen(position + stepLen - getStepLen(position)) + 1;
// 		}
// 		position += stepLen;
// 	}
// 	console.log(sum);
// }

function countBlackCells(n, m) {
	var max = Math.max(n, m);
	var min = Math.min(n, m);
	var stepLen = max / min;
	var stepCount = getStepLen(stepLen);
	var sum = -2;
	for(var i = 0; i < min; i++){
		if(i * max / min === Math.floor(i * max / min)) {
			sum += stepCount + 2;
		} else {
			sum += getStepLen((i + 1) * max / min - getStepLen(i * max / min)) + 1;
		}
	}
	console.log(sum);
}

function getStepLen(len){
	if(len === Math.floor(len)) {
		return len;
	} else {
		return Math.floor(len) + 1;
	}
}

console.log(countBlackCells(66666,88888)) //6