// local reviews data
const reviews = [
  {
    id: 0,
    name: "sara jonens",
    job: "ux designer",
    img:
      "person-1.jpeg",
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
    totam ipsa tempore sunt quos nisi pariatur perspiciatis voluptatum
    necessitatibus similique voluptatibus impedit quam corporis, odio
    enim optio quibusdam recusandae illum!`
  },
  {
    id: 1,
    name: "susan smith",
    job: "web developer",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    text:
      "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: "anna johnson",
    job: "web designer",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
    text:
      "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
  },
  {
    id: 3,
    name: "peter jones",
    job: "intern",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
    text:
      "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
  },
  {
    id: 4,
    name: "bill anderson",
    job: "the boss",
    img:
      "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
    text:
      "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  },
];
let currentItem = 0;
document.querySelector(".prev-btn").onclick = addPerson(1)
document.querySelector(".next-btn").onclick = addPerson(-1)
document.querySelector(".random-btn").onclick = addPerson("rand")

function addPerson(num) {
  return () => {
    let review;
    let index;
    if (typeof num == "string") {
      review = reviews[uniqueNum(currentItem)]
    }
    else {
      index = currentItem + num;
      index > 4 ? review = reviews[0]
      : index < 0 ? review = reviews[4]
      : review = reviews[index]
    }
    currentItem = review.id;
    document.querySelector("#person-img").src = review.img;
    document.querySelector("#author").textContent = review.name;
    document.querySelector("#job").textContent = review.job;
    document.querySelector("#info").textContent = review.text;
  };
};

function uniqueNum(num) {
  let newNUm = Math.floor(Math.random() * 5)
  if (num == newNUm)  {
    return uniqueNum(num);
  }
  else {
    return newNUm;
  }
};