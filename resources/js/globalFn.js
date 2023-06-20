
editElement = (idGenerate) => {
  // console.log($(`#${idGenerate}-editElement`))
  const tdFind = $(`#${idGenerate}-editElement`).parent().parent().find("td");
  for (let i = 0; i < tdFind.length; i++) {
    const td = tdFind[i];
    if (td.attributes.length > 0) {
      $(
        `#addDossierDetail input[name="${td.attributes["fromInputName"].value}"]`
      ).val(td.innerHTML);
      // console.log(td.attributes["fromInputName"].value);
    }
    console.log("td", td.innerHTML);
  }
};

deleteElement = (idGenerate) => {
  $(`#${idGenerate}-editElement`).parent().parent().remove();
};
editElementForDossierEditing = (idTd) => {
  const tdFind = $(`#${idTd}-editElement`).parent().parent().find("td");
  for (let i = 0; i < tdFind.length; i++) {
    const td = tdFind[i];
    if (td.attributes.length > 0) {
      $(
        `#editDossierDetailAdding input[name="${td.attributes["fromInputName"].value}"]`
      ).val(td.innerHTML);
    }
  }
  $("#addDossierInArrayInEdit").text("Modifier");
  $("#addDossierInArrayInEdit").attr("idTr", idTd);
};

editElementForProjetEditing = (idTd) => {
  const tdFind = $(`#${idTd}-editElement`).parent().parent().find("td");
  for (let i = 0; i < tdFind.length; i++) {
    const td = tdFind[i];
    if (td.attributes.length > 0) {
      $(
        `#editProjetCommandeList input[name="${td.attributes["fromInputName"].value}"]`
      ).val(td.innerHTML);
      if (td.attributes["fromInputName"].value == "observation") {
        $(
          `#editProjetCommandeList textarea[name="${td.attributes["fromInputName"].value}"]`
        ).val(td.innerHTML);
      }
    }
  }
  $("#addProjetCommandeEditBtn").text("Modifier");
  $("#addProjetCommandeEditBtn").attr("idTr", idTd);
};
