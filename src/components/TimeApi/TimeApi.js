export async function getTimeApi() {
    
    const res = await fetch("https://worldtimeapi.org/api/ip");
  
    if (!res.ok) {
      throw new Error(res.status);
    }
  
    const dateTime = await res.json();
  
    return dateTime.datetime;
  }