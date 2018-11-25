
export function objTheSame(obj1, obj2){
	if(typeof obj1!==typeof obj2){
		return false;
	}

	for(let key in obj1){
		
		if(Object.keys(obj2).includes(key) && (typeof obj1.key===typeof obj2.key)){
			if(obj1[key] instanceof Array && obj2[key] instanceof Array){
				
				return arrTheSame(obj1[key], obj2[key]);
			}
			else if((typeof(obj1[key]) == "object" && !obj1[key].length) && (typeof(obj2[key]) == "object" && !obj2[key].length)){
				
				return objTheSame(obj1[key], obj2[key]);
			}
			else{
				if(obj1[key]!==obj2[key]){
					return false
				}
			}
		}
		else{
			return false;
		}
	}
	return true;
}

export function arrTheSame(arr1, arr2) {
	if(arr1.length!==arr2.length){
		return false;
	}

	for(let i=0, l=arr1.length; i<l; i++){
		if(typeof arr1[i]===typeof arr2[i]){
			if(arr1[i] instanceof Array && arr2[i] instanceof Array){
				return arrTheSame(arr1[i], arr2[i]);
			}
			else if((typeof(arr1[i]) == "object" && !arr1[i].length) && (typeof(arr2[i]) == "object" && !arr2[i].length)){
				return objTheSame(arr1[i], arr2[i]);
			}	
			else{
				if(arr1[i]!==arr2[i]){
					return false;
				}
			}
		}
		else{
			return false;
		}
	}
	return true;
}

export function addClass(obj, cName){
	let arr=[];
	if(hasClass(obj, cName)){
		return;
	}
	else{
		//console.log(obj.className.split(' '));
		let arr=obj.className.split(' ');
		arr.push(cName);
		obj.className=arr.join(' ');
	}
}

function hasClass(obj, cName){
	let classArr=obj.className.split(' ');
	for(let i=0; i<classArr.length; i++){
		if(classArr[i]===cName){
			return true;
		}
	}
	return false;
}


//对string进行处理，将一个字符串分成3段
export function strChuli(str){
	let arr=[];
	arr[0]=str[0];
	arr[1]=str.slice(1,3);
	arr[2]=str.slice(3);
	if(str.match(/(jpeg)$/g)){
		arr[3]='jpeg';
	}
	else if(str.match(/(png)$/g)){
		arr[3]='png';
	}
	return arr;
}

 
//浏览器前缀的能力检测
export function vendor(el){
	let transformName={
		webkit:'webkitLinearGradient',
		ms:'msLinearGradient',
		moz:'MzoLinearGradient',
		o:'OLinearGradient',
		standard:'linearGradient'
	}
	
	for(let key in transformName){
		//console.log(el.style[transformName[key]]);
		if(el.style[transformName[key]]!==undefined){
			return key;
		}
	}
	return false;
}


