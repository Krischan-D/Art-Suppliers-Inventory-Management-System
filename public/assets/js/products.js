import { fetchData } from "./utils/fetch.js"
import {showToast, dismissToast} from "./utils/toast.js"
import {Modal} from "./utils/modal.js"
// import {Modal} from "./utils/modalDemo.js"
import { initPagination, hidePagination, showPagination } from "./utils/pagination.js"
import { validateData,  clearValidationErrors,  removeBorderErrors } from "./utils/validation.js"
import { getSearchValue } from "./utils/search.js"
import {ProductFormTemplate, viewProductTemplate, skeletonTemplate, tableSkeleton}  from "./utils/components/formsTemplates.js";

let productsData = []
let categoriesData = []
let suppliersData = []

const modal = new Modal({
    modalContainerId: 'crud-modal',
    modalId: 'modal',
    closeButtonId: 'closeBtn',
    openButtonId: 'addProductButton',
    cancelButtonId: 'cancelBtn',
})

const deleteModal = new Modal({
    modalContainerId: 'popup-modal',
    modalId: 'deleteModal',
    closeButtonId: 'closeDeleteModal',
    cancelButtonId: 'cancelButton'
});


const viewModal = new Modal({
    modalContainerId: 'view-modal',
    modalId: 'viewModal',
    closeButtonId: 'closeBtn',
    cancelButtonId: 'cancelButton'
});


renderData()
applyFilter()
setUpListeners()

async function renderData() {
    try {

        tableSkeleton(7, 7)

        const { products, suppliers, categories } = await fetchData('assets/api/products.php');
        productsData = products;
        categoriesData = categories;
        suppliersData = suppliers;

        initPagination(products, renderProducts);

        renderSelect(categories, 'category');
        renderSelect(suppliers, 'supplier');


        setUpListeners();
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

function renderProducts(products) {
    let tr = '';
 
   
    products.forEach(data => {
        tr += `
            <tr class="bg-white border-b border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    ${data.id}
                </th>
                <td class="px-6 py-4">${data.name}</td>
                <td class="px-6 py-4">${data.category}</td>
                <td class="px-6 py-4">${data.supplier}</td>
                <td class="px-6 py-4">${data.price}</td>
                <td class="px-6 py-4 max-w-xs truncate">${data.description}</td>
                <td class="px-6 py-4 text-right flex gap-2 justify-end items-center">
    <button class="edit-btn inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 border border-transparent rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors" data-id="${data.id}">
        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
        Edit
    </button>
    
    <button class="view-btn inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 border border-transparent rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors" data-id="${data.id}">
        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        View
    </button>
    
    <button id="deleteBtn" class="delete-btn inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-100 border border-transparent rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors" data-id="${data.id}">
        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        Delete
    </button>
</td>
            </tr>
        `;
    });

    

    document.getElementById('tbody').innerHTML = tr;
    setUpListeners()
  
       
}


function setUpListeners(){
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            // Prevent previous event handlers
            e.stopPropagation();
    
   
            const button = e.target.closest('.edit-btn');
            if (!button) return;
    
           
            if (!productsData || productsData.length === 0) {
                console.error("Product data is not loaded yet.");
                showToast("Please wait, data is still loading.", "error");
    
                // Show skeleton loader
                const skeleton = skeletonTemplate();
                modal.loadFormTemplate(skeleton).open();
                return;
            }
    

            const productId = Number(button.dataset.id);
    
        
            if (isNaN(productId)) {
                console.error("Invalid product ID");
                showToast("Error: Invalid product ID", "error");
                return;
            }
    
        
            const product = productsData.find(p => p.id === productId);
    
            if (!product) {
                console.error(`Product with ID ${productId} not found`);
                showToast(`Product with ID ${productId} not found`, "error");
    
                const skeleton = skeletonTemplate();
                modal.loadFormTemplate(skeleton).open();
                return;
            }
    
            // // Validate product data before rendering
            // const requiredFields = ['id', 'name', 'category', 'supplier', 'price', 'description'];
            // const missingFields = requiredFields.filter(field => !product[field] && product[field] !== 0);
    
            // if (missingFields.length > 0) {
            //     console.error(`Product is missing required fields: ${missingFields.join(', ')}`);
            //     showToast("Error: Product data is incomplete", "error");
            //     return;
            // }
    
            // When data is ready and validated, render the edit form
            const formTemplate = ProductFormTemplate(true, product, categoriesData, suppliersData);
            modal.loadFormTemplate(formTemplate, submitProduct).open();
    
            console.log(`Edit product with ID: ${productId}`);
        });
    });

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevent any previous event handlers
            e.stopPropagation();
            
            // Find the closest button if clicked on child element
            const button = e.target.closest('.view-btn');
            if (!button) return;
            
            // Check if data is loaded
            if (!productsData || productsData.length === 0) {
                console.error("Product data is not loaded yet.");
                showToast("Please wait, data is still loading.", "error");
                
                // Show skeleton loader
                const skeleton = skeletonTemplate();
                viewModal.loadFormTemplate(skeleton).open();
                return;
            }
            
            // Get product ID from the button, not the target
            const productId = Number(button.dataset.id);
            
            // Validate productId
            if (isNaN(productId)) {
                console.error("Invalid product ID");
                showToast("Error: Invalid product ID", "error");
                return;
            }
            
            // Find the product
            const product = productsData.find(p => p.id === productId);
            
            // If product not found, show skeleton and error
            if (!product) {
                console.error(`Product with ID ${productId} not found`);
                showToast(`Product with ID ${productId} not found`, "error");
                
                const skeleton = skeletonTemplate();
                viewModal.loadFormTemplate(skeleton).open();
                return;
            }
            
            // Validate product data before rendering
            const requiredFields = ['id', 'name', 'category', 'supplier', 'price', 'description'];
            const missingFields = requiredFields.filter(field => !product[field] && product[field] !== 0);
            
            if (missingFields.length > 0) {
                console.error(`Product is missing required fields: ${missingFields.join(', ')}`);
                showToast("Error: Product data is incomplete", "error");
                return;
            }
            
            // When data is ready and validated, render the actual product template
            const template = viewProductTemplate(product);
            viewModal.loadFormTemplate(template).open();
            
            console.log(`View product with ID: ${productId}`);
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

