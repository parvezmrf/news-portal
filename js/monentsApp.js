const loadNewsCategory = async () => {
    const newsResponse = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const newsData = await newsResponse.json();
    const allNews = newsData.data
    // console.log(allNews);
    return allNews;

}

const showNewsMenu = async () => {
    const newsList = await loadNewsCategory();
    const newsCategory = newsList.news_category;


    for (const singleCate of newsCategory) {
        const categoryTitle = singleCate.category_name;
        const categoryId = singleCate.category_id;
        // console.log(categoryTitle, categoryId)

        const categorySection = document.getElementById('news-category');
        const li = document.createElement('li')
        li.innerHTML = `
        
       <button onclick="loadNews(${categoryId})" > ${categoryTitle}</button>
        `
        categorySection.appendChild(li);


    }




}

const url = 'https://openapi.programming-hero.com/api/news/category/'

function loadNews(id) {
    console.log(id)
    console.log(url)
}




// const loadNewsList = (id) => {
//     const newsResponse = await fetch('https://openapi.programming-hero.com/api/news/category/01');
//     const newsData = await newsResponse.json();

//     console.log('2nd', newsData.data)

// }


loadNewsCategory()
showNewsMenu()

// loadNewsList()


