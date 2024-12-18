import axios from "axios";

export const adminHomeApi = async()=>{
    try{
       const response = await axios.get("http://localhost:8080/admin/package"||"https://travel-agency-website-ujh8.onrender.com/admin/package")
    return response.data;   
    }catch(err){
        console.error("error while requesting API", err);
    }
  
}

export const adminDetailApi =async(id)=>{
    try{
        const response = await axios.get(`http://localhost:8080/admin/package/${id}`||`https://travel-agency-website-ujh8.onrender.com/admin/package/${id}`)
     return response.data;   
     }catch(err){
         console.error("error while requesting API", err);
     }
}

export const AdminDeleteApi= async(id)=>{
    try{
        const response = await axios.delete(`http://localhost:8080/admin/package/${id}`||`https://travel-agency-website-ujh8.onrender.com/admin/packages/${id}`)
     return response.data;   
     }catch(err){
         console.error("error while requesting API", err);
     }
}