export const ProductFormTemplate = (isEdit = false, productData = {}, categoriesData, suppliersData) => {
    
    const categoryOptions = generateSelectOptions(
        categoriesData, 
        productData.category, 
        'Select Category')

    const supplierOptions = generateSelectOptions(
        suppliersData, 
        productData.supplier, 
        'Select Supplier')

    console.log(productData.id)

    return `
         <div class="relative bg-white rounded-lg shadow-sm flex flex-col">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 ">
                 ${isEdit ? 'Update Product'  : 'Create New Product'}
            </h3>
            <button type="button" data-modal-close id="closeBtn"  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </div>
        <form class="p-4 md:p-5" id="form">
            <div class="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
            <input type="hidden" name="method" id="method" value="${isEdit ? 'PUT' : 'POST'}">
            <input type="hidden" name="_method" id="method" value="${isEdit ? 'PUT' : 'POST'}">
            <input type="hidden" name="id" id="method" value="${isEdit ?  productData.id : ''}">
                <div class="md:col-span-1">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" name="name" id="name" 
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                               placeholder="Type product name"
                               value="${isEdit ? productData.name || '' : ''}">
                        <p class="text-red-500 text-xs mt-1 hidden" id="nameError">Name is required.</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input type="number" name="price" id="price" 
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                   placeholder="$2999"
                                   value="${isEdit ? productData.price || '' : ''}">
                            <p class="text-red-500 text-xs mt-1 hidden" id="priceError">Price is required.</p>
                        </div>
                        <div>
                            <label for="stock" class="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                            <input type="number" name="stock" id="stock" 
                                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                   placeholder="Quantity"
                                   value="${isEdit ? productData.stock || '' : ''}">
                            <p class="text-red-500 text-xs mt-1 hidden" id="stockError">Stock quantity is required.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select id="category" name="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                            
                                 ${categoryOptions}
                               
                            </select>
                            <p class="text-red-500 text-xs mt-1 hidden" id="categoryError">Category is required.</p>
                        </div>
                        <div>
                            <label for="supplier" class="block mb-2 text-sm font-medium text-gray-900">Supplier</label>
                            <select id="supplier" name="supplier" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                 
                                      ${supplierOptions}
                            </select>
                            <p class="text-red-500 text-xs mt-1 hidden" id="supplierError">Supplier is required.</p>
                        </div>
                    </div>
                </div>

                <div class="md:col-span-1">
                    <div>
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Product Description</label>
                        <textarea id="description" name="description" rows="4" 
                                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                                  placeholder="Write product description here">${isEdit ? productData.description || '' : ''}</textarea>
                        <p class="text-red-500 text-xs mt-1 hidden" id="descriptionError">Description is required.</p>
                    </div>

                    <div class="mt-4">
                        <label for="imageInput" class="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
                        <label for="imageInput" class="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <img src="${isEdit ? productData.image_url || '' : '' }" alt="Image Preview" id="imagePreview" class="w-full h-full object-cover rounded-lg absolute top-0 left-0 ${isEdit && productData.image_url ? 'block' : 'hidden'}">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                            </div>
                            <input id="imageInput" type="file" class="hidden" name="image" />
                        </label>
                        <p class="text-red-500 text-xs mt-1 hidden" id="imageError">Image is required.</p>
                        <p class="text-xs mt-2 text-center" id="imageName" style="display:none"></p>
                    </div>
                </div>
            </div>

            <div class="flex justify-end mt-4">
                <button type="button" id="cancelBtn" data-modal-cancel class="mr-2 px-5 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Cancel</button>
                <button type="submit" id="submitBtn"     class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">${isEdit ? 'Update Product' : 'Add Product'}</button>
            </div>
        </form>
    </div>

     
    `;
};


function generateSelectOptions(data, selectedValue = '', defaultValue = 'Select option') {
    let options = `<option value="">${defaultValue}</option>`;
    
    data.forEach(item => {
        const isSelected = item.name === selectedValue ? 'selected' : '';
        options += `<option value="${item.name}" ${isSelected}>${item.name}</option>`;
    });
    
    return options;
}


