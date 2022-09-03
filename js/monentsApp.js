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


const newsBodySection = document.getElementById('news-body-section');


const loadNews = async id => {
    const newsClickLink = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    const clickLinkDataJSON = await newsClickLink.json();
    const clickLinkDataArray = clickLinkDataJSON.data;
    console.log(clickLinkDataArray);
    console.log(clickLinkDataArray.length);
    // console.log(clickLinkDataArray.length);
    if (clickLinkDataArray.length != 0) {
        for (const neswBody of clickLinkDataArray) {
            console.log(neswBody)
            console.log(neswBody.title)
            console.log(neswBody.thumbnail_url)
            // console.log(neswBody.details)
            console.log(neswBody.author.img)
            console.log(neswBody.author.name)

            console.log(neswBody.total_view)
            console.log(neswBody._id)
        }

    }
    else {
        console.log('no data')
    }



}

loadNews(05);


// const loadNewsList = (id) => {
//     const newsResponse = await fetch('https://openapi.programming-hero.com/api/news/category/01');
//     const newsData = await newsResponse.json();

//     console.log('2nd', newsData.data)

// }


loadNewsCategory()
showNewsMenu()

// loadNewsList()


