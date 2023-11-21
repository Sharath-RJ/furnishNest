;(function ($) {
    "use strict"
    //===== jquery code for sidebar menu
    $(".menu-item.has-submenu .menu-link").on("click", function (e) {
        e.preventDefault()
        if ($(this).next(".submenu").is(":hidden")) {
            $(this)
                .parent(".has-submenu")
                .siblings()
                .find(".submenu")
                .slideUp(200)
        }
        $(this).next(".submenu").slideToggle(200)
    })
    // mobile offnavas triggerer for generic use
    $("[data-trigger]").on("click", function (e) {
        e.preventDefault()
        e.stopPropagation()
        var offcanvas_id = $(this).attr("data-trigger")
        $(offcanvas_id).toggleClass("show")
        $("body").toggleClass("offcanvas-active")
        $(".screen-overlay").toggleClass("show")
    })
    $(".screen-overlay, .btn-close").click(function (e) {
        $(".screen-overlay").removeClass("show")
        $(".mobile-offcanvas, .show").removeClass("show")
        $("body").removeClass("offcanvas-active")
    })
    // minimize sideber on desktop
    $(".btn-aside-minimize").on("click", function () {
        if (window.innerWidth < 768) {
            $("body").removeClass("aside-mini")
            $(".screen-overlay").removeClass("show")
            $(".navbar-aside").removeClass("show")
            $("body").removeClass("offcanvas-active")
        } else {
            // minimize sideber on desktop
            $("body").toggleClass("aside-mini")
        }
    })
    //Nice select
    if ($(".select-nice").length) {
        $(".select-nice").select2()
    }
    // Perfect Scrollbar
    if ($("#offcanvas_aside").length) {
        const demo = document.querySelector("#offcanvas_aside")
        const ps = new PerfectScrollbar(demo)
    }
    // // Dark mode toogle
    // $('.darkmode').on('click', function () {
    // 	$('body').toggleClass("dark");
    // });
})(jQuery)
let changedImages = []
function viewImage(event, i) {
    document.getElementById(`imgView${i}`).src = URL.createObjectURL(
        event.target.files[0]
    )
    let selectedFile = event.target.files[0]
    if (selectedFile) changedImages.push(i)
}
//forbidden
const interval = 500
function generateLocks() {
    const lock = document.createElement("div"),
        position = generatePosition()
    lock.innerHTML = '<div class="top"></div><div class="bottom"></div>'
    lock.style.top = position[0]
    lock.style.left = position[1]
    lock.classList = "lock" // generated';
    document.body.appendChild(lock)
    setTimeout(() => {
        lock.style.opacity = "1"
        lock.classList.add("generated")
    }, 100)
    setTimeout(() => {
        lock.parentElement.removeChild(lock)
    }, 2000)
}
function generatePosition() {
    const x = Math.round(Math.random() * 100 - 10) + "%"
    const y = Math.round(Math.random() * 100) + "%"
    return [x, y]
}
setInterval(generateLocks, interval)
generateLocks()
function validateCategory(edit) {
    const categoryName = document.getElementById("categoryName").value
    const categoryImage = document.getElementById("categoryImage").value
    const categoryDescription = document.getElementById(
        "categoryDescription"
    ).value
    var categoryImageError = ""
    var categoryNameError = ""
    var categoryDescriptionError = ""
    if (categoryName.trim() == "")
        categoryNameError = "Category name is required"
    if (edit == false) {
        if (categoryImage.trim() == "")
            categoryImageError = "Category image is requird"
    }
    if (categoryDescription.trim() == "")
        categoryDescriptionError = "catergory description is reqired"
    if (categoryNameError || categoryImageError || categoryDescriptionError) {
        document.getElementById("categoryNameError").innerHTML =
            categoryNameError
        document.getElementById("categoryImageError").innerHTML =
            categoryImageError
        document.getElementById("categoryDescriptionError").innerHTML =
            categoryDescriptionError
        return false
    } else {
        return true
    }
}




