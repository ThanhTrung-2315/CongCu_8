// ============================================
// CONSTANTS & DATA
// ============================================

/**
 * Dữ liệu sản phẩm gốc (immutable)
 * @constant {Array<Object>}
 */
const ORIGINAL_PRODUCTS = Object.freeze([
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
]);

/**
 * Enum cho các loại sắp xếp
 * @constant {Object}
 */
const SORT_TYPES = {
    DEFAULT: 'default',
    PRICE_ASC: 'price-asc',
    PRICE_DESC: 'price-desc'
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Sắp xếp mảng sản phẩm theo giá (tối ưu với ternary operator)
 * @param {Array<Object>} arr - Mảng sản phẩm cần sắp xếp
 * @param {string} order - Thứ tự sắp xếp: 'asc' | 'desc'
 * @returns {Array<Object>} Mảng đã được sắp xếp
 */
const sortByPrice = (arr, order = 'asc') =>
    [...arr].sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);

/**
 * Định dạng số tiền theo chuẩn Việt Nam
 * @param {number} price - Giá tiền
 * @returns {string} Chuỗi đã định dạng
 */
const formatPrice = (price) => `${price.toLocaleString('vi-VN')} ₫`;

/**
 * Tạo HTML cho một product card
 * @param {Object} product - Thông tin sản phẩm
 * @returns {string} HTML string
 */
const createProductCardHTML = ({ image, name, price, category }) => `
    <img src="${image}" alt="${name}" class="product-image" loading="lazy">
    <h3 class="product-name">${name}</h3>
    <p class="product-price">${formatPrice(price)}</p>
    <span class="product-category">${category}</span>
`;

// ============================================
// DOM MANIPULATION
// ============================================

/**
 * Render danh sách sản phẩm (tối ưu với DocumentFragment)
 * @param {Array<Object>} productsToRender - Mảng sản phẩm cần hiển thị
 */
const renderProducts = (productsToRender) => {
    const container = document.getElementById('productsContainer');

    if (!container) {
        console.error('Container element not found');
        return;
    }

    // Sử dụng DocumentFragment để giảm reflow/repaint
    const fragment = document.createDocumentFragment();

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = createProductCardHTML(product);
        fragment.appendChild(productCard);
    });

    // Clear và append một lần duy nhất
    container.innerHTML = '';
    container.appendChild(fragment);
};

/**
 * Lấy danh sách sản phẩm đã sắp xếp theo loại
 * @param {string} sortType - Loại sắp xếp
 * @returns {Array<Object>} Mảng sản phẩm đã sắp xếp
 */
const getSortedProducts = (sortType) => {
    switch (sortType) {
        case SORT_TYPES.PRICE_ASC:
            return sortByPrice(ORIGINAL_PRODUCTS, 'asc');
        case SORT_TYPES.PRICE_DESC:
            return sortByPrice(ORIGINAL_PRODUCTS, 'desc');
        case SORT_TYPES.DEFAULT:
        default:
            return [...ORIGINAL_PRODUCTS];
    }
};

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Xử lý sự kiện thay đổi dropdown sắp xếp
 * @param {Event} event - Change event
 */
const handleSortChange = ({ target: { value } }) => {
    const sortedProducts = getSortedProducts(value);
    renderProducts(sortedProducts);
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Khởi tạo ứng dụng
 */
const init = () => {
    // Render sản phẩm ban đầu
    renderProducts(ORIGINAL_PRODUCTS);

    // Gắn sự kiện cho dropdown với error handling
    const sortSelect = document.getElementById('sortSelect');

    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    } else {
        console.error('Sort select element not found');
    }
};

// Chạy khi DOM đã load xong
document.addEventListener('DOMContentLoaded', init);
