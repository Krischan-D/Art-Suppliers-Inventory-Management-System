import { fetchData } from "./utils/fetch.js"


async function renderData() {
    const data = await fetchData('assets/api/dashboard.php')
    
    document.getElementById('products').innerHTML = `${data['totalProducts']} Products`
    document.getElementById('supplier').innerHTML = `${data['totalSupplier']} Suppliers`
    document.getElementById('category').innerHTML = `${data['totalCategories']} Categories`
    
    renderPriceChanges(data['priceChanges'])
    renderRecentSales(data['recentSales'])
    console.log(data)
}


renderData()

setInterval(renderData, 10000);

function renderPriceChanges(priceChanges) {
    let tr = ''

    priceChanges.slice(0,8).forEach(price => {
        tr += 
        `
         <tr class="bg-white border-b   border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                ${price.name}
                              </th>
                              <td class="px-6 py-4">
                              ${price.price}
                              </td>
                              <td class="px-6 py-4">
                                 ${price.change_at}
                              </td>
                            
                           </tr>
        `


    });

    document.getElementById('tbody-price').innerHTML = tr
}



function renderRecentSales(recentSales) {
    console.log(recentSales)
    let tr = ''

    recentSales.slice(0,8).forEach(sale => {
        tr += 
        `
         <tr class="bg-white border-b   border-gray-200">
                              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                ${sale.name}
                              </th>
                              <td class="px-6 py-4">
                              ${sale.quantity_sold}
                              </td>
                              <td class="px-6 py-4">
                                 ${sale.sale_date}
                              </td>
                            
                           </tr>
        `


    });

    document.getElementById('tbody-sales').innerHTML = tr
}