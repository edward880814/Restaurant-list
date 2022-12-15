const form = document.querySelector("#new-form");
//- 若在新增/編輯頁面才新增監聽
if (form) {
  form.addEventListener("submit", function onFormSubmitted(event) {
    //- 若表單驗證未通過，則阻止傳送表單
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  });
}