function viewCategoryImage(event) {
    document.getElementById("category_image").src = URL.createObjectURL(
        event.target.files[0]
    )
}
function viewProducts(p) {
    fetch(`/admin/viewProductPagination?page=${p}`)
        .then((res) => res.json())
        .then((data) => {
            const contentBody = document.getElementById("content-body")
            alert(contentBody)
            let c = ""
            data.forEach((element) => {
                c += `<div class="col">
                        <div class="card card-product-grid">
                            <a href="#"> <img src="/backEnd/images/product_image/${element.productImage[0]}" alt="Product" width="250" height="250"> </a>
                            <div class="info-wrap">
                                <a href="#" class="title text-truncate">${element.productName}</a>
                                <a href="#" class="title text-truncate">Category: ${element.productCategory}</a>
                                <div class="price mb-2">${element.sellingPrice}</div>
                                <a href="/admin/editProduct?id=${element._id}" class="btn btn-sm font-sm rounded btn-brand">
                                    <i class="material-icons">edit</i> Edit
                                </a>
                                <a href="/admin/delete?id=${element._id}" onclick="return confirm('Are you sure to delete this product')" class="btn btn-sm font-sm btn-light rounded">
                                    <i class="material-icons">delete_forever</i> Delete
                                </a>
                            </div>
                        </div>
                    </div>`
            })
            contentBody.innerHTML = c
        })
}
function acceptCancel(orderId, userId) {
    $.ajax({
        type: "GET",
        url: `/admin/acceptCancelation?orderId=${orderId}&userId=${userId}`, // Route on the server to handle password change
        success: function (response) {
            alert(response)
            if (response.response === "Cancelled") {
                // Display a SweetAlert for incorrect old password
                Swal.fire({
                    icon: "success",
                    html: '<p style="color: green;">Order Cancelled</p>',
                })
                // document.getElementById('reject' + `${i}`).style.display = "none";
                // document.getElementById('accept' + `${i}`).style.display = "none";
            } else if (response.response == "Refunded") {
                Swal.fire({
                    icon: "success",
                    html: '<p style="color: green;">Order Cancelled and Refunded</p>',
                })
            } else if (response.response == "RefundedWallet") {
                Swal.fire({
                    icon: "success",
                    html: '<p style="color: green;">Order Cancelled and Refunded to Wallet</p>',
                })
            }
        },
        error: function (error) {
            // Handle other errors, if any
        },
    })
}
function rejectCancel(orderId, userId) {
    $.ajax({
        type: "GET",
        url: `/admin/rejectCancelation?orderId=${orderId}&userId=${userId}`, // Route on the server to handle password change
        success: function (response) {
            if (response.response === "Cancelled") {
                // Display a SweetAlert for incorrect old password
                Swal.fire({
                    icon: "success",
                    html: '<p style="color: green;">Cancelation Declined</p>',
                })
                // document.getElementById('reject' + `${i}`).style.display = "none";
                // document.getElementById('accept' + `${i}`).style.display = "none";
            } else {
            }
        },
        error: function (error) {
            // Handle other errors, if any
        },
    })
}

$(document).ready(function () {
    // Handle form submission
    $("#addCouponForm").submit(function (event) {
        event.preventDefault()
        // Call the form validations function
        const isFormValid = validateCouponForm()
        // Call the AJAX request if form validation passes
        if (isFormValid) {
            const formData = $(this).serialize()
            // Send a POST request via AJAX to the server
            $.ajax({
                type: "POST",
                url: "/admin/addingCoupon", // Route on the server to handle password change
                data: formData,
                success: function (response) {
                    if (response.response === "added") {
                        // Display a SweetAlert for incorrect old password

                        window.location.href = "/admin/coupons"
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Password Changed",
                            text: "successfully",
                        })
                        // Password changed successfully, you can handle this case
                        // e.g., redirect to a success page or show a success message
                    }
                },
                error: function (error) {
                    // Handle other errors, if any
                },
            })
        }
    })
})

