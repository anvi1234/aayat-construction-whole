export function dateFormatingValue(date:any){
    let monthDayList=[
        {full:"January",short:"Jan",day:"Sun"},
        {full:"February",short:"Feb",day:"Mon"},
        {full:"March",short:"Mar",day:"Tue"},
        {full:"April",short:"Apr",day:"Wed"},
        {full:"May",short:"May",day:"Thr"},
        {full:"June",short:"Jun",day:"Fri"},
        {full:"July",short:"Jul",day:"Sat"},
        {full:"Augest",short:"Aug",day:"Sun"},
        {full:"September",short:"Sep",day:""},
        {full:"October",short:"Oct",day:""},
        {full:"November",short:"Nov",day:""},
        {full:"December",short:"Dec",day:""},
    ]
    
    function pading(n:any){
      if(n>9)
        return n;
      else
       return "0"+n
    }
   function  dateFormating(date:any){
        let df=new Date(date);
       return `${pading(df.getDate())}-${monthDayList[df.getMonth()].short}-${df.getFullYear()}`
      }

      const result = dateFormating(date);

      console.log("hhhhhhhhhhhh0gggg",result)
      return result;
     
}