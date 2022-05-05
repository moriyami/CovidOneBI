var TotalNumberOfCovidTests=0;
var TotalPositiveTests =0;
var TotalPositiveTests_Women =0;
var TotalPositiveTests_Men =0;
var percentwomen =0;
var percentAboveAge60=0
var PickedDate='';
var data=null;
var getdate = null;
var choice_Date_True_False = false;
var TotalAboveAge60=0;
var percentpossitive=0;
var coughsymptoms=0;
var percentcoughsymptoms=0;
var feversymptoms=0;
var percentfeversymptoms=0;
var sorethroat=0;
var percentsorethroatsymptoms =0;
var shortnessofbreath=0;
var percentshortnessofbreathsymptoms=0;
var headache=0;
var percentheadachesymptoms=0;
var arr = [];
var sortArr =[];


//טעינה של נתונים הראשונית
function LoadData(){
var request = new XMLHttpRequest()
request.open('GET', 'https://data.gov.il/api/3/action/datastore_search?resource_id=d337959a-020a-4ed3-84f7-fca182292308&limit=150000', true)
console.log("opened connection")
request.onload = function () {// Begin accessing JSON data here
    data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        caldata();
        setData();
        console.log("got vailed data print to script")

    } 
      else {
    console.log('error'+request.status);
}}
console.log("finshed - sent request")
request.send()

}


function setData()
{
    document.getElementById("TotalNumberOfCovidTests").innerHTML='Numer of total covid tests:' + '' + TotalNumberOfCovidTests;
    document.getElementById("TotalNumberOfPositiveTests").innerHTML= 'Numer Of Sick People:'+ '' + TotalPositiveTests
    document.getElementById("TotalNumberOfPositiveTests_Women").innerHTML= 'Numer Of Women:'+ '' + TotalPositiveTests_Women
    document.getElementById("TotalNumberOfPositiveTests_Men").innerHTML= 'Numer Of Men:'+ '' + TotalPositiveTests_Men
    document.getElementById("my-pie-chart").style.background = "conic-gradient(brown 0.00% " + percentwomen + "%, black " +percentwomen + "% 100%)";
    document.getElementById("my-pie-chart-age").style.background = "conic-gradient(brown 0.00% " + percentAboveAge60 + "%, black " +percentAboveAge60 + "% 100%)";
    document.getElementById("my-pie-chart-tested").style.background = "conic-gradient(brown 0.00% " + percentpossitive + "%, black " +percentpossitive + "% 100%)";
}
   
      
function caldata()
{

     TotalNumberOfCovidTests=0;
     TotalPositiveTests =0;
     TotalPositiveTests_Women =0;
     TotalPositiveTests_Men =0;
     percentwomen =0;
     TotalAboveAge60 =0;
     percentpossitive=0;
     percentAboveAge60=0;
     coughsymptoms=0;
     percentcoughsymptoms=0;
     feversymptoms=0;
     percentfeversymptoms=0;
     sorethroat=0;
     percentsorethroatsymptoms=0;
     shortnessofbreath=0;
     percentshortnessofbreathsymptoms=0;
     headache=0;
     percentheadachesymptoms=0;


    if(choice_Date_True_False == false)
    {
    TotalNumberOfCovidTests=  data.result.records.length;
    }
    else
    { console.log("selected date"+ getdate) 
        for(var i=0; i<data.result.records.length; i++)
        {   
             if(data.result.records[i].test_date == getdate)
                  { TotalNumberOfCovidTests +=1 }
        }
    }


    //NUMER OF SICK PEOPLE
     for(var i=0; i<TotalNumberOfCovidTests; i++)
     {
        if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && !choice_Date_True_False)
        TotalPositiveTests ++;
    else if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].test_date == getdate)
    TotalPositiveTests++;
     }
     percentpossitive= (TotalPositiveTests/TotalNumberOfCovidTests)*100


  //NUMBER OF WOMEN 
 
  for(var i=0; i<TotalNumberOfCovidTests; i++)
  {
      if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05E0\u05E7\u05D1\u05D4' && !choice_Date_True_False)
          TotalPositiveTests_Women ++

          else if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05E0\u05E7\u05D1\u05D4' && data.result.records[i].test_date == getdate)
          TotalPositiveTests_Women++;
  }
  
  //NUMBER OF MEN 
  for(var i=0; i<TotalNumberOfCovidTests; i++)
  {

    if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05D6\u05DB\u05E8' && !choice_Date_True_False)
    TotalPositiveTests_Men ++

    else if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05D6\u05DB\u05E8' && data.result.records[i].test_date == getdate)
    TotalPositiveTests_Men++;
  }

   percentwomen= (TotalPositiveTests_Women/TotalPositiveTests)*100

//number of age ablove 60
   for(var i=0; i<TotalNumberOfCovidTests; i++)
   {
         if(data.result.records[i].age_60_and_above == 'Yes'  && !choice_Date_True_False)
         TotalAboveAge60++
 
        else if(data.result.records[i].age_60_and_above == 'Yes'  && data.result.records[i].test_date == getdate)
           TotalAboveAge60++;
   }
   percentAboveAge60=(TotalAboveAge60/TotalPositiveTests)*100
   
}





function getmydate()
{
    getdate = document.getElementById('start').value;
    caldata();
    setData();

    


}

/*
function getsymtoms()
{

    var sortdedarr =[];
    sortdedarr = arr.sort(); 
    document.getElementById("my-pie-chart-symtomps").style.background = "conic-gradient(brown 0.00% "+ percentfeversymptoms + "%, black " +percentfeversymptoms + "% "+ percentcoughsymptoms + "%, blue " +percentcoughsymptoms + "% " +percentsorethroatsymptoms + "%, pink " +percentsorethroatsymptoms + "% " +percentshortnessofbreathsymptoms + "%, orange " +percentshortnessofbreathsymptoms + "% " +percentheadachesymptoms+"%)";

}*/