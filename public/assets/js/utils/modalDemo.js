import { clearValidationErrors, removeBorderErrors } from "./validation.js";
import {ProductFormTemplate}  from "./components/formsTemplates.js";

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
    


    _initEventListerners(preventOutsideClick) {
  
        if (this.closeButton) {
            this.closeButton.addEventListener("click", () => this.close());

        }

        if (this.openButton) {
            this.openButton.addEventListener('click', () => this.open());
        }

        if (this.cancelButton) {
            this.cancelButton.addEventListener('click', () => {
                console.log('cancel button clicked')
                this.close();
                this._resetFormState();
                
            });
        }

        if (!preventOutsideClick && this.modalContainer) {
            this.modalContainer.addEventListener("click", (e) => {
                if (e.target === this.modalContainer) {
                    this.close();
                }
            });
        }
    }


    _resetFormState(){
        document.getElementById('imagePreview').style.display = 'none'; 
        document.getElementById('imageName').style.display = 'none'; 

        clearValidationErrors(
            ["name", "price", "category", 
             "supplier", "description", "stock", 
             "category", "supplier"])

        removeBorderErrors(
            ["name", "price", "category", 
             "supplier", "description", "stock", 
             "category", "supplier"])

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



    loadFormTemplate(templateHTML, options = {}){
        const {
            title = '',
            submitText = 'Submit',
            data = null,
            onSubmit = null
        } = options;


        const titleElement = this.modal.querySelector('h3')
        if(titleElement) titleElement.textContent = title 

        const submitBtn = this.modal.querySelector('#submitBtn')
        if(submitBtn) submitBtn.textContent = submitText;


        const formContainer = this.modal.querySelector('form') || this.modal.querySelector('#modal-body')
        if(formContainer) {
            
            formContainer.innerHTML = templateHTML

            if(data){
                this._fillFormData(data);
                this.currentFormData = data
    
            }


            const form = this.modal.querySelector('form')
            if(form && onSubmit){
                form.onsubmit = (e) =>{
                    e.preventDefault();
                    const formData = this._getFormData(form)
                    onSubmit(formData, this.currentFormData?.id)
                }
            }
        
        
        
        }
        


        return this;




    }



    _fillFormData(data){
        const form = this.modal.querySelector('form');
        if(!form) return;

        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`)

            if (input) {
                if(input.type === 'file'){

                    if(data[key]){
                        const preview = form.querySelector('#imagePreview')


                        if(preview){
                            preview.src = data['image_url']
                            preview.style.display = block
                        }

                        const fileName = form.querySelector('#imageName')
                        if(fileName){
                            fileName.textContent = 'Current Image'
                            fileName.style.display = block
                        }
                    }
                }
                else {
                    input.value = data[key];
                    
                    // For select elements
                    if (input.tagName === 'SELECT') {
                        const option = input.querySelector(`option[value="${data[key]}"]`);
                        if (option) option.selected = true;
                    }
                }
            }
        })
    }
   



    _getFormData(form){

        const formData = new FormData(form)
        const data = {}

        formData.forEach((value,key) => {
            if(form[key]?.type === 'file'){
                data[key] = form[key].files[0] || this.currentFormData?.[key];
            }else{
                data[key] = value
            }
        })



        return data

    }


    setContent(htmlContent) {
        if (this.modal) {
            this.modal.innerHTML = htmlContent;

            const closeButton = this.modal.querySelector('[data-modal-close]');
            if (closeButton) {
                closeButton.addEventListener('click', () => this.close());
            }

            const cancelBtn = this.modal.querySelector('[data-modal-cancel]');
            if (cancelBtn) {
                // console.log('cancel buton clicked')
                cancelBtn.addEventListener('click', () => this.close());
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
            <div class="relative p-4 w-full max-w-md flex mx-auto">
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