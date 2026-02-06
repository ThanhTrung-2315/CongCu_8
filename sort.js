// Dữ liệu sản phẩm mẫu
let products = [
    {
        id: 1,
        name: "Laptop Dell XPS 13",
        price: 25000000,
        category: "Laptop",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        price: 32000000,
        category: "Điện thoại",
        image: "https://images.unsplash.com/photo-1592286927505-b0501e6f7d3a?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Samsung Galaxy S24",
        price: 18000000,
        category: "Điện thoại",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "MacBook Pro M3",
        price: 45000000,
        category: "Laptop",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "iPad Air",
        price: 15000000,
        category: "Tablet",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "AirPods Pro",
        price: 6000000,
        category: "Tai nghe",
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        price: 8500000,
        category: "Tai nghe",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Apple Watch Series 9",
        price: 12000000,
        category: "Đồng hồ",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop"
    }
];

// Lưu mảng gốc để có thể reset
let originalProducts = [...products];

/**
 * Hàm sắp xếp mảng sản phẩm theo giá
 * @param {Array} arr - Mảng sản phẩm cần sắp xếp
 * @param {string} order - Thứ tự sắp xếp: 'asc' (tăng dần) hoặc 'desc' (giảm dần)
 * @returns {Array} - Mảng đã được sắp xếp
 */
function sortByPrice(arr, order = 'asc') {
    return [...arr].sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price; // Giá thấp đến cao
        } else {
            return b.price - a.price; // Giá cao đến thấp
        }
    });
}

/**
 * Định dạng số tiền theo chuẩn Việt Nam
 * @param {number} price - Giá tiền
 * @returns {string} - Chuỗi đã định dạng
 */
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' ₫';
}

/**
 * Render danh sách sản phẩm ra HTML
 * @param {Array} productsToRender - Mảng sản phẩm cần hiển thị
 */
function renderProducts(productsToRender) {
    const container = document.getElementById('productsContainer');

    // Xóa nội dung cũ
    container.innerHTML = '';

    // Tạo HTML cho từng sản phẩm
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <span class="product-category">${product.category}</span>
        `;

        container.appendChild(productCard);
    });
}

/**
 * Xử lý sự kiện thay đổi dropdown sắp xếp
 */
function handleSortChange(event) {
    const sortValue = event.target.value;
    let sortedProducts;

    switch (sortValue) {
        case 'price-asc':
            sortedProducts = sortByPrice(products, 'asc');
            break;
        case 'price-desc':
            sortedProducts = sortByPrice(products, 'desc');
            break;
        case 'default':
        default:
            sortedProducts = [...originalProducts];
            break;
    }

    // Cập nhật mảng products hiện tại
    products = sortedProducts;

    // Render lại giao diện
    renderProducts(sortedProducts);
}

/**
 * Khởi tạo ứng dụng
 */
function init() {
    // Render sản phẩm ban đầu
    renderProducts(products);

    // Gắn sự kiện cho dropdown
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', handleSortChange);
}

// Chạy khi DOM đã load xong
document.addEventListener('DOMContentLoaded', init);
