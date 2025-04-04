<?php require 'partials/head.php' ?>

<?php require 'partials/nav.php' ?>


<main class="p-4 lg:ml-64 h-full pt-10">
    <div class="bg-white h-11/12 mt-8 rounded-xl border-2 border-gray-200 p-4 pt-2 pb-2">
        <div class=" h-full ">
            <h1 class="text-xl font-bold">Price History</h1>

            <div class="mt-4 flex">

                <form class="flex  max-w-lg ">
                    <label for="voice-search" class="sr-only">Search</label>
                    <div class="relative w-sm">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                            </svg>
                        </div>
                        <input type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5    dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                        
                    </div>
                    
                </form>

                
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
                                    Old Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    New Price
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Change Date
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            <tr class="bg-white border-b   border-gray-200">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    1
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                <td class="px-6 py-4">
                                    Laptop
                                </td>
                                
                            </tr>
                           

                        </tbody>
                    </table>
                </div>

            </div>

            
            <nav aria-label="Page navigation" class="mt-4 flex justify-center sm:justify-end" id="pagination"></nav>
        </div>

       
    </div>





</main>