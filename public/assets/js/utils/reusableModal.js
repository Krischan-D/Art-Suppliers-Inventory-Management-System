export class ReusableModal {
    constructor(config) {
        this.modalContainerId = config.modalContainerId || 'crud-modal';
        this.modalId = config.modalId || 'modal';
        this.closeButtonId = config.closeButtonId || 'closeBtn';
        this.cancelButtonId = config.cancelButtonId || 'cancelBtn';
        
        // Store the modal HTML template
        this.modalTemplate = `
            <div id="${this.modalContainerId}" tabindex="-1" 
                class="flex bg-black/40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center mb-4 items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
                <div class="relative p-4 w-full max-w-3xl max-h-full" id="${this.modalId}">
                    <div class="relative bg-white rounded-lg shadow-sm flex flex-col">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 class="text-lg font-semibold text-gray-900" id="modalTitle">
                                ${config.title || 'Modal Title'}
                            </h3>
                            <button type="button" id="${this.closeButtonId}" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form class="p-4 md:p-5" id="modalForm">
                            <!-- Dynamic content will be inserted here -->
                            <div id="modalContent"></div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        this.initialize();
    }
    
    initialize() {
        // Check if modal already exists
        if (!document.getElementById(this.modalContainerId)) {
            document.body.insertAdjacentHTML('beforeend', this.modalTemplate);
        }
        
        // Event listeners for close buttons
        document.getElementById(this.closeButtonId)?.addEventListener('click', () => this.close());
        document.getElementById(this.cancelButtonId)?.addEventListener('click', () => this.close());
    }
    
    open(content, title = '', onSubmit = null) {
        // Set modal title
        if (title) {
            document.getElementById('modalTitle').textContent = title;
        }
        
        // Insert dynamic content
        document.getElementById('modalContent').innerHTML = content;
        
        // Show modal
        document.getElementById(this.modalContainerId).classList.remove('hidden');
        
        // Set up form submission if callback provided
        if (onSubmit) {
            const form = document.getElementById('modalForm');
            form.onsubmit = (e) => {
                e.preventDefault();
                onSubmit(new FormData(form));
            };
        }
    }
    
    close() {
        document.getElementById(this.modalContainerId).classList.add('hidden');
    }
    
    // Helper to pre-fill form data
    fillForm(data) {
        for (const key in data) {
            const element = document.getElementById(key);
            if (element) {
                element.value = data[key];
            }
        }
        
        // Handle image preview if needed
        if (data.imageUrl) {
            const preview = document.getElementById('imagePreview');
            preview.src = data.imageUrl;
            preview.style.display = 'block';
        }
    }
}