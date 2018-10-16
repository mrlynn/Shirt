// Initialize the StitchClient and AWS service.
import {
  Stitch,
  AnonymousCredential,
  AwsServiceClient,
  AwsRequest
} from 'mongodb-stitch-browser-sdk';

const stitchClient = Stitch.initializeDefaultAppClient("sofloo");

stitchClient.auth
  .loginWithCredential(new AnonymousCredential())
  .then(showUserInterface)

// This function is executed when "Upload Image File" is clicked
export function handleFileUpload() {
  // Grab the file from the input element
  const file = document.getElementById("file-input").files[0];
  if (!file) { return unsetUploadingState().then(noFileError) }

  // Process the image file
  convertImageToBSONBinaryObject(file)
    // Upload the image binary to S3
    .then(result =>{
      const aws = stitchClient.getServiceClient(AwsServiceClient.factory, "AWS_S3");
      const key = `${stitchClient.auth.user.id}-${file.name}`;
      const bucket = "stitch-quickstarts";

      const args = {
         ACL: "public-read",
         Bucket: bucket,
         ContentType: file.type,
         Key: key,
         Body: result
      };

      const request = new AwsRequest.Builder()
        .withService("s3")
        .withAction("PutObject")
        .withRegion("us-east-1")
        .withArgs(args);

      aws.execute(request.build())
        .then(displayImage(bucket, key))
        .then(clearNotifications)
        .catch(handleError)
        .finally(unsetUploadingState);
    
    }).catch(err => {
      console.log('error:', err);
    });
}

function convertImageToBSONBinaryObject(file) {
  return new Promise(resolve => {
    var fileReader = new FileReader();
    fileReader.onload = event => {
      resolve({
        $binary: {
          base64: event.target.result.split(",")[1],
          subType: "00"
        }
      });
    }
    fileReader.readAsDataURL(file);
  })
}

function displayImage(bucket, key) {
  const url = 'http://' + bucket + '.s3.amazonaws.com/' + key;
  imageEl.src = url;
  imageEl.classList.remove("hidden");
  placeholderImageEl.classList.add("hidden");
}


// DOM Element Variables
const imageEl = document.getElementById("uploaded-image");
const placeholderImageEl = document.getElementById("uploaded-image-placeholder");
const uiBlock = document.getElementById("user-interface");
const successEl = document.getElementById("success");
const errorEl = document.getElementById("error");
const buttonEl = document.getElementById("upload-button");
const buttonLabelEl = document.getElementById("loading-button-label");
const spinnerEl = document.getElementById("spinner");

// Helper functions
function transition() { uiBlock.classList.toggle("hidden"); }
function clearNotifications() { [successEl, errorEl].forEach(el => el.innerText = ""); }
function displaytextToDisplay() { successEl.innerText = textToDisplay; }
function noFileError() { handleError({ code: "NoFile" }, "noFile") }
  
function showUserInterface() {
  document
    .getElementById("user-interface")
    .classList.remove("hidden");
}
  
function updateInputValue(inputEl) {
  const file = inputEl.files[0];
  if (file) {
    const fileExtension = file.name.split(".").pop()
    const fileName = file.name.length <= 50
    ? file.name
    : `${file.name.substr(0, 44)}... .${fileExtension}`

    const labelEl = document.querySelector(`label[for=${inputEl.id}]`);
    labelEl.innerText = fileName;
  }
}
  
function handleError(err, errType = "action") {
  console.error(err);
  errorEl.innerText = ({
    "NoMatchingRuleFound": `Service rule prevented ${errType}.`,
    "NoFile":"No file selected for upload."
  })[err.code] || "Something went wrong." + err.code;
  return;
}
  
function setUploadingState() {
  buttonEl.disabled = true;
  buttonLabelEl.innerText = "Uploading Image";
  spinnerEl.classList.remove("hidden");
  return Promise.resolve()
}

function unsetUploadingState() {
  buttonEl.disabled = false;
  buttonLabelEl.innerText = "Upload Image File";
  spinnerEl.classList.add("hidden");
  return Promise.resolve()
}
