import { fetchData } from "./utils/fetch.js"


async function renderData(){
    const data = await fetchData('assets/api/sales-history.php')
    let tr = ''
    console.log(data)

    data.forEach(sale => {
        tr+= 
        `  


         <tr class="bg-white border-b   border-gray-200">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${sale.id}
            </th>
            <td class="px-6 py-4">
                   ${sale.name}
            </td>
                <td class="px-6 py-4">
                   ${sale.category}
            </td>
                <td class="px-6 py-4">
                   ${sale.quantity}
            </td>
                <td class="px-6 py-4">
                   ${sale.sale_date }
            </td>
        
            
            <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
            </td>
            </tr>
        

        
        
        `
    });

    document.getElementById('tbody').innerHTML = tr;

}

renderData()