function validateCouponForm() {
    // Initialize a flag to check if the form is valid
    var formIsValid = true

    // Reset any previous error messages
    $("p.text-danger").text("")

    // Validation for the "Code" field
    var couponCode = $("#couponCode").val()
    if (couponCode === "") {
        $("#couponCodeError").text("Code is required.")
        formIsValid = false
    }

    // Validation for the "Description" field
    var couponDescription = $("#couponDescription").val()
    if (couponDescription === "") {
        $("#couponDescriptionError").text("Description is required.")
        formIsValid = false
    }

    // Validation for the "Min Purchase" field
    var minPurchase = $("#minPurchase").val()
    if (minPurchase === "") {
        $("#minPurchaseError").text("Min Purchase is required.")
        formIsValid = false
    } else if (isNaN(minPurchase) || parseFloat(minPurchase) < 0) {
        $("#minPurchaseError").text("Min Purchase must be a positive number.")
        formIsValid = false
    }

    // Validation for the "Expiry" field
    var couponExpiry = $("#couponExpiry").val()
    if (couponExpiry === "") {
        $("#couponExpiryError").text("Expiry is required.")
        formIsValid = false
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(couponExpiry)) {
        $("#couponExpiryError").text("Expiry must be in YYYY-MM-DD format.")
        formIsValid = false
    }

    // Validation for the "Discount" field
    var couponDiscount = $("#couponDiscount").val()
    if (couponDiscount === "") {
        $("#couponDiscountError").text("Discount is required.")
        formIsValid = false
    } else if (isNaN(couponDiscount) || parseFloat(couponDiscount) < 0) {
        $("#couponDiscountError").text("Discount must be a positive number.")
        formIsValid = false
    }

    // Validation for the "Max Amount" field
    var maxAmount = $("#maxAmount").val().trim()
    if (maxAmount === "") {
        $("#maxAmountError").text("Max Amount is required.")
        formIsValid = false
    } else if (isNaN(maxAmount) || parseFloat(maxAmount) < 0) {
        $("#maxAmountError").text("Max Amount must be a positive number.")
        formIsValid = false
    }

    return formIsValid
}

function convertUpperCase(inputElement) {
    inputElement.value = inputElement.value.toUpperCase()
}

function validateCouponForm() {
    // Initialize a flag to check if the form is valid
    var formIsValid = true

    // Reset any previous error messages
    $("p.text-danger").text("")

    // Validation for the "Code" field
    var couponCode = $("#couponCode").val()
    if (couponCode === "") {
        $("#couponCodeError").text("Code is required.")
        formIsValid = false
    }

    // Validation for the "Description" field
    var couponDescription = $("#couponDescription").val()
    if (couponDescription === "") {
        $("#couponDescriptionError").text("Description is required.")
        formIsValid = false
    }

    // Validation for the "Min Purchase" field
    var minPurchase = $("#minPurchase").val()
    if (minPurchase === "") {
        $("#minPurchaseError").text("Min Purchase is required.")
        formIsValid = false
    } else if (isNaN(minPurchase) || parseFloat(minPurchase) < 0) {
        $("#minPurchaseError").text("Min Purchase must be a positive number.")
        formIsValid = false
    }

    // Validation for the "Expiry" field
    var couponExpiry = $("#couponExpiry").val()
    if (couponExpiry === "") {
        $("#couponExpiryError").text("Expiry is required.")
        formIsValid = false
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(couponExpiry)) {
        $("#couponExpiryError").text("Expiry must be in YYYY-MM-DD format.")
        formIsValid = false
    }

    // Validation for the "Discount" field
    var couponDiscount = $("#couponDiscount").val()
    if (couponDiscount === "") {
        $("#couponDiscountError").text("Discount is required.")
        formIsValid = false
    } else if (isNaN(couponDiscount) || parseFloat(couponDiscount) < 0) {
        $("#couponDiscountError").text("Discount must be a positive number.")
        formIsValid = false
    }

    // Validation for the "Max Amount" field
    var maxAmount = $("#maxAmount").val().trim()
    if (maxAmount === "") {
        $("#maxAmountError").text("Max Amount is required.")
        formIsValid = false
    } else if (isNaN(maxAmount) || parseFloat(maxAmount) < 0) {
        $("#maxAmountError").text("Max Amount must be a positive number.")
        formIsValid = false
    }

    return formIsValid
}
function convertUpperCase(inputElement) {
    inputElement.value = inputElement.value.toUpperCase()
}

function dynamicStatusUpdate(status, id) {
    $.ajax({
        type: "POST",
        url: `/admin/updateStatus?status=${status}&id=${id}`, // Route on the server to handle password change
        data: { status: status, id: id },
        success: function (response) {
            if (response.response == "updated") {
                // Display a SweetAlert for incorrect old password
                Swal.fire({
                    icon: "success",
                    title: "Status updated",
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                })
                // Password changed successfully, you can handle this case
                // e.g., redirect to a success page or show a success message
            }
        },
        error: function (error) {
            // Handle other errors, if any
        },
    })
}

