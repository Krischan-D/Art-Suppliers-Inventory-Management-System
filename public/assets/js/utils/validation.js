

export function validateData(formData, requiredFields) {
    let errors = {};

    // General required field validation
    requiredFields.forEach(field => {
        const value = formData.get(field);

        if (!value || (typeof value === "string" && value.trim() === "") || value === "Select category" || value === "Select supplier") {
            errors[field] = { message: `${field} is required.` };
        }
    });

    // Validate price only if it exists in the form
    if (formData.has("price")) {
        const price = formData.get("price");
        if (price === "" || isNaN(price)) {
            errors["price"] = { message: "Price must be a valid number." };
        } else if (Number(price) <= 0) {
            errors["price"] = { message: "Price must be greater than zero." };
        }
    }

    // Validate stock only if it exists in the form
    if (formData.has("stock")) {
        const stock = formData.get("stock");
        if (stock === "" || isNaN(stock)) {
            errors["stock"] = { message: "Stock must be a valid number." };
        } else if (Number(stock) <= 0) {
            errors["stock"] = { message: "Stock must be greater than zero." };
        }
    }

    return errors;
}




export function clearValidationErrors(fields) {
    fields.forEach(field => {
        document.getElementById(`${field}Error`).innerHTML = "";
        document.getElementById(`${field}Error`).style.display = 'none';
        document.getElementById(`${field}`).style.border = '';
    });
}



export function removeBorderErrors(fields) {
    fields.forEach(field => {
        const element = document.getElementById(field);
        const elementError = document.getElementById(`${field}Error`);

        if (element) {
            element.addEventListener('input', () => {
                element.style.border = '1px solid green';
                elementError.style.display = 'none'
            });

            element.addEventListener('change', () => {
                element.style.border = '1px solid green';
                elementError.style.display = 'none'
            });
        }
    });
}
