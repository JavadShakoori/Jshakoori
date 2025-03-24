// اطلاعات پست‌های وبلاگ
const blogPosts = [
    {
        id: 1,
        title: "اولین پست وبلاگ من",
        date: "22 مارس 2024",
        excerpt: "در این پست، درباره ساخت وب‌سایت با استفاده از GitHub Pages صحبت می‌کنم و مزایای آن را برای شما شرح می‌دهم.",
        content: "",
        image: "images/github-pages.jpg",
        author: "نویسنده",
        category: "آموزش",
        tags: ["GitHub Pages", "وب‌سایت استاتیک", "طراحی وب"],
        url: "posts/first-post.html"
    },
    // پست‌های دیگر در اینجا اضافه می‌شوند
];

// عناصر DOM
const blogPostsContainer = document.getElementById('blog-posts');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// نمایش پست‌های وبلاگ در صفحه
function displayBlogPosts(posts = blogPosts) {
    // خالی کردن محتوای فعلی
    blogPostsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        blogPostsContainer.innerHTML = '<p class="no-posts">هیچ پستی یافت نشد!</p>';
        return;
    }
    
    // اضافه کردن کارت‌های پست به صفحه
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('blog-card');
        
        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-card-img">
            <div class="blog-card-content">
                <div class="blog-card-date">${post.date}</div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="blog-card-link">ادامه مطلب <i class="fas fa-arrow-left"></i></a>
            </div>
        `;
        
        blogPostsContainer.appendChild(postCard);
    });
}

// جستجو در پست‌های وبلاگ
function searchPosts(query) {
    query = query.trim().toLowerCase();
    
    if (!query) {
        displayBlogPosts();
        return;
    }
    
    const filteredPosts = blogPosts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const categoryMatch = post.category.toLowerCase().includes(query);
        const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(query));
        
        return titleMatch || excerptMatch || categoryMatch || tagsMatch;
    });
    
    displayBlogPosts(filteredPosts);
}

// رویدادها
searchButton.addEventListener('click', () => {
    searchPosts(searchInput.value);
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchPosts(searchInput.value);
    }
});

// نمایش پست‌ها هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    displayBlogPosts();
}); 