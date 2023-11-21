let dataProject = [];
function upProject(event) {
  event.preventDefault();

  let inputName = document.getElementById("projectName").value;
  let inputstartDate = document.getElementById("startDate").value;
  let inputendDate = document.getElementById("endDate").value;
  let inputDescription = document.getElementById("description").value;

  let checkNodeJs = document.getElementById("nodeJs").checked;
  let checkNextJs = document.getElementById("nextJs").checked;
  let checkReactJs = document.getElementById("reactJs").checked;
  let checkTypeScript = document.getElementById("typeScript").checked;

  let inputFile = document.getElementById("inputFile");
  let file = inputFile.files[0];

  let imageUrl = file ? URL.createObjectURL(file) : "";

  const project = {
    nama_project: inputName,
    tanggal_mulai: inputstartDate,
    tanggal_selesai: inputendDate,
    deskripsi: inputDescription,
    postAt: new Date(),
    ceknode: checkNodeJs,
    ceknext: checkNextJs,
    cekreact: checkReactJs,
    cektype: checkTypeScript,
    file: imageUrl,
  };

  dataProject.push(project);
  console.log("dataProject", dataProject);
  renderProject();
}
