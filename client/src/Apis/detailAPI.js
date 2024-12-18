import axios from "axios";

export const detailAPi = async(id)=>{
    try{
       const result = await axios.get(`http://localhost:8080/packages/${id}`);
       return result.data
    }catch(err){
        console.err(`err:-`,err.message)
    }
    
    
};

