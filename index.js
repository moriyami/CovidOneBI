function LoadData(){
var request = new XMLHttpRequest()
request.open('GET', 'https://data.gov.il/api/3/action/datastore_search?resource_id=d337959a-020a-4ed3-84f7-fca182292308&limit=1000', true)
console.log("opened connection")
request.onload = function () {// Begin accessing JSON data here
   var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
debugger;
  const TotalNumberOfCovidTests=  data.result.records.length;
  document.getElementById("TotalNumberOfCovidTests").innerHTML='Numer of total covid tests:' + '' + data.result.records.length;

  //NUMER OF SICK PEOPLE
  var TotalPositiveTests =0;
   for(var i=0; i<TotalNumberOfCovidTests; i++)
   {
        if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9')
             { TotalPositiveTests +=1 }
   }
   document.getElementById("TotalNumberOfPositiveTests").innerHTML= 'Numer Of Sick People:'+ '' + TotalPositiveTests


//NUMBER OF WOMEN 
var TotalPositiveTests_Women =0;
for(var i=0; i<TotalNumberOfCovidTests; i++)
{
    if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05E0\u05E7\u05D1\u05D4')
        { TotalPositiveTests_Women +=1}
}
document.getElementById("TotalNumberOfPositiveTests_Women").innerHTML= 'Numer Of Women:'+ '' + TotalPositiveTests_Women

   
//NUMBER OF MEN 
var TotalPositiveTests_Men =0;
for(var i=0; i<TotalNumberOfCovidTests; i++)
{
    if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05D6\u05DB\u05E8')
    { TotalPositiveTests_Men +=1}
}
document.getElementById("TotalNumberOfPositiveTests_Men").innerHTML= 'Numer Of Men:'+ '' + TotalPositiveTests_Men

   
        console.log("got vailed data print to script")

    } 
      else {
    console.log('error'+request.status);
}}
console.log("finshed - sent request")
request.send()

}

   // }
      
