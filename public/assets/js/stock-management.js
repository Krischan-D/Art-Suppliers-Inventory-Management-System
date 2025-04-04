import { fetchData } from "./utils/fetch.js"
import {showToast, dismissToast} from "./utils/toast.js"
import {Modal} from "./utils/modal.js"
// import {Modal} from "./utils/modalDemo.js"
import { initPagination, showPagination, hidePagination } from "./utils/pagination.js"
import { validateData,  clearValidationErrors,  removeBorderErrors } from "./utils/validation.js"
import { getSearchValue } from "./utils/search.js"
import {ProductFormTemplate, viewProductTemplate, skeletonTemplate, tableSkeleton}  from "./utils/components/formsTemplates.js";


let data = []



async function getData(){
    const response = await fetchData('assets/api/stock-management.php')
    data = response
    initPagination(data, renderDataHTML)

    

}


getData()
applyFilter()


function renderDataHTML(response){
    let tr = '';

    response.forEach(data => {
        tr += 

        `   
        <tr class="bg-white border-b   border-gray-200">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${data.id}
            </th>
            <td class="px-6 py-4">
                ${data.name}
            </td>
            <td class="px-6 py-4">
                ${data.quantity}
            </td>
            <td class="px-6 py-4">
                ${data.threshold}
            </td>
            <td class="px-6 py-4 flex items-center gap-2">
             <div class="size-3 rounded-full  ${data.status === 'Out of Stock' ? 'bg-red-400' : data.status === 'Low Stock' ? 'bg-orange-400' : 'bg-green-400'}"></div>
                ${data.status}
            </td>
            <td class="px-6 py-4">
                ${data.last_updated}
            </td>
            
            <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
            </td>
            </tr>
        
        
        
        
        
        `
    });


    document.getElementById('tbody').innerHTML = tr;
}



function applyFilter() {
    getSearchValue((value) => {
       
        const filteredProducts = data.filter((product) => {
            const searchValue = value
            return(
                product.id.toString().includes(searchValue) ||
                product.name.toLowerCase().includes(searchValue) 
            )
        })

        console.log(filteredProducts)


        if(filteredProducts.length !== 0){
            showPagination()
            initPagination(filteredProducts, renderDataHTML)
        }
        else{
            hidePagination()
            document.getElementById('tbody').innerHTML = 'NO PRODUCTS FOUND'
        }
        

    });

}