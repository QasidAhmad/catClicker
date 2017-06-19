/* ------ Model ------ */
var model = {
    currentCat: null,
    cats: [ 
        {   clickCount: 0,
            catName: "Polo",
            imgSRC: "img/Polo.jpg"
        },
        {   clickCount: 0,
            catName: "Boxer",
            imgSRC: "img/Boxer.jpg"
        },
        {   clickCount: 0,
            catName: "Twini",
            imgSRC: "img/Twini.jpg"
        }
    ]
};
/* ------ Control ------ */
var controller = {
    init: function(){
        //Specify to model initial current cat (to be displayed)
        model.currentCat = model.cats[0]; 
        model.currentCat.catNum = 0; 
        catView.init();  //Initialise catView (cat image, heading, counter)
        catListView.init(); //Ininialise catListView 
        adminView.init(); //Inintialise admin view (which works on click)
    },
    getCurrentCat: function(){
        return model.currentCat; 
    }, 
    getCatsData: function(){
        return model.cats;
    },
    setCurrentCat: function(catNum){
        model.currentCat = model.cats[catNum];
        model.currentCat.catNum = catNum;
        adminView.render();
    },
    incrementCounter: function(){
        model.currentCat.clickCount++;
        catView.render();
        adminView.render();
    },
    updateCurrentCat: function(catNum, newName, newImg, newClickCount){
        model.cats[catNum].catName = newName;
        model.cats[catNum].imgSRC = newImg;
        model.cats[catNum].clickCount = newClickCount;
        controller.setCurrentCat(catNum);
        catListView.render();
        catView.render();
    }
};
    /* ------ View ------ */
var catView = { // render cat img, heading and counter
   init: function(){
            //Store DOM pointers // made object properties for ease of access
            this.NameEl = document.getElementById("catName-h2");
            this.ListEl = document.getElementById("catList-ul");
            this.CounterEl = document.getElementById("counter-div");
            this.ImageEl = document.getElementById("cat-img");

            this.ImageEl.addEventListener("click", function(){
                controller.incrementCounter() //Increment cat counter on click 
            }); 
            this.render(); //Render catView
        },

        render: function(){
            var currentCat = controller.getCurrentCat(); //get current cat
            this.ImageEl.src = currentCat.imgSRC;//update current cat image
            this.CounterEl.textContent = currentCat.clickCount; //update click counter
            this.NameEl.textContent = currentCat.catName; //update cat name heading
        }
    };     

var catListView = { // render cat list
  init: function(){
            this.ListEl = document.getElementById("catList-ul"); //Store DOM pointer
            this.render(); //Render catListView
        },
        render: function(){
            //clear previous list
            this.ListEl.innerHTML = '';
            //render updated list
            var cats = controller.getCatsData(); //get cats data
            for (var i=0; i<cats.length; i++ ){ // loop through cats (could use forEach)
                this.listItemEl = document.createElement('li');
                this.listItemEl.textContent = cats[i].catName; 
                //update current cat on click (using IIFE)
                this.listItemEl.addEventListener('click', (function(iCopy) {
                    return function() {
                        controller.setCurrentCat(iCopy);
                        catView.render();
                    }   
                })(i));
            this.ListEl.appendChild(this.listItemEl); //add this list item to the list element
            }
        }
    };      

var adminView = {
    init: function(){
        //Store DOM pointers (made object properties for ease of access) 
        this.adminBtn = document.getElementById("admin-btn");
        this.adminForm = document.getElementById("admin-form");
        this.catNameInput = document.getElementById("catName-input");
        this.catImgInput = document.getElementById("catImg-input");
        this.clickCountInput = document.getElementById("clickCount-input");
        this.submitBtn = document.getElementById("submit-btn");
        this.cancelBtn = document.getElementById("cancel-btn");
        //initially hide admin form
        this.adminForm.style.display = "none";
        //add click event listener to admin button to reveal admin form
        this.adminBtn.addEventListener("click", function(){
            adminView.adminForm.style.display = "block" // rendered as block level element
        });
        this.render();
    },
    render: function(){
        //get current cat data
        this.currentCat = controller.getCurrentCat();
        // put current cat data into form
        this.catNameInput.value = this.currentCat.catName;
        this.catImgInput.value = this.currentCat.imgSRC;
        this.clickCountInput.value = this.currentCat.clickCount;

        //add click event listener to save button 
        this.submitBtn.addEventListener("click", function(){
            // get current cat
            var currentCat = controller.getCurrentCat();
            var catNum = currentCat.catNum; 
            //get data from forms
            var newName = adminView.catNameInput.value;
            var newImg = adminView.catImgInput.value;
            var newClickCount = adminView.clickCountInput.value;
            // feed new data into current cat data
            controller.updateCurrentCat(catNum, newName, newImg, newClickCount);
        });
        this.cancelBtn.addEventListener("click", function(){
            //get current cat data
            this.currentCat = controller.getCurrentCat();
            // put current cat data into form
            adminView.catNameInput.value = this.currentCat.catName;
            adminView.catImgInput.value = this.currentCat.imgSRC;
            adminView.clickCountInput.value = this.currentCat.clickCount;
            //hide admin form
            adminView.adminForm.style.display = "none";
        });
    }
};

controller.init();