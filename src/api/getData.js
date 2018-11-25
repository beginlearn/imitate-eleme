import axios from "axios"

//请求饿了么首页轮播图中的数据
export function getItem(params) {
	//var url="/api/getItem";
	//最后的解决办法，是单独跑一个node服务器，然后设置成允许跨域，之后得到了想要的数据
	var url="http://127.0.0.1:3000/getItem";
	/*var options={
		'latitude':39.935476,
		'longitude':116.209121,
		'templates[]':'main_template&templates[]=favourable_template&templates[]=svip_template',
		'terminal':'h5'
	};*/
	var str='';
	for(var key in params){
		if(key==='lng' || key==="lat"){
			str+='&'+key+'='+params[key];
		}
	}
	url=url+'?'+str.slice(1);
	console.log(1111+''+str);
	console.log(url);

	return new Promise(function (resolve, reject) {
		axios.get(url).	then(function (response){
			resolve(response);
		}).catch(function (err){
			reject(err);
		});
	});
	
}

//请求mock数据，用在饿了么主页中间的两个画
export function getMockData(){
	let url="/mockData";
	return new Promise(function (resolve, reject){
		axios.get(url).then(function (response){
			resolve(response);
		}).catch(function (err){
			reject(err);
		})
	})
}


//请求饿了么主页中综合排序的数据
export function getFilter(path, params){
	let baseUrl="http://127.0.0.1:3000";
	let url=baseUrl+path+'?';
	let str='';
	for(var key in params){
		if(key==='lng' || key==="lat"){
			str+='&'+key+'='+params[key];
		}
	}
	url+=str.slice(1);
	return new Promise(function (resolve, reject){
		axios.get(url).then(function (response){
			resolve(response);
		}).catch(function (err) {
			reject(err);
		})
	})
}




//请求饿了么主页的筛选的数据
//export function 