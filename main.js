let itemName = document.querySelector('#event');
let addItem = document.querySelector('#btn');
let todoList = document.querySelector('#items');
let ftn = document.querySelector('.icon'); //These are the action buttons
var items;
try{
	var items = [...JSON.parse(localStorage.getItem('object'))];
}
catch(e){
	var items = [];
}
let errors = document.querySelector('#error');

addItems(items);

//function to add to Todo list
addItem.addEventListener('click', addEvent);

function addEvent(e){
	e.preventDefault();
	console.log(items)
	if (itemName.value != ''){
		items.push(itemName.value)
		itemName.value = '';
		addItems(items)
	}else{
		errors.innerHTML = 'Name Field cannot be blank';
		window.setTimeout(function(){
			errors.innerHTML = '';
		}, 1000)
	}

	localStorage.setItem('object', JSON.stringify(items))
	console.log(items)
	
}

// to remove all items

let removeAll = document.querySelector('#clear');

removeAll.addEventListener('click', removeAllItems);

function removeAllItems(e){
	if (window.confirm('Do You Want To Delete All Items?')){
		todoList.innerHTML = '';
		localStorage.clear();
		items = [];
	}

}

//to remove specific item
 
todoList.addEventListener('click', removeItem);

function removeItem(e){
	e.preventDefault();
	if (e.target.classList.contains('del')){
		if (window.confirm('Are you sure you want to delete this item?')){
			var li = e.target.parentElement.parentElement;
			todoList.removeChild(li);
			items.splice(items.indexOf(li.firstChild.textContent), 1);
			console.log(items);
			localStorage.setItem('object', JSON.stringify(items))
		}	
	}
}

// to remove completed item

todoList.addEventListener('click', completeItem);

function completeItem(e){
	e.preventDefault();
	if (e.target.classList.contains('complete')){
		if (window.confirm('Have you completed this item?')){
			var li = e.target.parentElement.parentElement;
			console.log(li.firstChild)
			li.firstChild.style.textDecoration = 'line-through'
		}	
	}
}

// to edit an item's name

todoList.addEventListener('click', editItem);

function editItem(e){
	if (e.target.classList.contains('svg')){
		var newname = prompt('enter new name');
		if (newname != '' && newname != null){
			e.target.parentElement.parentElement.firstChild.textContent = newname;
		}else{
			errors.innerHTML = 'Newname Field cannot be blank';
			window.setTimeout(function(){
			errors.innerHTML = '';
		}, 1000)
		}
		
	}

}

// to add all items in local storage back to todo list after refresh

function addItems(arr){
	todoList.innerHTML = '';
	for (let i in arr){
		var li = document.createElement('li');
		li.innerHTML = '<label>' + arr[i] + '</label>';
		var div = document.createElement('div');
		div.className = 'icon'
		div.innerHTML = '<input type="checkbox" name="complete" class="complete" checked>\
						<svg width="478" height="478" viewBox="0 0 478 478" fill="none" xmlns="http://www.w3.org/2000/svg" class= "svg">\
							<g id="edit">\
							<g id="border">\
							<g id="Group">\
							<path id="Vector" d="M392.533 238.8C383.107 238.8 375.466 246.441 375.466 255.867V426.533C375.466 435.959 367.825 443.6 358.399 443.6H51.2C41.774 443.6 34.133 435.959 34.133 426.533V85.2C34.133 75.774 41.774 68.133 51.2 68.133H256C265.426 68.133 273.067 60.492 273.067 51.066C273.067 41.64 265.426 34 256 34H51.2C22.923 34 0 56.923 0 85.2V426.533C0 454.81 22.923 477.733 51.2 477.733H358.4C386.677 477.733 409.6 454.81 409.6 426.533V255.866C409.6 246.441 401.959 238.8 392.533 238.8Z" fill="blue"/>\
							</g>\
							</g>\
							<g id="pencil">\
							<g id="Group_2">\
							<path id="Vector_2" d="M458.742 19.142C446.488 6.88599 429.867 0.00199316 412.536 0.00399316C395.195 -0.0460068 378.557 6.84999 366.337 19.153L141.534 243.937C139.669 245.816 138.262 248.1 137.421 250.61L103.288 353.01C100.309 361.953 105.144 371.617 114.087 374.595C115.822 375.173 117.639 375.468 119.467 375.47C121.299 375.467 123.12 375.173 124.86 374.6L227.26 340.467C229.775 339.627 232.06 338.213 233.933 336.337L458.735 111.535C484.25 86.023 484.253 44.657 458.742 19.142ZM434.603 87.419L212.736 309.286L146.449 331.421L168.516 265.219L390.468 43.353C402.67 31.175 422.435 31.195 434.613 43.397C440.43 49.226 443.708 57.117 443.733 65.352C443.754 73.631 440.467 81.575 434.603 87.419Z" fill="blue"/>\
							</g>\
							</g>\
							</g>\
						</svg>\
						<button class="del">x</button>';
		li.appendChild(div);
		todoList.appendChild(li);
}
}