export const viewProductTemplate = (productData = {}) => {

    const {category, created_at, description,image_url, name, price, stock, supplier } = productData

    
    

    return `
        
    <div>
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Product Details
                    </h3>
                    <button type="button" id="closeBtn" data-modal-close class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-colors">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <!-- Left Column - Image Preview -->
                    <div class="flex justify-center items-center">
                        <div class="w-full h-72 md:h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
                             <img src="${image_url ?? ''}" alt="">    
                        <div class="text-center p-4 ${image_url ? 'hidden' : 'block'}">
                                <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p class="mt-2 text-sm text-gray-500">Product Image</p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Product Details -->
                    <div class="flex flex-col">
                        <h2 class="text-2xl font-bold text-gray-800">${name}</h2>

                        <div class="mt-4">
                            <h3 class="font-semibold text-gray-700">Description</h3>
                            <p class="mt-1 text-gray-600"> ${description}</p>
                        </div>

                        <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-6">
                            <!-- Supplier -->
                            <div class="flex flex-col gap-1.5">
                                <h3 class="font-semibold text-sm text-gray-700">Supplier</h3>
                                <div class="flex items-center gap-3 border rounded-lg border-gray-200 p-2 bg-white shadow-sm">
                                    <div class="bg-orange-400/15 rounded-md size-10 flex items-center justify-center">
                                        <svg width="20" height="20" class="fill-orange-500" viewBox="0 0 20 18">
                                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                        </svg>
                                    </div>
                                    <p class="text-sm font-medium">${supplier}</p>
                                </div>
                            </div>

                            <!-- Category -->
                            <div class="flex flex-col gap-1.5">
                                <h3 class="font-semibold text-sm text-gray-700">Category</h3>
                                <div class="flex items-center gap-3 border rounded-lg border-gray-200 p-2 bg-white shadow-sm">
                                    <div class="bg-green-400/15 rounded-md size-10 flex items-center justify-center">
                                        <svg class="size-6 fill-green-500" viewBox="-7.5 0 32 32">
                                            <path d="M2.594 4.781l-1.719 1.75h15.5l-1.719-1.75h-12.063zM17.219 13.406h-17.219v-6.031h17.219v6.031zM12.063 11.688v-1.719h-6.875v1.719h0.844v-0.875h5.156v0.875h0.875zM17.219 20.313h-17.219v-6.031h17.219v6.031zM12.063 18.594v-1.75h-6.875v1.75h0.844v-0.875h5.156v0.875h0.875zM17.219 27.188h-17.219v-6h17.219v6zM12.063 25.469v-1.719h-6.875v1.719h0.844v-0.875h5.156v0.875h0.875z"></path>
                                        </svg>
                                    </div>
                                    <p class="text-sm font-medium">${category}</p>
                                </div>
                            </div>

                            <!-- Price -->
                            <div class="flex flex-col gap-1.5">
                                <h3 class="font-semibold text-sm text-gray-700">Price</h3>
                                <div class="flex items-center gap-3 border rounded-lg border-gray-200 p-2 bg-white shadow-sm">
                                    <div class="bg-blue-400/15 rounded-md size-10 flex items-center justify-center">
                                        <svg fill="#3b82f6" class="size-6" viewBox="0 0 36 36">
                                            <path d="M14.18,13.8V16h9.45a5.26,5.26,0,0,0,.08-.89,4.72,4.72,0,0,0-.2-1.31Z"></path>
                                            <path d="M14.18,19.7h5.19a4.28,4.28,0,0,0,3.5-1.9H14.18Z"></path>
                                            <path d="M19.37,10.51H14.18V12h8.37A4.21,4.21,0,0,0,19.37,10.51Z"></path>
                                            <path d="M17.67,2a16,16,0,1,0,16,16A16,16,0,0,0,17.67,2Zm10.5,15.8H25.7a6.87,6.87,0,0,1-6.33,4.4H14.18v6.54a1.25,1.25,0,1,1-2.5,0V17.8H8.76a.9.9,0,1,1,0-1.8h2.92V13.8H8.76a.9.9,0,1,1,0-1.8h2.92V9.26A1.25,1.25,0,0,1,12.93,8h6.44a6.84,6.84,0,0,1,6.15,4h2.65a.9.9,0,0,1,0,1.8H26.09a6.91,6.91,0,0,1,.12,1.3,6.8,6.8,0,0,1-.06.9h2a.9.9,0,0,1,0,1.8Z"></path>
                                        </svg>
                                    </div>
                                    <p class="text-sm font-medium">₱${price}</p>
                                </div>
                            </div>

                            <!-- Stock -->
                            <div class="flex flex-col gap-1.5">
                                <h3 class="font-semibold text-sm text-gray-700">Stock</h3>
                                <div class="flex items-center gap-3 border rounded-lg border-gray-200 p-2 bg-white shadow-sm">
                                    <div class="bg-red-400/15 rounded-md size-10 flex items-center justify-center">
                                        <svg viewBox="0 0 512 512" class="size-6 fill-red-500">
                                            <path d="M426.247658,366.986259 C426.477599,368.072636 426.613335,369.17172 426.653805,370.281095 L426.666667,370.986667 L426.666667,392.32 C426.666667,415.884149 383.686003,434.986667 330.666667,434.986667 C278.177524,434.986667 235.527284,416.264289 234.679528,393.025571 L234.666667,392.32 L234.666667,370.986667 L234.679528,370.281095 C234.719905,369.174279 234.855108,368.077708 235.081684,366.992917 C240.961696,371.41162 248.119437,375.487081 256.413327,378.976167 C275.772109,387.120048 301.875889,392.32 330.666667,392.32 C360.599038,392.32 387.623237,386.691188 407.213205,377.984536 C414.535528,374.73017 420.909655,371.002541 426.247658,366.986259 Z M192,7.10542736e-15 L384,106.666667 L384.001134,185.388691 C368.274441,181.351277 350.081492,178.986667 330.666667,178.986667 C301.427978,178.986667 274.9627,184.361969 255.43909,193.039129 C228.705759,204.92061 215.096345,223.091357 213.375754,241.480019 L213.327253,242.037312 L213.449,414.75 L192,426.666667 L-2.13162821e-14,320 L-2.13162821e-14,106.666667 L192,7.10542736e-15 Z M426.247658,302.986259 C426.477599,304.072636 426.613335,305.17172 426.653805,306.281095 L426.666667,306.986667 L426.666667,328.32 C426.666667,351.884149 383.686003,370.986667 330.666667,370.986667 C278.177524,370.986667 235.527284,352.264289 234.679528,329.025571 L234.666667,328.32 L234.666667,306.986667 L234.679528,306.281095 C234.719905,305.174279 234.855108,304.077708 235.081684,302.992917 C240.961696,307.41162 248.119437,311.487081 256.413327,314.976167 C275.772109,323.120048 301.875889,328.32 330.666667,328.32 C360.599038,328.32 387.623237,322.691188 407.213205,313.984536 C414.535528,310.73017 420.909655,307.002541 426.247658,302.986259 Z M127.999,199.108 L128,343.706 L170.666667,367.410315 L170.666667,222.811016 L127.999,199.108 Z M42.6666667,151.701991 L42.6666667,296.296296 L85.333,320.001 L85.333,175.405 L42.6666667,151.701991 Z M330.666667,200.32 C383.155809,200.32 425.80605,219.042377 426.653805,242.281095 L426.666667,242.986667 L426.666667,264.32 C426.666667,287.884149 383.686003,306.986667 330.666667,306.986667 C278.177524,306.986667 235.527284,288.264289 234.679528,265.025571 L234.666667,264.32 L234.666667,242.986667 L234.808715,240.645666 C237.543198,218.170241 279.414642,200.32 330.666667,200.32 Z M275.991,94.069 L150.412,164.155 L192,187.259259 L317.866667,117.333333 L275.991,94.069 Z M192,47.4074074 L66.1333333,117.333333 L107.795,140.479 L233.373,70.393 L192,47.4074074 Z"></path>
                                        </svg>
                                    </div>
                                    <p class="text-sm font-medium">${stock} units</p>
                                </div>
                            </div>

                            <!-- Creation Date (Added as requested) -->
                            <div class="flex flex-col gap-1.5">
                                <h3 class="font-semibold text-sm text-gray-700">Creation Date</h3>
                                <div class="flex items-center gap-3 border rounded-lg border-gray-200 p-2 bg-white shadow-sm">
                                    <div class="bg-purple-400/15 rounded-md size-10 flex items-center justify-center">
                                        <svg class="size-6 fill-purple-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V10H20Zm0-11H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z" />
                                        </svg>
                                    </div>
                                    <p class="text-sm font-medium">${created_at}</p>
                                </div>
                            </div>

                            
                        </div>

                    </div>
                </div>
    </div>
    
    `
};


