days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(id) {
	this.id = id;	
}

Calendar.prototype.render = function(date) {
	var month_num = date.getMonth();
	var year = date.getFullYear();
	var num_days = month_days[month_num];
	if(month_num == 1 && year % 4 == 0){
		num_days = 29; // for leap years
	}
	var newDate = new Date(year, month_num, 1);
	var day_num = newDate.getDay();
	
	var html = '<table class="calendar" cellspacing="0">';
	html += '<tr>';
	for(i = 0; i < days.length; i++){
		if(i == 1) html += '<th class="month_year left" id="'+ this.id +'.left">&lt;&lt;</th>';
		else if(i == 3) html += '<th class="month_year">' + months[month_num] + ', ' + year +'</th>';
		else if(i == 5) html += '<th class="month_year right" id="'+ this.id +'.right">&gt;&gt;</th>';
		else html += '<th class="month_year"></th>';
	}
	html += '</tr>';
	html += '<tr>';
	for(i = 0; i < days.length; i++){
		html += '<th class="week">' + days[i] + '</th>'
	}
	html += '</tr>';
	
	var first_days = 7 - day_num;
	var prev_month = month_num - 1;
	if(prev_month < 0) prev_month = 11;
	var prev_num_days = month_days[prev_month];
	html += '<tr>';
	for(i = prev_num_days - (6 - first_days); i <= prev_num_days; i++) {
		html += '<td class="other day">' + i + '</td>';
	}
	for(j = 1; j <= first_days; j++) {
		html += '<td class="day">' + j + '</td>';
	}
	html += '</tr>';
	
	var curr_day = first_days + 1;
	for(i = 0; i < 5; i++){
		html += '<tr>';
		for(j = 0; j <= 6; j++) {
			if(curr_day <= num_days) {
				html += '<td class="day">' + curr_day + '</td>';	
			} else {
				html += '<td class="other day">' + (curr_day - num_days) + '</td>';
			}
			curr_day++;
		}	
		if(curr_day > num_days) {
			break;	
		}
		html += '</tr>';
	}
	html += '</table>';
	
	var node = document.getElementById(this.id);
	node.innerHTML = html;
	
	
	var obj = this;
	var left = document.getElementById(this.id + '.left');
	var right = document.getElementById(this.id + '.right');
	
	left.onclick = function(event) {
		var prev_month = date.getMonth() - 1;
		var year = date.getFullYear();
		if(prev_month < 0) {
			prev_month = 11;
			year--;
		}
		obj.render(new Date(months[prev_month] + " 1, " + year.toString()));
	}
	
	right.onclick = function(event) {
		var next_month = date.getMonth() + 1;
		var year = date.getFullYear();
		if(next_month > 11) {
			next_month = 0;
			year += 1;	
		}
		obj.render(new Date(months[next_month] + " 1, " + year.toString()));
	}
}