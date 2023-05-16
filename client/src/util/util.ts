export function setCookie(cname:any, cvalue:any, exdays:any) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  export function  getCookie(cname:any) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
//   export function getQueryParams(query:any) {
//     var qs=window.location.href;
//     var index=qs.indexOf("?");
//     qs=qs.substring(index,qs.length);
//     qs = qs.split('+').join(' ');

//     var params = {},
//         tokens,
//         re = /[?&]?([^=]+)=([^&]*)/g;

//     while (tokens = re.exec(qs)) {
//         params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
//     }
     
//     return params[query];
// }

export function shiftLastDataInto1st(data:any,count=5){
  let obj=[]
   while(data.length>0 && count>=0){
    //  obj.push(data.pop());
     count--;
   }
   return [...obj,...data];
}