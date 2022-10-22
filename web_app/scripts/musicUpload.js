function handleFiles(event) {
	var files = event.target.files;
	$("#src").attr("src", URL.createObjectURL(files[0]));
	document.getElementById("audio").load();
}

document
	.getElementById("formFile")
	.addEventListener("change", handleFiles, false);
