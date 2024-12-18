import axios from "axios";

export const adminHomeApi = async()=>{
    try{
       const response = await axios.get("https://travel-agency-website-ujh8.onrender.com/admin/package")
    return response.data;   
    }catch(err){
        console.error("error while requesting API", err);
    }
  
}

export const adminDetailApi =async(id)=>{
    try{
        const response = await axios.get(`https://travel-agency-website-ujh8.onrender.com/admin/package/${id}`)
     return response.data;   
     }catch(err){
         console.error("error while requesting API", err);
     }
}

export const AdminDeleteApi= async(id)=>{
    try{
        const response = await axios.delete(`https://travel-agency-website-ujh8.onrender.com/admin/package/${id}`)
     return response.data;   
     }catch(err){
         console.error("error while requesting API", err);
     }
}