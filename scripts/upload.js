
// Handle file uploading logic
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        console.log("working");
        alert(`You have selected: ${file.name}`);
        // Here, you can handle the file upload logic, such as sending the file to the server
    }
}