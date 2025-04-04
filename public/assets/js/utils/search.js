
let searchValue = '';
let cbFunc;


export function getSearchValue(callback){
    const search = document.getElementById('search')
    search.addEventListener('input', debounceInput)
    cbFunc = callback
    return () => searchValue
    
}

const debounceInput = debounce(onInput, 300)

function debounce(func, wait){
    let timeout;

    return (...args) => {
        const context = this
        clearTimeout(timeout)

        timeout = setTimeout( () => func.apply(context, args), wait)
    }


}

function onInput(event) {
    searchValue = event.target.value.toLowerCase();
    console.log('Input value:', searchValue);
    if(cbFunc){
        cbFunc(searchValue)
    }
    
}





