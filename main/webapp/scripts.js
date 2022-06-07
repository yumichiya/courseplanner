$(document).ready(function() {
    let u;

    function dateValue() { // turns MMMM DD, YYYY to YYYY-DD-MM
        let dateVal = $("#addItemDate").val();
        console.log(dateVal);
		let arr = dateVal.split(" ");
		arr[1] = arr[1].substring(0, arr[1].length - 1);
		for(let i = 0; i < 12; i++) {
			if (arr[0] == months[i]){
				arr[0] = (i+1).toString();
				break;
			}
		}
		if(arr[0].length < 2) {
			arr[0] = "0" + arr[0];
		}
		if(arr[1].length < 2) {
			arr[1] = "0" + arr[1];
		}
		let temp = arr[0];
		arr[0] = arr[2];
		arr[2] = temp;
		arr = arr.join("-");
        console.log(arr);
        console.log(arr[1].substring(0));
		return arr;
	}

    let date = new Date();
    let month = date.getMonth();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", " September", "October", "November", "December"];

    // Month and Year in the navigation
    document.getElementById("monthYear").innerHTML = months[month] + " " + date.getFullYear();

    // Creates the week days
    let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(let i = 0; i < week.length; i++) {
        let weekTag = document.createElement("div");
        weekTag.className = "weekday";
        let weekday = document.createTextNode(week[i].substring(0,3));
        weekTag.appendChild(weekday);
        let weekContainer = document.getElementById("week");
        weekContainer.appendChild(weekTag);
    }
    // Get number of days in the month
    var getDaysInMonth = function(month,year) {
        return new Date(year, month+1, 0).getDate();
    };

    // Create empty boxes in the beginning of the month if the first day starts later than Sunday
    let daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let i = 0;
    while(week[firstDay.getDay()] != week[i++]){
        let dayTag = document.createElement("div");
        dayTag.id = "day";
        let day = document.createTextNode("");
        dayTag.appendChild(day);
        document.getElementById("days").appendChild(dayTag);
    }

    // Creates boxes for each day of the month
    for(let d = 1; d < daysInMonth+1; d++) {
        let dayTag = document.createElement("div");
        dayTag.id = "day-" + d;
        let dayNumTag = document.createElement("div");
        dayNumTag.className = "dayNum";
        let dayNum = document.createTextNode(d);
        dayNumTag.appendChild(dayNum);
        dayTag.appendChild(dayNumTag);
        document.getElementById("days").appendChild(dayTag);
    }

    function updateCalendar(newDate) {
        date = newDate;
        let currentDate = new Date();
        if (date.getMonth() == currentDate.getMonth() && date.getYear() == currentDate.getYear()) {
            date = currentDate;
        }
        // document.getElementById("day").remove();
        var getDaysInMonth = function(month,year) {
            return new Date(year, month+1, 0).getDate();
        };
        let daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
        // console.log(date);
        let month = date.getMonth();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", " September", "October", "November", "December"];

        // Month and Year in the navigation
        document.getElementById("monthYear").innerHTML = months[month] + " " + date.getFullYear();

        // Get number of days in the month
        var getDaysInMonth = function(month,year) {
            return new Date(year, month+1, 0).getDate();
        };

        // Create empty boxes in the beginning of the month if the first day starts later than Sunday
        daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let i = 0;
        while(week[firstDay.getDay()] != week[i++]){
            let dayTag = document.createElement("div");
            dayTag.id = "day";
            let day = document.createTextNode("");
            dayTag.appendChild(day);
            document.getElementById("days").appendChild(dayTag);
        }

        // Creates boxes for each day of the month
        for(let d = 1; d < daysInMonth+1; d++) {
            let dayTag = document.createElement("div");
            dayTag.id = "day-" + d;
            let dayNumTag = document.createElement("div");
            dayNumTag.className = "dayNum";
            let dayNum = document.createTextNode(d);
            dayNumTag.appendChild(dayNum);
            dayTag.appendChild(dayNumTag);
            document.getElementById("days").appendChild(dayTag);
        }

        if (date.getMonth() == currentDate.getMonth() && date.getYear() == currentDate.getYear()) {
            let today = date.getDate();
            let currDayTag = document.getElementById("day-" + today);
            currDayTag.className = "currDay";
        }
        
    }
    // Show today's month
    $('#todayM').click(function() {
        date = new Date();
        document.getElementById("days").innerHTML = '';
        updateCalendar(date);
    });

    // Show next month
    $('#nextM').click(function() {
        if(date.getMonth() == 11) {
            date = new Date(date.getFullYear() + 1, 0);
            document.getElementById("days").innerHTML = '';
            // console.log(date);
            updateCalendar(date);
        } else {
            date = new Date(date.getFullYear(), date.getMonth() + 1);
            document.getElementById("days").innerHTML = '';
            updateCalendar(date);
        }
    });

    // Show previous month
    $('#previousM').click(function() {
        if(date.getMonth() == 1) {
            date = new Date(date.getFullYear() - 1, 0);
            document.getElementById("days").innerHTML = '';
            console.log(date);
            updateCalendar(date);
        } else {
            date = new Date(date.getFullYear(), date.getMonth() - 1);
            document.getElementById("days").innerHTML = '';
            updateCalendar(date);
        }
    });

    // Display clicked day
    $('#days').click(function(event) {
        let day = event.target.id.substring(4);
        if (day > 0){
            // console.log(event.target.id.substring(4));
            date = new Date(date.getFullYear(), date.getMonth(), day);
            document.getElementById("today").innerHTML = "";
            let todayTagW = document.createElement("div");
            todayTagW.className = "sidebarTodayW";
            let todayDayW = document.createTextNode(week[date.getDay()]);
            todayTagW.appendChild(todayDayW);
            document.getElementById("today").appendChild(todayTagW);
            let todayTag = document.createElement("div");
            todayTag.className = "sidebarTodayD";
            let todayDay = document.createTextNode(date.getDate());
            todayTag.appendChild(todayDay);
            document.getElementById("today").appendChild(todayTag);
        }
    });

    // today's date ----------------------------------------------------------------------------

    let today = date.getDate();
    let currDayTag = document.getElementById("day-" + today);
    currDayTag.className = "currDay";

    // today's date in sidebar --------------------------------------
    let todayTagW = document.createElement("div");
    todayTagW.className = "sidebarTodayW";
    let todayDayW = document.createTextNode(week[date.getDay()]);
    todayTagW.appendChild(todayDayW);
    document.getElementById("today").appendChild(todayTagW);
    let todayTag = document.createElement("div");
    todayTag.className = "sidebarTodayD";
    let todayDay = document.createTextNode(date.getDate());
    todayTag.appendChild(todayDay);
    document.getElementById("today").appendChild(todayTag);

    // Create a task list ------------------------------------------------------------------
    let taskList = document.createElement("div");
    taskList.id = "homework";
    taskList.className = "subtitle";
    let taskListText = document.createTextNode("CSC 4610");
    taskList.appendChild(taskListText);
    document.getElementById("sideTitle").appendChild(taskList);

    let taskList1 = document.createElement("div");
    taskList1.id = "exam";
    taskList1.className = "subtitle";
    let taskListText1 = document.createTextNode("Exam");
    taskList1.appendChild(taskListText1);
    document.getElementById("sideTitle").appendChild(taskList1);

    let taskList2 = document.createElement("div");
    taskList2.id = "other";
    taskList2.className = "subtitle";
    let taskListText2 = document.createTextNode("Other");
    taskList2.appendChild(taskListText2);
    document.getElementById("sideTitle").appendChild(taskList2);

    // Create item on the calendar ------------------------------------------------------------
	$("#add").click(function(){
		document.getElementById("addItemModal").style.display = "none";
        console.log(u);
        let d = {
            username: u,
            title: $(".itemTitle").val(),
            date: dateValue(),
            complete: "false"
        };
        $.ajax({type: "POST", url: "Add", data: d, dataType:"json", success: function(data,status){ // insert into sql db
            console.log("SUCCESS " + data);
            console.log("SUCCESS " + status);
        }});
        $.ajax({type: "GET", url: "AddGet", success: function(data, status){ // select from sql db
            console.log(data.item.length);
            for(let i = 0; i < data.item.length; i++) {
                addItemOnCal(data.item[i].title. data.item[i].date);
            }
            console.log("SUCCESS " + status);
        }, error: function(jqXHR, status, error) {
            console.log("error: " + error);
        }});
        
        // $.ajax({type: "POST", url: "Property", data: p, dataType:"json", success: function(data,status){
            
        // }});
	});

	function addItemOnCal(title, date) {
		let itemContainer = document.createElement("div");
	    itemContainer.className = "item";
	    let taskName = title;
	    let dueDate = date;
	
	    let itemL = document.createElement("div");
	    itemL.className = "itemL";
	
	    let itemLTask = document.createElement("div");
	    itemLTask.className = "itemLClass";
	    let itemLClassText = document.createTextNode(taskName);
	    // itemLClass.appendChild(itemLClassText);
	    itemL.appendChild(itemLClassText);
	
	    let itemR = document.createElement("div");
	    itemR.className = "itemR";
	    let itemRText = document.createTextNode(dueDate);
        date = date.split("-");
        console.log(date[1].substring(1));
		if(date[1].substring(0) == "0"){
			date = date[1].substring(1);
		}
        console.log(date[1].substring(1));
	    itemR.appendChild(itemRText);
	    itemContainer.appendChild(itemL);
	    itemContainer.appendChild(itemR);
	    document.getElementById("day-" + today).appendChild(itemContainer);
	}
    
    // Create item on the task -----------------------------------------------------------------
    let itemSContain = document.createElement("div");
    itemSContain.className = "itemSContainer";
    let itemSCheck = document.createElement("input");
    itemSCheck.setAttribute("type", "checkbox");
    itemSCheck.id = "itemSCheck";
    let itemSRow = document.createElement("div");
    itemSRow.className = "itemSRow";
    let itemSLabel = document.createElement("label");
    itemSLabel.id = "itemSLabel";
    let itemSLabelText = document.createTextNode("Homework #3");
    itemSLabel.appendChild(itemSLabelText);
    document.getElementById("homework").appendChild(itemSContain);
    itemSRow.appendChild(itemSCheck);
    itemSRow.appendChild(itemSLabel);

    let itemSDate = document.createElement("div");
    itemSDate.className = "itemSDate";
    let timeText = "11:59PM";
    let itemSDateText = document.createTextNode(timeText);
    itemSDate.appendChild(itemSDateText);
    itemSRow.appendChild(itemSDate);

    itemSContain.appendChild(itemSRow);

    
    
    // Checkbox is checked -----------------------------------------------
    $('#sideTitle').click(function(event) {
        console.log(event.target.parentElement);
        let parent = event.target.parentElement;
        let textLabel = parent.children[1].textContent;
        let textDate = parent.children[2].textContent;
        let taskCheckBox = document.getElementById("itemSCheck");
        if (taskCheckBox.checked == true) {
            document.getElementById("itemSLabel").style.textDecoration = "line-through";
        } else {
            document.getElementById("itemSLabel").style.textDecoration = "none";
        }
    });

    // Add New Item Modal ---------------------------------------------
    let modal = document.getElementById("addItemModal");
    let btn = document.getElementById("addItem");
    let close = document.getElementsByClassName("close");

    $('#addItem').click(function() {
        modal.style.display = "block";
    });

    $('.close').click(function() {
        modal.style.display = "none";
    });


    // select date
    let ifTime = document.getElementById("dateNeedTime");
    $('input[name="date"]').daterangepicker({
        autoApply: true,
        singleDatePicker: true,
        locale: {
            format: 'MMMM D, YYYY',
            daysOfWeek: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
            monthNames: [
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
            ]
        }
    });

	$("#login").click(function(){
        if($("#username").val() == "") {
            document.getElementById("requiredUser").style.display = "block";
        } else {
            document.getElementById("requiredUser").style.display = "none";
        }
        if($("#password").val() == "") {
            document.getElementById("requiredPass").style.display = "block";
        } else {
            document.getElementById("requiredPass").style.display = "none";
        }
		let data = {
            username: $("#username").val(),
            password: $("#password").val()
	    };
        $.ajax({type: "POST", url: "UserLogin", data: data, dataType:"json", success: function(data,status){
			u = $("#username").val();
			console.log(u);
            document.getElementById("loggedIn").style.display = "block";
            document.getElementById("loginScreen").style.display = "none";
        }, error: function(jqXHR, status, error) {
            document.getElementById("invalidLogin").style.display = "block";
        }});
	});

    $("#register").click(function(){
        let userVal = $("#signUpUser").val();
        let passVal = $("#signUpPass").val();
        let conPassVal = $("#signUpConPass").val();
        if(userVal == "" || passVal == "" || conPassVal == "") {
            if(userVal == "") {
                document.getElementById("requiredsignUpUser").style.display = "block";
            } else {
                document.getElementById("requiredsignUpUser").style.display = "none";
            }
            if(passVal == "") {
                document.getElementById("requiredsignUpPass").style.display = "block";
            } else {
                document.getElementById("requiredsignUpPass").style.display = "none";
            }
            if(conPassVal == "") {
                document.getElementById("requiredsignUpConPass").style.display = "block";
            } else {
                document.getElementById("requiredsignUpConPass").style.display = "none";
            }
        } else if(conPassVal != passVal) {
            document.getElementById("invalidPass").style.display = "block";
        } else {
			document.getElementById("invalidPass").style.display = "none";
            let d = {
                username: userVal,
                password: passVal
            };
            $.ajax({type: "GET", url: "UserRegistration", success: function(data,status){
				if(typeof data == 'undefined') {
					document.getElementById("invalidSignUp").style.display = "block";
				} else {
					$.ajax({type: "POST", url: "UserRegistration", data: d, dataType:"json", success: function(data,status){
						alert("Account has been created.");
		            }});
				}
            }, error: function(jqXHR, status, error) {
                document.getElementById("invalidSignUp").style.display = "block";
            }});
        }
	});
	
    $(".signIn").click(function() {
        document.getElementById("signInSection").style.display = "block";
		document.getElementById("signUpSection").style.display = "none";
        $(".signIn").addClass(" active");
        $(".signUp").removeClass(" active");
    });

    $(".signUp").click(function() {
        document.getElementById("signUpSection").style.display = "block";
		document.getElementById("signInSection").style.display = "none";
        $(".signUp").addClass(" active");
        $(".signIn").removeClass(" active");
    });

});

