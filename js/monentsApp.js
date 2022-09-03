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




const loadNews = async id => {
    const newsClickLink = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    const clickLinkDataJSON = await newsClickLink.json();
    const clickLinkDataArray = clickLinkDataJSON.data;
    console.log(clickLinkDataArray);
    console.log(clickLinkDataArray.length);
    // console.log(clickLinkDataArray.length);
    if (clickLinkDataArray.length != 0) {
        const newsBodySection = document.getElementById('news-body-section');

        for (const neswBody of clickLinkDataArray) {
            console.log(neswBody)
            console.log(neswBody.title)
            console.log(neswBody.thumbnail_url)
            // console.log(neswBody.details)
            console.log(neswBody.author.img)
            console.log(neswBody.author.name)

            console.log(neswBody.total_view)
            console.log(neswBody._id)

            const div = document.createElement('div');

            div.innerHTML = `
            <div class="bg-base-100 flex">
            <div class="border-4 border-indigo-600 w-96">
                <img class="h-full" src="${neswBody.thumbnail_url}" alt="">
            </div>


            <div class="pl-10 pr-10 pt-5">
                <h1 class="text-2xl pb-5 font-semibold">${neswBody.title}
                </h1>
                <p>${neswBody.details.length > 200 ? neswBody.details.slice(0, 250) + '.' : neswBody.details}</p>

                
                <p class="pt-5">
                ${neswBody.details.length > 200 ? neswBody.details.slice(250, 500) + '...' : neswBody.details}
                </p>

                <div class="flex justify-between items-center pt-5">
                    <div class="flex items-center">
                        <img class="rounded-full h-12" src="${neswBody.author.img}" alt="">
                        <div class="pl-5">
                            <p class="text-xl font-semibold"> ${neswBody.author.name}</p>
                            <p>${neswBody.author.published_date}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img class="w-10" src="img/view.svg" alt="">
                        <p class="text-xl font-bold">${neswBody.total_view}M </p>
                    </div>
                    <img class="w-20" src="img/rating.png" alt="">
                    <button class="btn btn-primary">---></button>
                </div>

            </div>
        </div>
            `

            newsBodySection.appendChild(div)

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


