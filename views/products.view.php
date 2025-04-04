<?php require 'partials/head.php' ?>

<?php require 'partials/nav.php' ?>


<main class="p-4 lg:ml-64 h-full pt-10 ">
    <div id="toast-container" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2"></div>

    <div class="bg-white h-11/12 mt-8 rounded-xl border-2 border-gray-200 p-4 pt-2 pb-2">
        <div class=" h-full ">
            <h1>Products</h1>

            <div class="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <form class="w-full sm:w-auto flex items-center">
                    <label for="search" class="sr-only">Search</label>
                    <div class="relative w-full sm:w-sm">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                            </svg>
                        </div>
                        <input type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Search products..." />
                        <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3">
                            <svg class="w-4 h-4 text-gray-500 hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                            </svg>
                        </button>
                    </div>

                </form>

                <button id="add-product-btn" type="button" class="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white inline-flex gap-2 items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">
                    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                    Add new product
                </button>
            </div>

            <div class="mt-4">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white  ">
                            Our products
                            <p class="mt-1 text-sm font-normal text-gray-500 ">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
                        </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Supplier
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            


                        </tbody>
                    </table>
                </div>

            </div>

            <nav aria-label="Page navigation" class="mt-4 flex justify-center sm:justify-end" id="pagination"></nav>
        </div>


    </div>



    <div id="crud-modal" tabindex="-1"
        class=" flex bg-black/40  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center mb-4 items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
        <div class="relative p-4 w-full max-w-3xl max-h-full " id="modal">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm flex flex-col">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 ">
                        Create New Product
                    </h3>
                    <button type="button" id="closeBtn" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5" id="form">
                    <div class="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
                        <div class="md:col-span-1">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name">
                                <p class="text-red-500 text-xs mt-1 hidden" id="nameError">Name is required.</p>
                            </div>

                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                    <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999">
                                    <p class="text-red-500 text-xs mt-1 hidden" id="priceError">Price is required.</p>
                                </div>
                                <div>
                                    <label for="stock" class="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                                    <input type="number" name="stock" id="stock" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Quantity">
                                    <p class="text-red-500 text-xs mt-1 hidden" id="stockError">Stock quantity is required.</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                    <select id="category" name="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option selected>Select category</option>
                                        <option value="TV">TV/Monitors</option>
                                        <option value="PC">PC</option>
                                        <option value="GA">Gaming/Console</option>
                                        <option value="PH">Phones</option>
                                    </select>
                                    <p class="text-red-500 text-xs mt-1 hidden" id="categoryError">Category is required.</p>
                                </div>
                                <div>
                                    <label for="supplier" class="block mb-2 text-sm font-medium text-gray-900">Supplier</label>
                                    <select id="supplier" name="supplier" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option selected>Select Supplier</option>
                                        <option value="TV">Supplier A</option>
                                        <option value="PC">Supplier B</option>
                                        <option value="GA">Supplier C</option>
                                        <option value="PH">Supplier D</option>
                                    </select>
                                    <p class="text-red-500 text-xs mt-1 hidden" id="supplierError">Supplier is required.</p>
                                </div>
                            </div>
                        </div>

                        <div class="md:col-span-1">
                            <div>
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Product Description</label>
                                <textarea id="description" value="asd" name="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write product description here"></textarea>
                                <p class="text-red-500 text-xs mt-1 hidden" id="descriptionError">Description is required.</p>
                            </div>

                            <div class="mt-4">
                                <label for="imageInput" class="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
                                <label for="imageInput" class="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <img src="" alt="Image Preview" id="imagePreview" class="w-full h-full object-cover rounded-lg absolute top-0 left-0 hidden">
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
                        <button type="button" id="cancelBtn" class="mr-2 px-5 py-2.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">
                            Cancel
                        </button>
                        <button type="submit" id="submitBtn" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                            </svg>
                            Add product
                        </button>
                    </div>
                </form>

            </div>

        </div>
    </div>


    <div id="popup-modal" tabindex="-1" class=" flex bg-black/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full " id="deleteModal"></div>
    </div>

    <div id="view-modal" tabindex="-1" class="flex bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full">
        <div class="relative p-4 w-full max-w-4xl max-h-full bg-white rounded-lg shadow-xl" id="viewModal">

        </div>
    </div>



</main>