export const skeletonTemplate = () => {
    return `
      <div>
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">
              Product Details
          </h3>
          <button type="button"   data-modal-close  class=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-colors">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
          </button>
        </div>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <!-- Left Column - Skeleton Image -->
          <div class="flex justify-center items-center">
            <div class="w-full h-72 md:h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
              <div class="w-16 h-16 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          </div>
  
          <!-- Right Column - Skeleton Product Details -->
          <div class="flex flex-col space-y-4">
            <div class="w-3/4 h-6 bg-gray-300 animate-pulse rounded"></div>
            <div class="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div class="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div class="w-1/2 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div class="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    `;
  };
  
  export function tableSkeleton(columns, rows) {
    let tbody = document.getElementById("tbody"); // Ensure you have a target tbody
    tbody.innerHTML = ""; // Clear existing content

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        tr.classList.add("bg-white", "border-b", "border-gray-200", "animate-pulse");

        let skeleton = `
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <div class="w-3/4 h-6 bg-gray-300 rounded"></div>
            </th>
        `;

        for (let j = 0; j < columns - 1; j++) {
            skeleton += `
                <td class="px-6 py-4">
                    <div class="w-3/4 h-6 bg-gray-200 rounded"></div>
                </td>
            `;
        }

        tr.innerHTML = skeleton;
        tbody.appendChild(tr);
    }
}



