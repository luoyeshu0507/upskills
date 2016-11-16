function fixNubmer(val, fix) {
	if (typeof val !== 'number' || val !== val) return '-';
	val - parseFloat(val.toFixed(6)) === 0 ? 
}

console.log(fixNubmer(1.1));