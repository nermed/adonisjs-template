// app entrypoint
import "moment";
import "../views/layout/plugins/jquery/jquery.min.js";
import "../views/layout/plugins/jquery/jquery.nestable.js";
import "../views/layout/dist/js/adminlte.js";
import "../views/layout/dist/js/demo.js";
// import "../views/layout/dist/js/pages/dashboard.js";
import "../views/layout/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "../views/layout/plugins/chart.js/Chart.min.js";
import "../views/layout/plugins/sparklines/sparkline.js";
import "../views/layout/plugins/jqvmap/jquery.vmap.min.js";
import "../views/layout/plugins/jqvmap/maps/jquery.vmap.usa.js";
import "../views/layout/plugins/jquery-knob/jquery.knob.min.js";
import "../views/layout/plugins/select2/js/select2.js";
import "../views/layout/plugins/fontawesome-free/css/all.min.css";
import "../views/layout/plugins/toastr/toastr.min.js";
import "../views/layout/plugins/sweetalert2/sweetalert2.all.js"
// import "../views/layout/plugins/moment/moment.min.js"
import "../views/layout/plugins/daterangepicker/daterangepicker.js";
// import "../views/layout/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js";
// import 'summernote';
// import "../views/layout/plugins/summernote/summernote-bs4.min.js"
import "../views/layout/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
import "../views/layout/plugins/socketio-client/socketio-client.js";
import "./userManagment";
import "./userJs";
import "./dossier";
import './globalFn';
import "./printList";
import "./validationProjet";
import "./selectFiles";
import "./socket";
import "./modalControl";
import "./fournisseurs";


// swal.fire({
//   title: 'Are you sure?',
//   text: "You won't be able to revert this!",
//   icon: 'warning',
//   showCancelButton: true,
//   confirmButtonColor: '#3085d6',
//   cancelButtonColor: '#d33',
//   confirmButtonText: 'Yes, delete it!'
// }).then((result) => {
//   if (result.isConfirmed) {
//     swal.fire(
//       'Deleted!',
//       'Your file has been deleted.',
//       'success'
//     )
//   }
// })
