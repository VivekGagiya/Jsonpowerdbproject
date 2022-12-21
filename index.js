var jpdbBaseURL="http://api.login2explore.com:5577";
    var jpdbIRL="/api/irl";
    var jpdbIML="/api/iml";
    var empDBName="Project";
    var empRelationName="PRO-REL";
    var connToken="90938353|-31949272162987694|90951993";
$("#projectid").focus();

function saveRecNo2LS(jsonObj){
    var lvData=jSON.parse(jsonObj.data);
    localStorage.setItem("recn",lvData.rec_no);
}

function getEmpIdAsJsonObj(){
    var projectid=$("#projectid").val();
    var jsonStr={
        id:projectid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
    $("#projectname").val(data.projectname);
    $("#assignedto").val(data.assignedto);
    $("#assignmentdate").val(data.assignmentdate);
    $("#dedaline").val(data.deadline);
      
}

function resetForm() {  
    $("#projectid").val("");
    $("#projectname").val("");
    $("#assignedto").val("");
    $("#assignmentdate").val("");  
    $("#deadline").val("");
      
    $("#projectid").prop("disabled",false); 
    $("#save").prop("disabled",true);   
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);

    $("#projectid").focus();
}


function validateData() {
    var projectid,projectname,assignedto,assignmentdate, deadline;
    projectid = $("#projectid").val();
    projectname = $("#projectname").val();
    assignedto = $("#assignto").val();
    assignmentdate= $("#assgnmetdate").val();
    deadline = $("#dealine").val();

    if (projectid === "") {
    
        alert("projectID Required Value");
        $("#projectid").focus();
        return "";
    }

    if (projectname=== "") {
        alert("Project Name is Required Value");
        $("#projectname").focus();
        return "";
    }
    
    if (assignedto === "") {
        alert("Assigned TO is Required Value");
        $("#assignedto").focus();
        return "";
    }
    if (assignmentdate === "") {
        alert("AssignmentDateis Required Value");
        $("#assignmentdate").focus();
        return "";
    }
    if (dedaline === "") {
        alert("Dedaline is Required Value");
        $("#dedaline").focus();
        return "";
    }
   
    var jsonStrObj = {
        id: projectid,
        projectname: projectname,
        assignedto:assignedto,
        assignementdate: assignmentdate,
        dedaline: dedaline
       
    };
    return JSON.stringify(jsonStrObj);
}


function getEmp(){
    var empIdJsonObj = getEmpIdAsJsonObj(); 
    var getRequest=createGET_BY_KEYRequest(connToken,empDBName,empRelationName,empIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#projectName").focus();
        
    }else if (resJsonObj.status === 200){
        
        $("#projectid").prop("disabled",true);
        fillData(resJsonObj);
        
        $("change").prop("disabled", false);
        $("reset").prop("disabled", false);
        $("#projectname").focus();
        
    }  
}


function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
  
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#projectid").focus();
}

function changeData(){
    $("#change").prop("disabled",true);
    jsonchg=validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,empDBName,empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQurery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#empid").focus();
}