function displayOrder(order) {
    var ordersTableBody = document.getElementById("ordersTableBody")

    var row = document.createElement("tr")

    var idCell = document.createElement("td")
    idCell.textContent = order.orderId
    row.appendChild(idCell)

    var nameCell = document.createElement("td")
    nameCell.innerHTML = `<b>${order.name}</b>`
    row.appendChild(nameCell)

    var emailCell = document.createElement("td")
    emailCell.textContent = order.email
    row.appendChild(emailCell)

    var totalCell = document.createElement("td")
    totalCell.textContent = `₹ ${order.total}`
    row.appendChild(totalCell)

    var statusCell = document.createElement("td")
    var statusSpan = document.createElement("span")
    statusSpan.classList.add("badge", "rounded-pill", "font-sm")
    if (order.status === "Cancelled") {
        statusSpan.classList.add("alert-danger", "text-danger")
    } else {
        statusSpan.classList.add("alert-success", "text-success")
    }
    statusSpan.textContent = order.status
    statusCell.appendChild(statusSpan)
    row.appendChild(statusCell)

    var dateCell = document.createElement("td")
    dateCell.textContent = order.date
    row.appendChild(dateCell)

    var actionsCell = document.createElement("td")
    actionsCell.classList.add("text-end")

    var detailLink = document.createElement("a")
    detailLink.href = `/admin/orderDetails?id=${order.customerId}&order=${order._id}`
    detailLink.classList.add("btn", "btn-md", "rounded", "font-sm")
    detailLink.textContent = "Detail"
    actionsCell.appendChild(detailLink)

    var dropdownDiv = document.createElement("div")
    dropdownDiv.classList.add("dropdown")

    var moreHorizLink = document.createElement("a")
    moreHorizLink.href = "#"
    moreHorizLink.setAttribute("data-bs-toggle", "dropdown")
    moreHorizLink.classList.add(
        "btn",
        "btn-light",
        "rounded",
        "btn-sm",
        "font-sm"
    )
    moreHorizLink.innerHTML = '<i class="material-icons">more_horiz</i>'
    dropdownDiv.appendChild(moreHorizLink)

    if (
        order.status !== "Delivered" &&
        order.status !== "Returned" &&
        order.status !== "Cancelled" &&
        order.status !== "Cancel Requested"
    ) {
        var dropdownMenu = document.createElement("div")
        dropdownMenu.classList.add("dropdown-menu")

        var packedLink = document.createElement("a")
        packedLink.classList.add("dropdown-item")
        packedLink.href = `/admin/updateStatus?status=Packed&id=${order._id}`
        packedLink.textContent = "Packed"
        dropdownMenu.appendChild(packedLink)

        var shippedLink = document.createElement("a")
        shippedLink.classList.add("dropdown-item")
        shippedLink.href = `/admin/updateStatus?status=Shipped&id=${order._id}`
        shippedLink.textContent = "Shipped"
        dropdownMenu.appendChild(shippedLink)

        var deliveredLink = document.createElement("a")
        deliveredLink.classList.add("dropdown-item")
        deliveredLink.href = `/admin/updateStatus?status=Delivered&id=${order._id}`
        deliveredLink.textContent = "Delivered"
        dropdownMenu.appendChild(deliveredLink)

        dropdownDiv.appendChild(dropdownMenu)
    }

    actionsCell.appendChild(dropdownDiv)
    row.appendChild(actionsCell)

    ordersTableBody.appendChild(row)
}
function search() {
    var query = $("#searchInput").val()
    console.log(query)

    $.ajax({
        url: "/admin/orderSearch",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ query: query }),
        success: function (data) {
            console.log(data)
            displaySearchResults(data)
        },
        error: function (error) {
            console.error("Error:", error)
        },
    })
}

function displaySearchResults(results) {
    console.log("result is..", results)
    var contentBody = document.getElementById("ordersTableBody")
    contentBody.innerHTML = ""

    if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
            displayOrder(results[i])
        }
    } else {
        contentBody.innerHTML = "<div><h1>No Orders</h1></div>"
    }
}

