import { fetchData } from "./utils/fetch.js"
import {showToast, dismissToast} from "./utils/toast.js"
import {Modal} from "./utils/modal.js"
// import {Modal} from "./utils/modalDemo.js"
import { initPagination, hidePagination, showPagination } from "./utils/pagination.js"
import { validateData,  clearValidationErrors,  removeBorderErrors } from "./utils/validation.js"
import { getSearchValue } from "./utils/search.js"
import {ProductFormTemplate, viewProductTemplate, skeletonTemplate, tableSkeleton}  from "./utils/components/formsTemplates.js";


let data = []

async function getData(){
    const response = await fetchData('assets/api/categories.php')
    data = response
    initPagination(data, renderDataHTML)
}

getData()

applyFilter()
function renderDataHTML(response){
    let tr = ''


    response.forEach(category => {
        tr+= 
        `  


         <tr class="bg-white border-b   border-gray-200">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${category.id}
            </th>
            <td class="px-6 py-4">
                   ${category.name}
            </td>
        
            
            <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
            </td>
            </tr>
        

        
        
        `
    });

    document.getElementById('tbody').innerHTML = tr;
    console.log(data)
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