function renderSelect(data, selectId, container = document) {
    console.log("Rendering Select for:", selectId, "Data:", data);
    
    const selectElement = container.getElementById(selectId);
    if (!selectElement) {
        console.error(`Select element with ID '${selectId}' not found`);
        return;
    }

    let options = `<option value="">Select ${selectId}</option>`;
    data.forEach(value => {
        options += `<option value="${value.name}">${value.name}</option>`;
    });

    selectElement.innerHTML = options;
}

function applyFilter() {
    getSearchValue((value) => {
       
        const filteredProducts = productsData.filter((product) => {
            const searchValue = value
            return(
                product.id.toString().includes(searchValue) ||
                product.name.toLowerCase().includes(searchValue) ||
                product.category.toLowerCase().includes(searchValue)
            )
        })

        console.log(filteredProducts)


        if(filteredProducts.length !== 0){
            showPagination()
            initPagination(filteredProducts, renderProducts)
        }
        else{
            hidePagination()
            document.getElementById('tbody').innerHTML = 'NO PRODUCTS FOUND'
        }
        

    });

}


async function deleteProduct(productId){
    console.log(productId)

    try{
    
        const response = await fetch('assets/api/products.php', {
            method: 'DELETE',
            body: JSON.stringify(productId)
        })


        const text = await response.text();
        console.log("Raw Response:", text); // Debug response

        const result = JSON.parse(text);
        console.log("Parsed JSON:", result);

        if(response.ok){
            console.log('product deleted')
            showToast("Product deled successfully!", "success");
            renderData()
        
        }


    
    }catch(error){
        console.log(`An error has occured: ${error}`)
    }
    

}


// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("form").addEventListener("submit", async function (event) {

//         event.preventDefault(); 
//         const formData = new FormData(this);
//         const requiredFields = ["name", "price", "category", "supplier", "description", 'stock', 'category', 'supplier'];
//         const validation = validateData(formData, requiredFields)
//         console.log(formData.get('category'))
//         removeBorderErrors(requiredFields)
//         clearValidationErrors(requiredFields);

//         if (Object.keys(validation).length > 0) {
//             for (let key in validation) {
//                 document.getElementById(`${key}Error`).innerHTML = validation[key].message;
//                 document.getElementById(`${key}Error`).style.display = 'block';
//                 document.getElementById(`${key}`).style.border = '1px solid red';
//             }
//             return; 
//         }

    

        

     
//     });
// });


// document.getElementById('imageInput').addEventListener('change', function (event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();    
       
//         reader.onload = function (e) {
//             document.getElementById('imageName').innerHTML = file.name
//             document.getElementById('imageName').style.display = 'block';
//             document.getElementById('imagePreview').src = e.target.result;
//             document.getElementById('imagePreview').style.display = 'block';
//         };
//         reader.readAsDataURL(file);
//     }
// });


document.getElementById('add-product-btn').addEventListener('click', () => {
    // modal.open()
    const formTemplate = ProductFormTemplate(false, [], categoriesData, suppliersData)

    modal.loadFormTemplate(formTemplate, submitProduct,).open()


})


async function submitProduct(formData, method){

    if(method === 'POST') {


        try {
            const response = await fetch("assets/api/products.php", {
                method: "POST",
                body: formData,
            });
    
    
            const text = await response.text();
            console.log("Raw Response:", text); // Debug response
    
            const result = JSON.parse(text);
            console.log("Parsed JSON:", result);
    
            console.log(response.ok)
    
            if (response.ok) {
                modal.close()
                
                showToast("Product added successfully!", "success");
       
                document.getElementById('imagePreview').style.display = 'none'; 
                document.getElementById('imageName').style.display = 'none'; 
                renderData()
            } 
        } catch (error) {
            console.error("JSON Parse Error:", error);
            alert("Invalid server response. Check console.");
        }
    }else if (method === 'PUT') {
        console.log('Updating product');
        
        try {
            // First handle image upload if exists
            let imageUrl = null;
            const imageFile = formData.get('image');
            
            if (imageFile instanceof File && imageFile.size > 0) {
                console.log('Uploading new image');
                
                const uploadForm = new FormData();
                uploadForm.append('image', imageFile);
                
                // Upload image via POST to a separate endpoint
                const uploadResponse = await fetch("assets/api/uploads.php", {
                    method: "POST",
                    body: uploadForm
                });
                
                if (!uploadResponse.ok) {
                    throw new Error('Image upload failed');
                }
                
                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.path;
                console.log('Image uploaded:', imageUrl);
            } else {
                // No new image - use existing image URL from form data
                imageUrl = formData.get('existingImage');
                console.log('Using existing image:', imageUrl);
            }
            
            // Prepare product data for PUT request
            const productData = {
                id: formData.get('id'),
                name: formData.get('name'),
                price: formData.get('price'),
                stock: formData.get('stock'),
                category: formData.get('category'),
                supplier: formData.get('supplier'),
                description: formData.get('description'),
                image: imageUrl  // This will be either the new URL or existing one
            };
            
            console.log('Sending product update:', productData);
            
            // Send product data as JSON
            const response = await fetch("assets/api/products.php", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });
    
            const text = await response.text();
            console.log("Raw Response:", text);
    
            const result = JSON.parse(text);
            console.log("Parsed JSON:", result);
    
            if (response.ok) {
                modal.close();
                showToast("Product updated successfully!", "success");
                document.getElementById('imagePreview').style.display = 'none'; 
                document.getElementById('imageName').style.display = 'none'; 
                renderData();
            } else {
                throw new Error(result.message || 'Update failed');
            }
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Update failed. Check console.");
        }
    }
    
   
}