function dynamicStatusUpdate(status, id) {
    $.ajax({
        type: "POST",
        url: `/admin/updateStatus?status=${status}&id=${id}`, // Route on the server to handle password change
        data: { status: status, id: id },
        success: function (response) {
            if (response.response == "updated") {
                // Display a SweetAlert for incorrect old password
                Swal.fire({
                    icon: "success",
                    title: "Status updated",
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                })
                // Password changed successfully, you can handle this case
                // e.g., redirect to a success page or show a success message
            }
        },
        error: function (error) {
            // Handle other errors, if any
        },
    })
}

function acceptCancel(orderId, userId, i) {
    $.ajax({
        type: "GET",
        url: `/admin/acceptCancelation?orderId=${orderId}&userId=${userId}`, // Route on the server to handle password change
        success: function (response) {
            if (response.response === "Cancelled") {
                // Display a SweetAlert for incorrect old password
                Swal.fire({
                    icon: "success",
                    html: '<p style="color: green;">Order Cancelled</p>',
                })
                document.getElementById("reject" + `${i}`).style.display =
                    "none"
                document.getElementById("accept" + `${i}`).style.display =
                    "none"
            } else {
            }
        },
        error: function (error) {
            // Handle other errors, if any
        },
    })
}
function rejectCancel(orderId, userId, i) {
    $.ajax({
        type: "GET",
        url: `/admin/rejectCancelation?orderId=${orderId}&userId=${userId}`, // Route on the server to handle password change
        success: function (response) {
            if (response.response === "Cancelled") {
                // Display a SweetAlert for incorrect old password
                Swal.fire({
                    icon: "success",
                    html: '<p style="color: green;">Cancelation Declined</p>',
                })
                document.getElementById("reject" + `${i}`).style.display =
                    "none"
                document.getElementById("accept" + `${i}`).style.display =
                    "none"
            } else {
            }
        },
        error: function (error) {
            // Handle other errors, if any
        },
    })
}

function handleToggle(event, id) {
    const toggleButton = event.target // Get the clicked checkbox
    if (toggleButton.checked) {
        listCategory(id)
    } else {
        unlistCategory(id)
    }
}

function listCategory(id) {
    fetch(`/admin/listCategory?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.response === "listed") {
                document.querySelector(
                    `#togBtn${id} + .slider .on`
                ).style.display = "block"
                document.querySelector(
                    `#togBtn${id} + .slider .off`
                ).style.display = "none"
            } else {
                // Handle other responses or errors
                alert("Category listing failed.")
            }
        })
        .catch((error) => {
            // Handle fetch or network errors
            console.log(error)
        })
}

function unlistCategory(id) {
    fetch(`/admin/unlistCategory?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.response === "unlisted") {
                // Handle success
                document.querySelector(
                    `#togBtn${id} + .slider .on`
                ).style.display = "none"
                document.querySelector(
                    `#togBtn${id} + .slider .off`
                ).style.display = "block"
            } else {
                // Handle other responses or errors
                alert("Category listing failed.")
            }
        })
        .catch((error) => {
            // Handle fetch or network errors
            console.log(error)
        })
}
document
    .getElementById("productEditForm")
    .addEventListener("submit", function (e) {
        const hiddenInput = document.createElement("input")
        hiddenInput.type = "hidden"
        hiddenInput.name = "changedImage"
        hiddenInput.value = changedImages.join(",")
        this.appendChild(hiddenInput)
        return true
    })

function viewImage(event, id) {
    document.getElementById(`imgView${id}`).src = URL.createObjectURL(
        event.target.files[0]
    )
}

