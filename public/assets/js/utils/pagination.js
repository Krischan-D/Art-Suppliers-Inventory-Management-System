let currentPage = 1;
const rowsPerPage = 7;
let allData = []; 
let renderFunction = null; 



export function initPagination(data, renderProductCallback){

    allData = data
    renderFunction = renderProductCallback
    currentPage = 1
    renderPaginatedData()


}


function renderPaginatedData() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = allData.slice(start, end);
    
    renderFunction(paginatedData)
    renderPaginationControls();
    
}


function renderPaginationControls() {
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    let paginationHTML = '';

    paginationHTML += `
        <li>
            <button  id="prevBtn"  class="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 
            bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700
             ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
                <span class="sr-only">Previous</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
            </button>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li>
                <button id="goToBtn${i}" data-page="${i}"  class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight 
                ${i === currentPage ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}">
                    ${i}
                </button>
            </li>
        `;
    }

    paginationHTML += `
        <li>
            <button id ="nextBtn" " class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700
             ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
                <span class="sr-only">Next</span>
                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
            </button>
        </li>
    `;

    document.getElementById('pagination').innerHTML = `<ul class="flex items-center -space-x-px h-8 text-sm">${paginationHTML}</ul>`;
 
    document.getElementById('prevBtn').addEventListener('click', prevPage)
    document.getElementById('nextBtn').addEventListener('click', nextPage)
    
    for(let i = 1; i <= totalPages; i++){
        document.getElementById(`goToBtn${i}`).addEventListener('click', () => goToPage(i))
    }

}





function goToPage(page){
    currentPage = page
    renderPaginatedData();
    renderPaginationControls();

}



function prevPage(){
  
    if(currentPage > 1){
        currentPage--
        renderPaginatedData();
        renderPaginationControls();
    }
}



function nextPage(){
    
    const totalPages = Math.ceil(allData.length / rowsPerPage);
    if(currentPage < totalPages){
        currentPage++
        renderPaginatedData();
        renderPaginationControls();
    }
}



export function hidePagination(){
    document.getElementById('pagination').style.display = 'none' 
}

export function showPagination(){
    document.getElementById('pagination').style.display = 'flex' 
}