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
var TotalUnderAge60=0;
var percentpossitive=0;
var TotalNegitiveTests=0;




//API DATA LOAD 
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
    document.getElementById("TotalNumberOfCovidTests").innerHTML='Negitive:' + '' + TotalNegitiveTests;
    document.getElementById("TotalNumberOfPositiveTests").innerHTML= 'Positive:'+ '' + TotalPositiveTests
    document.getElementById("my-pie-chart-tested").style.background = "conic-gradient(rgb(239, 132, 142) 0.00% " + percentpossitive + "%, rgb(149, 209, 222) " +percentpossitive + "% 100%)";

    document.getElementById("TotalNumberOfPositiveTests_Women").innerHTML= 'Positive Women:'+ '' + TotalPositiveTests_Women
    document.getElementById("TotalNumberOfPositiveTests_Men").innerHTML= 'Positive Men:'+ '' + TotalPositiveTests_Men
    document.getElementById("my-pie-chart").style.background = "conic-gradient(rgb(239, 132, 142) 0.00% " + percentwomen + "%, rgb(149, 209, 222) " +percentwomen + "% 100%)";
  
    document.getElementById("TotalAboveAge_60").innerHTML= 'Positive Above Age 60:'+ '  ' + TotalAboveAge60
    document.getElementById("TotalUnderAge_60").innerHTML= 'Positive Under Age 60:'+ '  ' + TotalUnderAge60
    document.getElementById("my-pie-chart-age").style.background = "conic-gradient(rgb(239, 132, 142) 0.00% " + percentAboveAge60 + "%, rgb(149, 209, 222) " +percentAboveAge60 + "% 100%)";
    
}
   
    //This function calculates the number of people for eah wanted data, and also calculates the % 
function caldata()
{
     TotalNegitiveTests=0;
     TotalNumberOfCovidTests=0;
     TotalPositiveTests =0;
     TotalPositiveTests_Women =0;
     TotalPositiveTests_Men =0;
     percentwomen =0;
     TotalAboveAge60 =0;
     TotalUnderAge60=0;
     percentpossitive=0;
     percentAboveAge60=0;
 
//This function calculate the over all number of people that were tested. 
//If user didnt submit date then retuen length of all recordes 
    if(choice_Date_True_False == false)
    {
    TotalNumberOfCovidTests=  data.result.records.length;
    }
    else
    { console.log("selected date"+ getdate) 
    //if date was submited then get recordes of olny wanted date
        for(var i=0; i<data.result.records.length; i++)
        {   
             if(data.result.records[i].test_date == getdate)
                  { TotalNumberOfCovidTests +=1 }
        }
    }


    //calculate the number of positive tests
     for(var i=0; i<TotalNumberOfCovidTests; i++)
     {
        if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && !choice_Date_True_False)
        TotalPositiveTests ++;
    else if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].test_date == getdate)
    TotalPositiveTests++;
     }
     //% of positive test from over all tests 
     percentpossitive= (TotalPositiveTests/TotalNumberOfCovidTests)*100

    //calculate the number of negitive tests
    TotalNegitiveTests=TotalNumberOfCovidTests-TotalPositiveTests


 //Number of women vs men from total tests that where tested positive 
  for(var i=0; i<TotalNumberOfCovidTests; i++)
  {
      if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05E0\u05E7\u05D1\u05D4' && !choice_Date_True_False)
          TotalPositiveTests_Women ++

      else if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].gender == '\u05E0\u05E7\u05D1\u05D4' && data.result.records[i].test_date == getdate)
          TotalPositiveTests_Women++;
  }
//Number of Men
  TotalPositiveTests_Men=TotalPositiveTests-TotalPositiveTests_Women
  percentwomen= (TotalPositiveTests_Women/TotalPositiveTests)*100

//number of age ablove 60 from total tests that where tested positive 
   for(var i=0; i<TotalNumberOfCovidTests; i++)
   {
         if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].age_60_and_above == 'Yes'  && !choice_Date_True_False)
         TotalAboveAge60++
 
        else if(data.result.records[i].corona_result == '\u05D7\u05D9\u05D5\u05D1\u05D9' && data.result.records[i].age_60_and_above == 'Yes'  && data.result.records[i].test_date == getdate)
           TotalAboveAge60++;
   }
      //number under age ablove 60 from total tests that where tested positive 

   TotalUnderAge60=TotalPositiveTests-TotalAboveAge60
   percentAboveAge60=(TotalAboveAge60/TotalPositiveTests)*100
   
}



function getmydate()
{
    //Users Date Input
    getdate = document.getElementById('start').value;
    caldata();
    setData();
   

}