export const SupplierFormTemplate = (isEdit = false, data = {}) => {


    const {name, address, email, phone} = data

    return `
         <div class="relative bg-white rounded-lg shadow-sm flex flex-col">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-4 py-2   border-b rounded-t relative border-gray-200">
                    <div class="">
                        <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                           ${!isEdit ? 'Edit Supplier' : ' Add New Supplier'}
                        </h2>
                        <p class="text-gray-600 mt-1"> ${!isEdit ? 'Edit supplier contact details below' : ' Enter supplier contact details below'}</p>
                    </div>
                    <button type="button" id="closeBtn" class=" absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-close>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-6 bg-white rounded-lg shadow-md max-w-2xl " id="form">
                    <input type="hidden" name="method" id="method" value="${isEdit ? 'PUT' : 'POST'}">
                    <!-- Form Header -->


                    <div class="grid gap-5 mb-6 grid-cols-1 md:grid-cols-2">
                        <!-- Name Field -->
                        <div class="col-span-full">
                            <label for="name" class=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-1">
                                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                Full Name
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition duration-150 ease-in-out" placeholder="Enter supplier name" value="${isEdit ? name : ''}">
                            </div>
                            <p class="text-red-500 text-xs mt-1 hidden" id="nameError">Name is required.</p>
                        </div>

                        <!-- Address Field -->
                        <div class="col-span-full">
                            <label for="address" class=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-1">
                                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Address
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                    </svg>
                                </div>
                                <input type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition duration-150 ease-in-out" placeholder="Enter complete address" value="${isEdit ? address : ''}">
                            </div>
                       
                            <p class="text-red-500 text-xs mt-1 hidden" id="addressError"></p>
                        </div>

                        <!-- Email Field -->
                        <div class="md:col-span-1">
                            <label for="email" class=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-1">
                                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                Email
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                    </svg>
                                </div>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition duration-150 ease-in-out" placeholder="supplier@company.com" value="${isEdit ? email : ''}">
                            </div>
                           
                             <p class="text-red-500 text-xs mt-1 hidden" id="emailError"></p>
                            
                        </div>

                        <!-- Phone Field -->
                        <div class="md:col-span-1">
                            <label for="phone" class=" mb-2 text-sm font-medium text-gray-700 flex items-center gap-1">
                                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                Phone
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <input type="tel" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition duration-150 ease-in-out" placeholder="(123) 456-7890" value="${isEdit ? phone : ''}">
                            </div>
                            
                            <p class="text-red-500 text-xs mt-1 hidden" id="phoneError"></p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center justify-end space-x-4 pt-4    ">
                        <button type="button" data-modal-cancel id="cancelBtn" class="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-150 ease-in-out">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            Cancel
                        </button>
                        <button type="submit" class="  shrink-0 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition duration-150 ease-in-out">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Add Supplier
                        </button>
                    </div>
                </form>
            </div>
    
    
    
    `
}