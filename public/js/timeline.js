const con = document.querySelector('.xix');

let limit = 3;
let pageCount = 1;
let postCount = 1;
let skip = 0;
let side = "secLeft";



    const getPost = async () => {
        const response = await fetch(`https://blog-web-app-first.herokuapp.com/timelinecontents?limit=${limit}&id=${skip}`);


       var data = await response.json();
  


data.forEach((curElm,index) => {
   
    const htmlData = `
    <div class="site-content">
                                <div class="posts">
                                    <div class="post-content" data-aos="zoom-in" data-aos-delay="200">
                                        <div class="post-image">
                                            <div>
                                                <img src="./img/${curElm.avatar}"
                                                    class="img" alt="blog1" style="width: 40%;">
                                            </div>
                                            <div class="post-info" style="font-size: 18px;">
                                                <span class="badge bg-warning text-dark rounded-pill"><i
                                                        class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin&nbsp;
                                                    <i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January
                                                    14, 2019 &nbsp;
                                                    <i class="fas fa-comment"></i>&nbsp;&nbsp;2 Commets
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="post-title mt-2">
                                        <a href="#">
                                            <h5>${curElm.heading}</h5>
                                        </a>
                                        <p>${curElm.body}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr> `;

    con.insertAdjacentHTML('afterend', htmlData);
    //console.log(curElm.avatar);
  })



}


 getPost();

const showData = () => {
    setTimeout(() => {
        
       skip+=3;
      
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