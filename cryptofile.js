
function load(){
	tag = document.getElementById('fileinput');
	//output = document.getElementById('output');
	
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		
		var file = tag.files[0];
		//instiantiate 
		var reader = new FileReader();
		
		reader.onloadend = function(evt){
			//output.value = evt.target.result;
			
			compute_digest(evt.target.result);
		}
		
		//reader.readAsText(file, 'ASCII');
		reader.readAsArrayBuffer(file);
	} else {
		alert('The File APIs are not fully supported by your browser.');
	}
}


function compute_digest(filetext){
	var promise = crypto.subtle.digest("SHA-256", filetext);
	promise.then(function (digest){
					print_out(digest)}, function (digest){
					print_out('Error')});
}

function print_out(out){
	output = document.getElementById('output');
	if(out == 'Error')
		output.value = 'Digest of the file: ' + out;
	else
		output.value = 'Digest of the file: ' + decode(out);
}

function decode(buf) {
	var view   = new Int8Array(buf);
	var decoded = ' ';
	for(var i = 0; i < view.byteLength ; i++){
		decoded = decoded + view[i] + ':';
	}
	return decoded;
}