
export async function fetchData(url){
    const respone =  await fetch(url)
    const data = await respone.json()
    
    return data
}
