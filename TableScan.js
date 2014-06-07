function TableScan() 
{
}

TableScan.sumColumn = function(table_id, column_string) {
	var table = document.getElementById(table_id);
	var rows = table.getElementsByTagName("TR");
	var header_row = rows[0];
	var header_cols = header_row.getElementsByTagName("TD");
	var col = -1;
	for(i = 0; i < header_cols.length; i++) {
		if(header_cols[i].textContent == column_string){
			col = i;
		}	
	}
	console.log("Column: " + col);
	if(col == -1) return 0;
	var sum = 0;
	for(j = 1; j < rows.length; j++){
		var curr_cols = rows[j].getElementsByTagName("TD");
		if(curr_cols[col]) {
			var curr_val = parseFloat(curr_cols[col].textContent);
			if(!isNaN(curr_val)) sum += curr_val;	
		}
	}
	return sum;
}

