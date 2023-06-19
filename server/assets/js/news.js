const BASE_URL = "http://localhost:8000";

let name=document.querySelector('#name')
let title=document.querySelector('#title')
let text=document.querySelector('#text')
let img=document.querySelector('#img')
let form=document.querySelector('form')


let base64

async function addNews(){
  let date=new Date().toLocaleDateString()
    let obj={
        name:name.value,
        date: date,  
        title:title.value,
        img:base64,
        text:text.value
    }
    await axios.post(`${BASE_URL}/news`,obj)
}

form.addEventListener('submit',(e)=>{
    addNews()
    e.preventDefault()
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
  