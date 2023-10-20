printDossierDetail = () => {
  window.print();
};
printProjetDetail = () => {
  console.log($("#letter_print"));
  $("#letter_print").css("display", "block");
  window.print();

}