function validateEditProduct() {
    // Get references to form elements
    const productName = document.getElementById("product_name").value
    const description = document.getElementById("description").value
    const regularPrice = document.getElementById("RP").value
    const sellingPrice = document.getElementById("SP").value
    const stock = document.getElementById("Stock").value
    // Get references to error elements
    const nameError = document.getElementById("nameError")
    const descriptionError = document.getElementById("descriptionError")
    const regularPriceError = document.getElementById("regularPriceError")
    const sellingPriceError = document.getElementById("sellingPriceError")
    const stockError = document.getElementById("stockError")
    // Reset error messages
    nameError.textContent = ""
    descriptionError.textContent = ""
    regularPriceError.textContent = ""
    sellingPriceError.textContent = ""
    stockError.textContent = ""
    let isValid = true
    // Validate product name (required)
    if (productName.trim() === "") {
        nameError.textContent = "Product name is required."
        isValid = false
    }
    // Validate description (required)
    if (description.trim() === "") {
        descriptionError.textContent = "Product description is required."
        isValid = false
    }
    // Validate regular price (required and numeric)
    if (regularPrice.trim() === "") {
        regularPriceError.textContent = "Regular price is required."
        isValid = false
    } else if (isNaN(regularPrice)) {
        regularPriceError.textContent = "Regular price must be a number."
        isValid = false
    } else if (regularPrice < 0) {
        regularPriceError.textContent = "Regular price must be positive"
        isValid = false
    }
    // Validate selling price (required and numeric)
    if (sellingPrice.trim() === "") {
        sellingPriceError.textContent = "Selling price is required."
        isValid = false
    } else if (isNaN(sellingPrice)) {
        sellingPriceError.textContent = "Selling price must be a number."
        isValid = false
    } else if (sellingPrice < 0) {
        sellingPriceError.textContent = "Selling price must be posstitve"
        isValid = false
    }
    // Validate stock (required and numeric)
    if (stock.trim() === "") {
        stockError.textContent = "Stock quantity is required."
        isValid = false
    } else if (isNaN(stock)) {
        stockError.textContent = "Stock quantity must be a number."
        isValid = false
    }
    return isValid
}

function productImageDelete(index, id) {
    Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete product image?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "GET",
                url: `/admin/productImageDelete?index=${index}>&id=${id}`, // Route on the server to handle password change

                success: function (response) {
                    if (response.response == "deleted") {
                        // Display a SweetAlert for incorrect old password
                        $(`#img_cont_${index}`).remove()
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "error occured",
                        })
                        // Password changed successfully, you can handle this case
                        // e.g., redirect to a success page or show a success message
                    }
                },
                error: function (error) {
                    // Handle other errors, if any
                },
            })
        }
    })
}

// Function to hide the success message after a specified timeout
function hideSuccessMessage() {
    var successMessage = document.getElementById("msg")
    if (successMessage) {
        setTimeout(function () {
            successMessage.style.display = "none"
        }, 2000) // Hide the message after 5 seconds (adjust the time as needed)
    }
}
// Call the function when the page loads
window.onload = hideSuccessMessage
var categoryDiscount = null
function provideDiscount(id) {
    $.ajax({
        type: "GET",
        url: `/admin/provideDiscount?id=${id}`,
        success: function (response) {
            if (response.success) {
                var discount = response.discount
                var productDiscount = $("#productDiscount").val()
                var regularPrice = $("#RP").val()
                var sellingPrice =
                    regularPrice - Math.ceil((regularPrice * discount) / 100)
                categoryDiscount = discount
                if (productDiscount < categoryDiscount)
                    $("#SP").val(sellingPrice)
            }
        },
        error: function (error) {},
    })
}

// Attach a keyup event listener to the input field with id "SP"

$("#productDiscount").on("keyup", function () {
    var regularPrice = $("#RP").val()
    console.log(categoryDiscount)

    var productDiscount = $(this).val()

    if (productDiscount < 0) {
        $("#productDiscountError").text("Negative nuumber not allowed")
    } else if (productDiscount > 100) {
        $("#productDiscountError").text("Should less than 100")
    } else {
        $("#productDiscountError").text("")
        var discountedSellingPrice =
            regularPrice - Math.ceil((regularPrice * productDiscount) / 100)
        if (categoryDiscount < productDiscount)
            $("#SP").val(discountedSellingPrice)
    }
})

