import { fetchData } from "./utils/fetch.js"
import {showToast, dismissToast} from "./utils/toast.js"
import {Modal} from "./utils/modal.js"
// import {Modal} from "./utils/modalDemo.js"
import { initPagination, hidePagination, showPagination } from "./utils/pagination.js"
import { validateData,  clearValidationErrors,  removeBorderErrors } from "./utils/validation.js"
import { getSearchValue } from "./utils/search.js"
import {SupplierFormTemplate, viewProductTemplate, skeletonTemplate, tableSkeleton}  from "./utils/components/formsTemplates.js";



const modal = new Modal({
    modalContainerId: 'crud-modal',
    modalId: 'modal',
    closeButtonId: 'closeBtn',
    openButtonId: 'add-supplier-btn',
    cancelButtonId: 'cancelBtn',
})


let data = []

async function getData(){
    const response = await fetchData('assets/api/suppliers.php')
    data = response

    initPagination(data, renderDataHTML)
}

getData()
setUpListeners()
applyFilter()


function renderDataHTML(data){
    let tr = ''


    data.forEach(supplier => {
        tr+= 
        `  


         <tr class="bg-white border-b   border-gray-200">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${supplier.id}
            </th>
            <td class="px-6 py-4">
                   ${supplier.name}
            </td>
            <td class="px-6 py-4">
                    ${supplier.address}
            </td>
            <td class="px-6 py-4">
                    ${supplier.email}
            </td>
            <td class="px-6 py-4">
                    ${supplier.phone === null ? '' : supplier.phone}
            </td>
            
            
            <td class="px-6 py-4 text-right flex gap-2 justify-end items-center">
               <button class="edit-btn inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 border border-transparent rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors" data-id="${supplier.id}">
                    <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                    Edit
                </button>
                 <button id="deleteBtn" class="delete-btn inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-100 border border-transparent rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors" data-id="${supplier.id}">
                    <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete
                </button>
            </td>
            </tr>
        

        
        
        `
    });

    document.getElementById('tbody').innerHTML = tr;
    setUpListeners()
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

function setUpListeners(){
    document.querySelectorAll('.edit-btn').forEach(btn => {

        btn.addEventListener('click', async (e) => {

            
            const id = Number(e.target.dataset.id);
            const product = data.find(p => p.id === id);
            const formTemplate  = SupplierFormTemplate(true, product)
            console.log(formTemplate)
            
            modal.loadFormTemplate(formTemplate, null).open()


            console.log(`Edit product with ID: ${id}`);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = Number(e.target.dataset.id);
            const product = productsData.find(p => p.id === productId);
            
            deleteModal.createConfirmation({
                title: 'Delete Product', 
                message: `Are you sure you want to delete product ID:${productId}, Name: ${product.name}?`,
                onConfirm: () => {
                    deleteProduct(product.id)
                }
            }).open()
            console.log(`Delete product with ID: ${productId}`);
        });
    });
}


async function addSupplier(formData, method){

    if(method === 'POST'){

        formData.forEach((value,key) => {
            console.log(value, key)
        })

        // try {
        //     const response = await fetch("assets/api/suppliers.php", {
        //         method: "POST",
        //         body: formData,
        //     });
    
    
        //     const text = await response.text();
        //     console.log("Raw Response:", text); // Debug response
    
        //     const result = JSON.parse(text);
        //     console.log("Parsed JSON:", result);
    
        //     console.log(response.ok)
    
        //     if (response.ok) {
        //         modal.close()
        //         console.log('it works here')
        //         showToast("Product added successfully!", "success");

        //         getData()
        //     } 
        // } catch (error) {
        //     console.error("JSON Parse Error:", error);
        //     alert("Invalid server response. Check console.");
        // } 

    }


}




document.getElementById('add-supplier-btn').addEventListener('click', () => {
    // modal.open()
    const formTemplate = SupplierFormTemplate(false, [])

    modal.loadFormTemplate(formTemplate, addSupplier).open()


})