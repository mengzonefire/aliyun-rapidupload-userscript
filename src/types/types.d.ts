export {};
declare global {
  interface String {
    fromBase64: any;
  }
  interface XMLHttpRequest {
    callbacks: any;
  }
  interface Window {
    MozMutationObserver: any;
    WebKitMutationObserver: any;
  }
  var ah: any;
  var Swal: any;
  var Base64: any;
}
