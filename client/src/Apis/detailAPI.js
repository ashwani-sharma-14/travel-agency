import axios from "axios";

export const detailAPi = async(id)=>{
    try{
       const result = await axios.get(`https://travel-agency-website-ujh8.onrender.com/packages/${id}`);
       return result.data
    }catch(err){
        console.err(`err:-`,err.message)
    }
    
    
};

