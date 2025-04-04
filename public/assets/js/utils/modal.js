import { validateData, clearValidationErrors, removeBorderErrors } from "./validation.js";


export class Modal{


    constructor(options){

        const {
            modalContainerId,
            modalId,
            closeButtonId,
            openButtonId,
            cancelButtonId,
            onOpen,
            onClose,
            modalTemplate,
            preventOutsideClick = false
        } = options;

        
        this.modalContainer = document.getElementById(modalContainerId)
        this.modal = document.getElementById(modalId)
        this.closeButton = closeButtonId ? document.getElementById(closeButtonId) : null;
        this.openButton =  openButtonId ? document.getElementById(openButtonId) : null;
        this.cancelButton = cancelButtonId ? document.getElementById(cancelButtonId) : null;
    
        this.onOpenCallback = onOpen || null;
        this.onCloseCallback = onClose || null;
    
        this._initEventListerners(preventOutsideClick)
    
    }

    _initEventListerners(preventOutsideClick){
        
        if(this.closeButton){
            this.closeButton.addEventListener("click", () => this.close());

        }
        
        // if(this.openButton){

        //     this.openButton.addEventListener('click', () => this.open())
        // }



        if (this.cancelButton) {
            this.cancelButton.addEventListener('click', () => {
                this.close()
                document.getElementById('imagePreview').style.display = 'none'; 
                document.getElementById('imageName').style.display = 'none'; 
                clearValidationErrors(["name", "price", "category", "supplier", "description", 'stock', 'category', 'supplier'])
                removeBorderErrors(["name", "price", "category", "supplier", "description", 'stock', 'category', 'supplier'])

            });
        }


        if(!preventOutsideClick && this.modalContainer){
            this.modalContainer.addEventListener("click", (e) => {
        
                if (e.target === this.modalContainer) {
        
                    this.close();
                }
            })
        }


       
    }


    loadFormTemplate(templateHTML, callback){

        this.callback = callback

        if(templateHTML){
            this.setContent(templateHTML, this.callback)
        }

        return this;

    }


    open() {


        if(!this.modalContainer || !this.modal) return;

        this.modalContainer.classList.add("active");
        this.modal.classList.add("active");
    
        if(typeof this.onOpenCallback === 'function'){
            this.onOpenCallback()
        }

        return this;
    
    }


    close() {

        if (!this.modalContainer || !this.modal) return;
        
        this.modalContainer.classList.remove("active");
        this.modal.classList.remove("active");
        

        if (typeof this.onCloseCallback === 'function') {
            this.onCloseCallback();
        }
        

        return this;
    }


    setContent(htmlContent, callback){

        if(this.modal){
            this.modal.innerHTML =  htmlContent


            const closeButton = this.modal.querySelector('[data-modal-close]')

            if(closeButton){
                closeButton.addEventListener('click', () => this.close())
            }

            const cancelBtn = this.modal.querySelector('[data-modal-cancel]');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => this.close());
            }


            const submitBtn = this.modal.querySelector('[data-modal-submit]')
            const form = this.modal.querySelector('#form');
         

            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
    
                    const formData = new FormData(form);
                    const requiredFields = [];

                    formData.forEach((_, key) => {
                        if (!['_method', 'id', 'image', 'method'].includes(key)) {
                            requiredFields.push(key);
                        }
                    });

                    requiredFields.forEach(field => console.log(field))

                    // const requiredFields = ["name", "price", "category", "supplier", "description", ];
                    const validation = validateData(formData, requiredFields);
    
                    removeBorderErrors(requiredFields);
                    clearValidationErrors(requiredFields);
    
                    if (Object.keys(validation).length > 0) {
                        for (let key in validation) {
                            console.log(key)
                            document.getElementById(`${key}Error`).innerHTML = validation[key].message;
                            document.getElementById(`${key}Error`).style.display = 'block';
                            document.getElementById(`${key}`).style.border = '1px solid red';
                        }
                        return;
                    }
    
                    // If validation passes, proceed with callback
                    const formMethod = formData.get('method');
                    callback(formData, formMethod);
                });
            }


            if(form){
                const imagePreview = form.querySelector('#imageInput')
                if(imagePreview){
                    imagePreview.addEventListener('change', function (event) {
                        const file = event.target.files[0];
                        if (file) {
                            const reader = new FileReader();    
                        
                            reader.onload = function (e) {
                                document.getElementById('imageName').innerHTML = file.name
                                document.getElementById('imageName').style.display = 'block';
                                document.getElementById('imagePreview').src = e.target.result;
                                document.getElementById('imagePreview').style.display = 'block';
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }
            }



        }

        return this;

    }

    

    createConfirmation(options = {}) {
        const {
            title = 'Are you sure?',
            message = 'Are you sure you want to proceed?',
            confirmText = 'Yes, proceed',
            cancelText = 'Cancel',
            confirmClass = 'bg-red-600 hover:bg-red-800',
            cancelClass = 'bg-white hover:bg-gray-100',
            iconSvg = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
            onConfirm = null
        } = options;
        
        const confirmationHtml = `
            <div class="relative p-4 w-full max-w-md">
                <div class="relative bg-white rounded-lg shadow-sm">
                    <button type="button" data-modal-close class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            ${iconSvg}
                        </svg>
                        <h3 class="mb-2 text-lg font-medium text-gray-800">${title}</h3>
                        <p class="mb-5 text-gray-500">${message}</p>
                        <button id="confirmBtn" type="button" class="text-white ${confirmClass} focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            ${confirmText}
                        </button>
                        <button data-modal-cancel type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none ${cancelClass} rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                            ${cancelText}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.setContent(confirmationHtml);
        
        // Add confirmation action
        if (this.modal) {
            const confirmBtn = this.modal.querySelector('#confirmBtn');
            if (confirmBtn && typeof onConfirm === 'function') {
                confirmBtn.addEventListener('click', () => {
                    onConfirm();
                    this.close();
                });
            }
        }
        
        return this;
    }


    static create(options) {
        return new Modal(options);
    }
    

   
}



