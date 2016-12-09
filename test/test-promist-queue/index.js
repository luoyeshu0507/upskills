let p1 = new Promise((resolve, reject) => {
	setTimeout(resolve, 3000, 'resolved');
});

let p2 = new Promise((resolve, reject) => {
	setTimeout(resolve, 5000, 'resolved');
});

p1.then(r => console.log(1,1))
.then(r => console.log(1,2))
.then(r => p2)
.then(r => console.log(1,4));

p1.then(r => console.log(2,1))
.then(r => console.log(2,2))
.then(r => console.log(2,3))
.then(r => console.log(2,4));