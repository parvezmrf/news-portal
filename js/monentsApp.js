const loadNewsCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try {
        const newsResponse = await fetch(url);
        const newsData = await newsResponse.json();
        const allNews = newsData.data
        // console.log(allNews);
        return allNews;
    }
    catch (error) {
        console.log(error)

    }
}


const showNewsMenu = async () => {
    const newsList = await loadNewsCategory();
    const newsCategory = newsList.news_category;

    for (const singleCate of newsCategory) {
        const categoryTitle = singleCate.category_name;
        const categoryId = singleCate.category_id;
        //  console.log(categoryTitle, categoryId)

        const categorySection = document.getElementById('news-category');
        const li = document.createElement('li')
        li.innerHTML = `
        
       <button onclick="loadNews(${categoryId})" > ${categoryTitle}</button>
        `
        categorySection.appendChild(li);


    }




}

const loadDetails = async newsid => {
    const newsDetailsData = await fetch(`https://openapi.programming-hero.com/api/news/${newsid}`);
    const newsDetailsDataJSON = await newsDetailsData.json();

    const modalData = newsDetailsDataJSON.data[0]


    console.log(modalData)

    const modalBody = document.getElementById('modal-title');
    modalBody.innerHTML = `
    <div class="modal-box w-11/12 max-w-5xl">
            <h2 class="font-bold text-2xl pb-5"> ${modalData.title}  </h2>

            <img class=" pb-5" src="${modalData.thumbnail_url}" alt="">

            <h3 class="font-bold text-lg">Author Name: ${modalData.author.name === null ? 'Not Found' : modalData.author.name}</h3>

            <h3 class="font-semibold text-md">Views: ${modalData.total_view === null || modalData.total_view === 0 ? 'No Views' : modalData.total_view}</h3>

            <p class="py-4">${modalData.details}
            </p>
            <div class="modal-action">
                <label for="my-modal-5" class="btn">close</label>
            </div>
        </div>
    
    `
    // console.log(modalBody.innerText)



}





const loadNews = async id => {
    const newsClickLink = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`);

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden')

    const clickLinkDataJSON = await newsClickLink.json();
    const clickLinkDataArray = clickLinkDataJSON.data;
    // console.log(clickLinkDataArray);

    if (clickLinkDataArray.length != 0) {

        //------------------------------------------------------
        const newsBodySection = document.getElementById('news-body-section');
        newsBodySection.textContent = ''

        const newsCounter = document.getElementById('news-counter');
        newsCounter.textContent = ''
        const div = document.createElement('div')

        div.innerHTML = `
        <h1 class="text-2xl font-semibold text-center">${clickLinkDataArray.length} news Found</h1>
        `

        newsCounter.appendChild(div)



        clickLinkDataArray.forEach(neswBody => {
            // console.log(neswBody)
            // console.log(neswBody.title)
            // console.log(neswBody.thumbnail_url)
            // // console.log(neswBody.details)
            // console.log(neswBody.author.img)
            // console.log(neswBody.author.name)

            // console.log(neswBody.total_view)
            // console.log(neswBody._id)

            const { title, thumbnail_url, details, author, total_view, _id } = neswBody;



            const div = document.createElement('div');

            div.innerHTML = `
            <div class="bg-base-100 block lg:flex">
                <div class="w-96">
                <img class="h-full w-52 " src="${thumbnail_url}" alt="">
                 </div>


                 <div class="pl-10 pr-10 pt-5">
                <h1 class="text-2xl pb-5 font-semibold">${title}
                </h1>
                <p>${details.length > 200 ? neswBody.details.slice(0, 250) + '.' : details}</p>

                
                <p class="pt-5">
                ${details.length > 200 ? details.slice(250, 500) + '...' : details}
                </p>

                <div class="lg:flex justify-between items-center py-5">
                    <div class="flex items-center">
                        <img class="rounded-full h-12" src="${author.img}" alt="">
                        
                        <div class="pl-5">
                            <p class="text-xl font-semibold">${author.name === null ? 'Author Not Found' : author.name}</p>
                            <p>${author.published_date === null ? 'No Date Found' : author.published_date}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img class="w-10" src="img/view.svg" alt="">
                        <p class="text-xl font-bold">${total_view === null || total_view === 0 ? 'No Views' : total_view}</p>
                    </div>


                    <img class="w-20" src="img/rating.png" alt="">
                                 <label for="my-modal-5" class="btn btn-outline btn-primary" onclick="loadDetails('${_id}')">Read Details</label>



                </div>

            </div>
        
            `


            newsBodySection.appendChild(div);

            //  here modal


        })






    }
    else {
        const newsBodySection = document.getElementById('news-body-section');
        newsBodySection.textContent = ''

        const newsCounter = document.getElementById('news-counter');
        newsCounter.textContent = ''
        const div = document.createElement('div')

        div.innerHTML = `
        <h1 class="text-2xl font-semibold text-center">No news in this section</h1>
        `

        newsCounter.appendChild(div)

    }

    spinner.classList.add('hidden')


}

loadNews(08);
loadNewsCategory()
showNewsMenu()
