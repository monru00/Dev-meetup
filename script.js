const hiddenUpload = document.querySelector(".hidden-upload");
const removeButton = document.querySelector(".remove");
const changeButton = document.querySelector(".change");
const submit = document.querySelector(".submit");
const fname = document.querySelector("#fname");
const github = document.querySelector("#github");
const email = document.querySelector("#email");

const preview = document.querySelector(".preview");
const avatarImg = document.querySelector(".avatar-img");
const cloudContainer = document.querySelector(".cloud-container");
const drag = document.querySelector(".drag");
const actionButtons = document.querySelector(".action-buttons");

const fnameError = document.querySelector(".fname-error");
const githubError = document.querySelector(".github-error");
const emailError = document.querySelector(".email-error");
const uploadError = document.querySelector(".upload-error");
const uploadInfo = document.querySelector(".upload-info");

document.querySelector(".upload-box").addEventListener("click", (e) => {
  if (!e.target.closest(".remove, .change")) {
    hiddenUpload.click();
  }
});

hiddenUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = avatarImg.src = reader.result;
    Object.assign(preview.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });
    cloudContainer.style.padding = "1px";
    drag.style.display = "none";
    actionButtons.style.display = "flex";
  };
  reader.readAsDataURL(file);
});

removeButton.addEventListener("click", (e) => {
  e.preventDefault();
  preview.src = "./assets/images/icon-upload.svg";
  hiddenUpload.value = "";
  drag.style.display = "block";
  actionButtons.style.display = "none";
});

changeButton.addEventListener("click", (e) => {
  e.preventDefault();
  hiddenUpload.click();
});

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const fullname = fname.value.trim();
  const githubname = github.value.trim();
  const emailname = email.value.trim();
  const uploadname = hiddenUpload.value;

  [fnameError, githubError, emailError, uploadError].forEach(
    (el) => (el.style.display = "none")
  );
  uploadInfo.style.display = "flex";

  let hasError = false;
  if (!fullname) {
    fnameError.style.display = "flex";
    hasError = true;
  }
  if (!githubname) {
    githubError.style.display = "flex";
    hasError = true;
  }
  if (!emailname || !emailname.includes("@")) {
    emailError.style.display = "flex";
    hasError = true;
  }
  if (!uploadname) {
    uploadInfo.style.display = "none";
    uploadError.style.display = "flex";
    hasError = true;
  }

  if (hasError) return;

  document.querySelector("span.fullname").textContent = fullname;
  document.querySelector("span.fullname-in-ticket").textContent = fullname;
  document.querySelector("span.gname").textContent = githubname;
  document.querySelector("span.email-address").textContent = emailname;

  document.querySelector(".ticket-form").style.display = "none";
  document.querySelector(".congrats").style.display = "flex";
});
