
const fileName = 'demo_54';

let d = document.createElement('div');
d.innerText = fileName;
d.style.textAlign = 'center';
document.body.insertBefore(d, document.getElementById("root"));

require(`./${fileName}`);
