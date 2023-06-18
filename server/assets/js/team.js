const BASE_URL="http://localhost:8080"

let workerName=document.querySelector('#name')
let surname=document.querySelector('#surname')
let email=document.querySelector('#email')
let position=document.querySelector('#position')
let img=document.querySelector('#img')
let form=document.querySelector('form')

let base64

async function addMember(){
    let obj={
        name:workerName.value,
        surname:surname.value,
        position:position.value,
        img:base64,
        email:email.value
    }
    await axios.post(`${BASE_URL}/team`,obj)
}

function emptyForm(){
    workerName.value=""
    email.value=""
    surname.value=""
    img.value=""
    email.value=""
}

form.addEventListener("submit",()=>{
    if(workerName.value && surname.value && position.value && img.value && email.value){
        addMember()
    }
    emptyForm()
})

const convertBase64=(file)=>{
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  
const uploadImg= async(e)=>{
    const file=e.target.files[0]
    base64=await convertBase64(file)
  }
  
img.addEventListener('change',(e)=>{
    uploadImg(e)
  })
  