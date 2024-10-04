// time zone function
function getTimingStart(time) {
    const hours = parseInt(time / 3600);
    const remainingSecond = parseInt(time % 3600);
    const minute = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return `${hours}. ${minute}.${second}`
}

const removeBtnClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    console.log(buttons)
    for(const btn of buttons){
        btn.classList.remove('active')
    }
}



// create load Categories  //
const loadCategories = () => {

    // create fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displaySort(data.categories))
        .catch(error => console.log(error))
}

// create load videos 
const loadVideo = (searchTaxt = "") => {
    // create fetch the video data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTaxt}`)
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch(error => console.log(error))
}


const loadFunction = (id) => {
    //    active class removed here
    removeBtnClass()

    // active class added here
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active')
            displayVideo(data.category)
        })
        .catch(error => console.log(error))
};

const loadDetails = async (videoId) => {
    console.log(videoId)

    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url);
    const data = await res.json();
    displayVideoDetails(data.video)
}

const displayVideoDetails = (video) => {
    console.log(video)

    const detailsContainer = document.getElementById('modail-content');
    detailsContainer.innerHTML = `
    <img src=${video.thumbnail} alt="">
    <p>${video.description}</p>

    
    `
    // way 1 
    // document.getElementById('show-modal-data').click();

    // way-2

    document.getElementById('customModal').showModal();
}
// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


// create display video categories //
const displayVideo = (video) => {
    const displayVideoCards = document.getElementById('videos');
    displayVideoCards.innerHTML = "";

    if (video.length == 0) {
        displayVideoCards.classList.remove("grid");
        displayVideoCards.innerHTML = `
            <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center]">
                <img 
                class="w-[200px] mx-auto"
                src="./assets/Icon.png" alt="icon image">
                <h2 class="text-center text-xl font-bold ">
                    No Content Here in this Category
                </h2>
            </div>          
        `;
        return
    } else {
        displayVideoCards.classList.add("grid");
    }

    video.forEach((item) => {
        console.log(item)

        // create video categories
        const videoCards = document.createElement('div')
        videoCards.classList = 'card card-compact'
        videoCards.innerHTML =
            `
    <figure class="h-[200px] relative">
        <img
        src= '${item.thumbnail}'
        class="w-full h-full object-cover"
        alt="Shoes" />
        ${item.others.posted_date?.length == 0
                ? ""
                :
                ` <span class="absolute text-xs right-2 bottom-2 bg-black text-white p-1 rounded" >
        ${getTimingStart(item.others.posted_date)}</span>`
            }

       

    </figure>

    <div class="py-2 px-0 flex gap-2">
        <div>
            <img class="w-10 h-10 rounded-full object-cover"
             src= ${item.authors[0].profile_picture}
             alt="">
        </div>
 
        <div>
            <h2 class="font-bold ">${item.title}</h2>
            <div class="flex gap-2 items-center">
            <p class="text-gray-400">${item.authors[0].profile_name}</p>

            ${item.authors[0].verified === true 
                ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="">' 
                : ""}
            
        </div>
         <p>
         
         <button onclick="loadDetails('${item.video_id}')" class="btn btn-sm btn-error">detailse</button>

         </p>       
    </div>
        
        `

        displayVideoCards.append(videoCards)
    })

}



// create display categories //
const displaySort = (categories) => {
    const categoriyes = document.getElementById('categoriyes')
    categories.forEach((items) => {

        // create category button //
        const categoriesBtnContainer = document.createElement('div')
        categoriesBtnContainer.innerHTML =
            `
        <botton id="btn-${items.category_id}" onclick ="loadFunction( ${items.category_id})" class=" btn category-btn">
        ${items.category}
        </botton>
        
        `


        categoriyes.append(categoriesBtnContainer)
    });
}

document.getElementById('search-input').addEventListener('keyup', (search) => {
    loadVideo(search.target.value)
})

loadCategories()
loadVideo()