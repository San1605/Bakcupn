export const fetchImages=async(page)=>{
const response = await fetch("https://api.unsplash.com/photos/?client_id=XyNJQuInLQI688muNZaNJZx9i_SQM0dcs29qqMXqPIs");
const data =await response.json()
if(response.status>=400){
 throw new Error(data.errors)
}
return data
}