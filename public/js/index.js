const con = document.querySelector('.posts');

let limit = 5;
let pageCount = 1;
let postCount = 1;
let skip = 0;
let side = "secLeft";



    const getPost = async () => {
        const response = await fetch(`https://blog-web-app-first.herokuapp.com/contents?limit=${limit}&id=${skip}`);


       var data = await response.json();
       //console.log(data); 

// var config = {
//     methode:'get',
//     url:`http://localhost:3000/news?limit=${limit}`,
// };
// axios(config).then((res)=>{
//     const data   = res.data;
    
//     console.log(data);


data.forEach((curElm,index) => {
    // if(side == "secRight"){
    //     side = "secLeft";

    // }else{
    //     side = "secRight";

    // }
    const htmlData = `
    <div class="post-content" data-aos="zoom-in" data-aos-delay="200">
                        <div class="post-image">
                            <div>
                                <img src="./img/${curElm.avatar}" class="img" alt="blog1">
                            </div>
                            <div class="post-info flex-row">
                                <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;${curElm.writer}</span>
                                <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                <span>${curElm.comment} Commets</span>
                            </div>
                        </div>
                        <div class="post-title">
                            <a href="#">${curElm.heading}</a>
                            <p>${curElm.body}</p>
                            <button class="btn post-btn">Read More &nbsp; <i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                    <hr> `;

    con.insertAdjacentHTML('beforeend', htmlData);
    //console.log(curElm.avatar);
  })



}


 getPost();

const showData = () => {
    setTimeout(() => {
        
       skip+=5;
    //    if(skip==50){
    //     skip=0;
    //}
       getPost();
    },300)
};

window.addEventListener('scroll', () =>{
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight  >= scrollHeight - 1 ){
       // console.log('I am at bottom');
        showData();
    } 
})