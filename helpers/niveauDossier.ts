// helpers/niveauDossier.ts
export default function niveauDossier(dossier_niveau: string) {
  switch (dossier_niveau) {
    case "0":
      return "Au début";
    case "1":
      return "Ingénieur";
    case "2":
      return "President Commission";
    case "3":
      return "Disponibilité Budgétaire";
    case "4":
      return "Directeur de Fonds Routier";
    case "5":
      return "DTR";
    case "6":
      return "DG";
    case "7":
      return "Sécretaire";
    default:
      return "Niveau inconnu";
  }
}

// @if(dossier.dossier_niveau == "1")
//             <span class="badge bg-info">Ingénieur</span>
//             @elseif(dossier.dossier_niveau == "2")
//             <span class="badge bg-info">President Commission</span>
//             @elseif(dossier.dossier_niveau == "3")
//             <span class="badge bg-info">Disponibilité Budgétaire</span>
//             @elseif(dossier.dossier_niveau == "4")
//             <span class="badge bg-info">Directeur de Fonds Routier</span>
//             @elseif(dossier.dossier_niveau == "5")
//             <span class="badge bg-info">DTR</span>
//             @elseif(dossier.dossier_niveau == "6")
//             <span class="badge bg-info">DG</span>
//             @elseif(dossier.dossier_niveau == "7")
//             <span class="badge bg-info">Sécretaire</span>
//             @endif