function validateProductForm() {
    alert("validate")
    var productname = document.getElementById("product_name").value
    var description = document.getElementById("description").value
    var rp = document.getElementById("RP").value
    var sp = document.getElementById("SP").value
    var stock = document.getElementById("stock").value
    var imageInput = document.getElementById("img")
    var category = document.getElementsByName("category")
    var is_valid = true
    var nameError = ""
    var descriptionError = ""
    var regularPriceError = ""
    var sellingPriceError = ""
    var imageError = ""
    var stockError = ""
    var categoryError = ""

    if (productname.trim() === "") nameError = "Enter the product title"
    if (description.trim() === "")
        descriptionError = "Enter the product description"
    if (rp.trim() === "") regularPriceError = "Regular price is required"
    if (!/^[0-9]+$/.test(rp))
        regularPriceError = "Regular Price should be a number"
    if (rp < 0) regularPriceError = "Regular price cannot be negative"
    if (sp.trim() === "") sellingPriceError = "Selling price is required"
    if (!/^[0-9]+$/.test(sp))
        sellingPriceError = "Selling price should be a number"
    if (sp < 0) sellingPriceError = "Selling price cannot be negative"
    if (stock.trim() === "") stockError = "No of stock is required"
    if (!/^[0-9]+$/.test(stock)) stockError = "No of stock should be a digit"

    if (imageInput.files.length === 0) {
        imageError = "At least one image is required"
        is_valid = false
    } else {
        // Loop through each selected file
        for (var i = 0; i < imageInput.files.length; i++) {
            var file = imageInput.files[i]

            // Check the file extension or MIME type for each file
            var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
            if (!allowedExtensions.exec(file.name)) {
                imageError =
                    "Invalid file format. Only JPG, JPEG, PNG are allowed."
                is_valid = false
                break // Stop the loop if an invalid file is found
            }
        }
    }

    var categoryChecked = false
    for (let i = 0; i < category.length; i++) {
        if (category[i].checked) {
            categoryChecked = true
            break
        }
    }
    if (!categoryChecked) {
        is_valid = false
        categoryError = "Product category is required"
    }

    if (
        nameError ||
        descriptionError ||
        sellingPriceError ||
        regularPriceError ||
        stockError ||
        imageError ||
        categoryError
    ) {
        document.getElementById("nameError").innerHTML = nameError
        document.getElementById("descriptionError").innerHTML = descriptionError
        document.getElementById("regularPriceError").innerHTML =
            regularPriceError
        document.getElementById("sellingPriceError").innerHTML =
            sellingPriceError
        document.getElementById("stockError").innerHTML = stockError
        document.getElementById("imageError").innerHTML = imageError
        document.getElementById("categoryError").innerHTML = categoryError
        return false
    } else {
        return true
    }
    // If all fields are non-empty, the form will be submitted.
}

function hideSuccessMessage() {
    var successMessage = document.getElementById("msg")
    if (successMessage) {
        setTimeout(function () {
            successMessage.style.display = "none"
        }, 2000) // Hide the message after 5 seconds (adjust the time as needed)
    }
}
// Call the function when the page loads
window.onload = hideSuccessMessage
let categoryDiscount = null
function provideDiscount(id) {
    $.ajax({
        type: "GET",
        url: `/admin/provideDiscount?id=${id}`,
        success: function (response) {
            if (response.success) {
                var discount = response.discount
                var productDiscount = $("#productDiscount").val()
                var regularPrice = $("#RP").val()
                var sellingPrice =
                    regularPrice - Math.ceil((regularPrice * discount) / 100)
                categoryDiscount = discount
                if (productDiscount < categoryDiscount)
                    $("#SP").val(sellingPrice)
            }
        },
        error: function (error) {},
    })
}

// Attach a keyup event listener to the input field with id "SP"
$("#productDiscount").on("keyup", function () {
    var regularPrice = $("#RP").val()
    console.log(categoryDiscount)

    var productDiscount = $(this).val()

    if (productDiscount < 0) {
        $("#productDiscountError").text("Negative nuumber not allowed")
    } else if (productDiscount > 100) {
        $("#productDiscountError").text("Should less than 100")
    } else {
        $("#productDiscountError").text("")
        var discountedSellingPrice =
            regularPrice - Math.ceil((regularPrice * productDiscount) / 100)
        if (categoryDiscount < productDiscount)
            $("#SP").val(discountedSellingPrice)
    }
})

