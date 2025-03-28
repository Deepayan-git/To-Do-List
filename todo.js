var globaldb = [];
var allrecords = [];

function initializdb(){
    loaddata();
}

function toggleArrowup(event) {
    console.log('hello');
    $(event).removeClass('ri-arrow-down-double-fill').addClass('ri-arrow-up-double-fill');
    $(event).parent().next().hide();
    $(event).attr('onclick','toggleArrowdown(this)');
}

function toggleArrowdown(event) {
    console.log('hello');
    $(event).removeClass('ri-arrow-up-double-fill').addClass('ri-arrow-down-double-fill');
    $(event).parent().next().show();
    $(event).attr('onclick','toggleArrowup(this)');
}

function textcount(event,totalcharacter){
    console.log('checking');
    var remain = totalcharacter-$(event).val().length;
    $(event).nextAll()[1].innerHTML = remain + ' / ' + totalcharacter + ' characters left' ;
}

function adddata(event){
   var choosedate = $(event).prevAll()[15].value;
   var eventname = $(event).prevAll()[13].value
   var starttime = $(event).prevAll()[7].value
   var endtime = $(event).prevAll()[5].value
   var describtion = $(event).prevAll()[3].value

   if (endtime<=starttime){
    alert('Select correct time');
    return;
   }

   var singlerecord = [];
   singlerecord.push(choosedate);
   singlerecord.push(eventname);
   singlerecord.push(starttime);
   singlerecord.push(endtime);
   singlerecord.push(describtion);

   globaldb.push(singlerecord);


//    sessional stroage

   var allrecord = [];

   try{
    var prevrecord = sessionStorage.getItem('record').split(',');
    allrecord.push(prevrecord);
   }

   catch(err){

   }
   allrecord.push(singlerecord);
   sessionStorage.setItem("record",allrecord);


   loaddata();


}

function loaddata(){
    var x = sessionStorage.getItem('record').split(',');
    if(x.length % 5 !=0)
        x.splice(0,1);
    if(x.length == 0){
            $('#box_con').html('No Record Fround');
            return;
    }

    allrecords = [];
    for(let i=0; i<x.length; i+=5){
        allrecords.push(x.slice(i, i+5));
    }
    console.log(allrecords);

    var boxvalue ='';

    for(let i=0; i<allrecords.length; i++){
        var eventdate   = allrecords[i][0];
        var eventname   = allrecords[i][1];
        var starttime   = allrecords[i][2];
        var endtime     = allrecords[i][3];
        var describtion = allrecords[i][4];
        


       boxvalue += '<div class="box"><div class="topdiv"><div class="star"><i class="ri-star-fill"></i></div><div class="se"><font class="font">'+ 
        eventdate + ' | ' + starttime + '-' + endtime +'<i class="ri-arrow-right-circle-fill"></i> </font></div><div class="arrow"></div><div class="gap"></div><div class="delicon" onclick="deletecard('+i+')"><i class="ri-delete-bin-fill"></i></div></div><p class="hname"> '+eventname+' </p><p class="dropdown"><i class="ri-arrow-down-double-fill" style="font-size: 24px;"onclick="toggleArrowup(this)"></i></p><p class="describ">'+describtion+'</p></div>';
        console.log(boxvalue);

       
        $('#box_con').html(boxvalue);

    }
}

function deletecard(index){
    allrecords.splice(index,1);
    $('#box_con').html('');
    sessionStorage.setItem("record",allrecords);
    if(allrecords.length!=0)
        loaddata();
    else
         $('#box_con').html('No Record Fround');
         
}

  

// function datefilter(dates){
     
//     var y = arrayOfArrays.filter(arr => arr.include('dates'));
//     $('#box_con').html('');

//     for(let i=0; i<y.length; i++){
//         var eventdate   = allrecords[i][0];
//         var eventname   = allrecords[i][1];
//         var starttime   = allrecords[i][2];
//         var endtime     = allrecords[i][3];
//         var describtion = allrecords[i][4];
        


//        boxvalue += '<div class="box"><div class="topdiv"><div class="star"><i class="ri-star-fill"></i></div><div class="se"><font class="font">'+ 
//         eventdate + ' | ' + starttime + '-' + endtime +'<i class="ri-arrow-right-circle-fill"></i> </font></div><div class="arrow"></div><div class="gap"></div><div class="delicon" onclick="deletecard('+i+')"><i class="ri-delete-bin-fill"></i></div></div><p class="hname"> '+eventname+' </p><p class="dropdown"><i class="ri-arrow-down-double-fill" style="font-size: 24px;"onclick="toggleArrowup(this)"></i></p><p class="describ">'+describtion+'</p></div>';
//         console.log(boxvalue);

       
//         $('#box_con').html(boxvalue);
    

//     }
// }