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
   


    document.getElementById("cough_symptoms").style.width =   Math.trunc(percentcoughsymptoms)+"%";
    document.getElementById("cough_symptoms").innerHTML=  Math.trunc(percentcoughsymptoms)+"%";
    document.getElementById("cough_symptoms_total").innerHTML=  "People who suffered From Coughing Sympton: " + coughsymptoms;

    document.getElementById("Fever_symptoms").style.width = Math.trunc(percentfeversymptoms)+"%";
    document.getElementById("Fever_symptoms").innerHTML= Math.trunc(percentfeversymptoms)+"%";
    document.getElementById("Fever_symptoms_total").innerHTML=  "People who suffered From Fever Sympton: " + feversymptoms;


    document.getElementById("Sore_Throat_symptoms").style.width =  Math.trunc(percentsorethroatsymptoms)+"%";
    document.getElementById("Sore_Throat_symptoms").innerHTML= Math.trunc(percentsorethroatsymptoms)+"%";
    document.getElementById("Sore_Throat_symptoms_total").innerHTML=  "People who suffered From Sore Throat Sympton: " + sorethroat;


    document.getElementById("shortness_breath_symptoms").style.width =  Math.trunc(percentshortnessofbreathsymptoms)+"%";
    document.getElementById("shortness_breath_symptoms").innerHTML= Math.trunc(percentshortnessofbreathsymptoms)+"%";
    document.getElementById("shortness_breath_symptoms_total").innerHTML=  "People who suffered From Shortness Breath Sympton: " + shortnessofbreath;


    document.getElementById("Headache_symptoms").style.width =  Math.trunc(percentheadachesymptoms)+"%";
    document.getElementById("Headache_symptoms").innerHTML= Math.trunc(percentheadachesymptoms)+"%";
    document.getElementById("Headache_symptoms_total").innerHTML=  "People who suffered From Headache Sympton: " + headache;


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


   //number of age each symtop

   //number of cough
   for(var i=0; i<TotalNumberOfCovidTests; i++)
   {
         if(data.result.records[i].cough == '1'  && !choice_Date_True_False)
         coughsymptoms++
 
        else if(data.result.records[i].cough == '1'  && data.result.records[i].test_date == getdate)
        coughsymptoms++;
   }
   percentcoughsymptoms=(coughsymptoms/TotalPositiveTests)*100


      //number of fever
   for(var i=0; i<TotalNumberOfCovidTests; i++)
   {
         if(data.result.records[i].fever == '1'  && !choice_Date_True_False)
         feversymptoms++
 
        else if(data.result.records[i].fever == '1'  && data.result.records[i].test_date == getdate)
        feversymptoms++;
   }
   percentfeversymptoms=(feversymptoms/TotalPositiveTests)*100
   //arr.push(1, percentfeversymptoms);

 //number of sorethroat
    for(var i=0; i<TotalNumberOfCovidTests; i++)
    {
       if(data.result.records[i].sore_throat == '1'  && !choice_Date_True_False)
       sorethroat++

      else if(data.result.records[i].sore_throat == '1'  && data.result.records[i].test_date == getdate)
      sorethroat++;
    }
    percentsorethroatsymptoms=(sorethroat/TotalPositiveTests)*100
    //arr.push(2, percentsorethroatsymptoms);

         //number of shortness_of_breath
    for(var i=0; i<TotalNumberOfCovidTests; i++)
    {
       if(data.result.records[i].shortness_of_breath == '1'  && !choice_Date_True_False)
       shortnessofbreath++

      else if(data.result.records[i].shortness_of_breath == '1'  && data.result.records[i].test_date == getdate)
      shortnessofbreath++;
    }
    percentshortnessofbreathsymptoms=(shortnessofbreath/TotalPositiveTests)*100
    //arr.push(3, percentshortnessofbreathsymptoms);


           //number of head_ache
    for(var i=0; i<TotalNumberOfCovidTests; i++)
    {
       if(data.result.records[i].head_ache == '1'  && !choice_Date_True_False)
       headache++

      else if(data.result.records[i].head_ache == '1'  && data.result.records[i].test_date == getdate)
      headache++;
    }
    percentheadachesymptoms=(headache/TotalPositiveTests)*100
    //arr.push(4, percentheadachesymptoms);


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