function navigate(index) {
    let url = `/admin/viewProducts?page=${index}&ajax=true`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for (let pageIndex = 1; pageIndex <= data.count; pageIndex++) {
                const pageElement = document.getElementById(
                    `pagenate_${pageIndex}`
                )
                if (pageElement) {
                    if (data.page == pageIndex) {
                        pageElement.classList.add("active")
                    } else {
                        pageElement.classList.remove("active")
                    }
                }
            }
            // Assuming there is a container element with id "productContainer" to display the fetched data
            var productContainer = document.getElementById("content-body")
            productContainer.innerHTML = ""

            let text = ""
            data.products.forEach((product) => {
                text += `<div class="col" id="pro_${product._id}">
                <div class="card card-product-grid">
                    <a href="#" class=""> 
                        <img src="/backEnd/images/cropped_image/${product.productImage[0]}" alt="Product">
                    </a>
                    <div class="info-wrap">
                        <a href="#" class="title text-truncate">
                            ${product.productName}
                        </a>
                        <a href="#" class="title text-truncate">Category:${product.productCategory}</a>
                        <div class="price mb-2">
                            ₹ ${product.sellingPrice}
                        </div>`

                // Control statement based on product stock
                if (product.productStock > 0) {
                    text += `<p class="title text-truncate">
                    <span class="text-success">In Stock</span> (${product.productStock})
                </p>`
                } else {
                    text += `<p class="title text-truncate">
                    <span class="text-danger">Out of Stock</span> (${product.productStock})
                </p>`
                }

                // Continue with the rest of the HTML
                text += `<a href="/admin/editProduct?id=${product._id}" class="btn btn-sm font-sm rounded btn-brand">
                <i class="material-icons">edit</i> Edit
            </a>
            <a href="#" onclick="removeProduct('${product._id}')" class="btn btn-sm font-sm btn-light rounded">
                <i class="material-icons">delete_forever</i> Delete
            </a>
        </div>
    </div> <!-- card-product end// -->
</div> <!-- col.// -->`

                // Set innerHTML after the loop
                productContainer.innerHTML = text
            })

            console.log(data.products)
        })
        .catch((error) => console.error("Error:", error))
}
function removeProduct(id) {
    $.ajax({
        type: "GET",
        url: `/admin/delete?id=${id}`,
        success: function (response) {
            if (response.response === "removed") {
                $(`#pro_${id}`).remove()
            }
        },
        error: function (error) {
            // Handle other errors, if any
        },
    })
}

function search() {
    var query = $("#searchInput").val()
    console.log(query)

    $.ajax({
        url: "/admin/search",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ query: query }),
        success: function (data) {
            console.log(data)
            displaySearchResults(data)
        },
        error: function (error) {
            console.error("Error:", error)
        },
    })
}

function displaySearchResults(results) {
    console.log("result is..", results)
    var contentBody = document.getElementById("content-body")
    contentBody.innerHTML = ""
    var pagination = (document.getElementById("pagination").innerHTML = "")

    if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
            var product = results[i]

            var productCard = `
            <div class="col" id="pro_${product._id}">
                <div class="card card-product-grid">
                    <a href="#"> <img src="/backEnd/images/cropped_image/${
                        product.productImage[0]
                    }" alt="Product"> </a>
                    <div class="info-wrap">
                        <a href="#" class="title text-truncate">${
                            product.productName
                        }</a>
                        <a href="#" class="title text-truncate">Category:${
                            product.productCategory
                        }</a>
                        <div class="price mb-2">₹ ${product.sellingPrice}</div>
                        ${
                            product.productStock > 0
                                ? `<p class="title  text-truncate"><span class="text-success">In Stock</span> (${product.productStock})</p>`
                                : `<p class="title  text-truncate"><span class="text-danger">Out of Stock</span> (${product.productStock})</p>`
                        }
                        <a href="/admin/editProduct?id=${
                            product._id
                        }" class="btn btn-sm font-sm rounded btn-brand">
                            <i class="material-icons ">edit</i> Edit
                        </a>
                        <a href="#" onclick="removeProduct('${
                            product._id
                        }')" class="btn btn-sm font-sm btn-light rounded">
                            <i class="material-icons ">delete_forever</i> Delete
                        </a>
                    </div>
                </div>
            </div>`

            contentBody.insertAdjacentHTML("beforeend", productCard)
        }
    } else {
        contentBody.innerHTML = "<div><h1>No Products</h1></div>"
    }
}

