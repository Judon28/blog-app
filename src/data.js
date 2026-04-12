import postImg1 from "./assets/post-img1.png";
import gridImg1 from "./assets/grid-img1.png";
import postImg from "./assets/post-img.png";
import img1 from "./assets/img1.png";
//import {Slug}  from "./utilities/createSlug.js";
import { createSlug } from "./utilities/createSlug.js";
import {trimContents} from "./utilities/trimContents.js";
import { trimTitle } from "./utilities/trimTitle.js"



const postsData = [
    {
        id: 1,
        img: {
            src: img1,
            alt: "Learn how easy it is to make dumplings at home"
        },
        title: "Learn how easy it is to make dumplings at home",
        //content: "Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. …",
        subtitle : "Mumblecore subway tile wayfarers gorpcore. Portland bruh beard, wayfarers hella mukbang shoreditch copper mug next level. Kogi palo santo knausgaard offal intelligentsia beard",
        fullContent : "Kogi prism sus, viral la croix dreamcatcher next level marfa organic offal cardigan crucifix. Mukbang poke coloring book neutral milk hotel tumeric. Authentic copper mug viral pok pok retro. La croix aesthetic VHS shaman etsy helvetica cray fam tbh brunch. Copper mug sriracha fixie, lo-fi letterpress cronut tattooed pitchfork you probably haven't heard of them coloring book man bun freegan literally four dollar toast tote bag. Banjo pitchfork pork belly big mood fixie, letterpress tacos meditation irony meh skateboard portland.",
        Excerpt : "Mumblecore subway tile wayfarers gorpcore.",
        //slug : Slug("Learn how easy it is to make dumplings at home", 1),
        author : "By storied themes",
        "blog title" : "These simple style tips will leave a lasting impression",
        "meta keywords" : ["fashion", "travel", "beauty"],
        "meta description" : "this is an article about fashion",
        status : "Published",
        visibility : "public",
        date : "12th oct 2025",
        category : "lifestyle",
        tags : ["fashion", "beauty"]

    },

    {
        id: 2,
        img: {
            src: gridImg1,
            alt: "Tips for creating a routine that supports deep focused work"
        },
        title: "Tips for creating a routine that supports deep focused work",
        //content: "Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. …",
        subtitle : "Fire and Ash",
        fullContent : "Kogi prism sus, viral la croix dreamcatcher next level marfa organic offal cardigan crucifix. Mukbang poke coloring book neutral milk hotel tumeric. Authentic copper mug viral pok pok retro. La croix aesthetic VHS shaman etsy helvetica cray fam tbh brunch. Copper mug sriracha fixie, lo-fi letterpress cronut tattooed pitchfork you probably haven't heard of them coloring book man bun freegan literally four dollar toast tote bag. Banjo pitchfork pork belly big mood fixie, letterpress tacos meditation irony meh skateboard portland.",
        Excerpt : "Mumblecore subway tile wayfarers gorpcore.",
        //slug : Slug("Learn how easy it is to make dumplings at home", 1),
        author : "By storied themes",
        "blog title" : "These simple style tips will leave a lasting impression",
        "meta keywords" : ["fashion", "travel", "beauty"],
        "meta description" : "this is an article about fashion",
        status : "Draft",
        visibility : "public",
        date : "12th nov 2025",
        category : "lifestyle",
        tags : ["fashion", "beauty"]
        
    },

    {
        id: 3,
        img: {
            src: postImg,
            alt: "These simple style tips will leave a lasting impression"
        },
        title: "These simple style tips will leave a lasting impression",
        //content: "Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. …",
        subtitle : "Fire and Ash",
        fullContent : "Kogi prism sus, viral la croix dreamcatcher next level marfa organic offal cardigan crucifix. Mukbang poke coloring book neutral milk hotel tumeric. Authentic copper mug viral pok pok retro. La croix aesthetic VHS shaman etsy helvetica cray fam tbh brunch. Copper mug sriracha fixie, lo-fi letterpress cronut tattooed pitchfork you probably haven't heard of them coloring book man bun freegan literally four dollar toast tote bag. Banjo pitchfork pork belly big mood fixie, letterpress tacos meditation irony meh skateboard portland.",
        Excerpt : "Mumblecore subway tile wayfarers gorpcore.",
        //slug : Slug("Learn how easy it is to make dumplings at home", 1),
        author : "By storied themes",
        "blog title" : "These simple style tips will leave a lasting impression",
        "meta keywords" : ["fashion", "travel", "beauty"],
        "meta description" : "this is an article about fashion",
        status : "Draft",
        visibility : "public",
        date : "12th nov 2025",
        category : "lifestyle",
        tags : ["fashion", "beauty"]
    },

    {
        id: 4,
        img: {
            src: postImg1,
            alt: "The most breathtaking scenic hikes you need to experience"
        },
        title: "The most breathtaking scenic hikes you need to experience",
        author: "By storied themes",
        date: "sept 28, 2025",
        //content: "Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. …",
        subtitle : "Fire and Ash",
        fullContent : "Kogi prism sus, viral la croix dreamcatcher next level marfa organic offal cardigan crucifix. Mukbang poke coloring book neutral milk hotel tumeric. Authentic copper mug viral pok pok retro. La croix aesthetic VHS shaman etsy helvetica cray fam tbh brunch. Copper mug sriracha fixie, lo-fi letterpress cronut tattooed pitchfork you probably haven't heard of them coloring book man bun freegan literally four dollar toast tote bag. Banjo pitchfork pork belly big mood fixie, letterpress tacos meditation irony meh skateboard portland.",
        Excerpt : "Mumblecore subway tile wayfarers gorpcore.",
        //slug : Slug("Learn how easy it is to make dumplings at home", 1),
        author : "admin",
        "blog title" : "These simple style tips will leave a lasting impression",
        "meta keywords" : ["fashion", "travel", "beauty"],
        "meta description" : "this is an article about fashion",
        status : "Published",
        visibility : "public",
        date : "12th nov 2025",
        category : "lifestyle",
        tags : ["fashion", "beauty"]

    },

    {
        id: 5,
        img: {
            src: postImg1,
            alt: "Learn how easy it is to make dumplings at home"
        },
        title: "Learn how easy it is to make dumplings at home",
        fullContent: "Kogi prism sus, viral la croix dreamcatcher next level marfa organic offal cardigan crucifix. Mukbang poke coloring book neutral milk hotel tumeric. Authentic copper mug viral pok pok retro. La croix aesthetic VHS shaman etsy helvetica cray fam tbh brunch. Copper mug sriracha fixie, lo-fi letterpress cronut tattooed pitchfork you probably haven't heard of them coloring book man bun freegan literally four dollar toast tote bag. Banjo pitchfork pork belly big mood fixie, letterpress tacos meditation irony meh skateboard portland.",
        //content: "Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. …",
        subtitle : "Fire and Ash",
        "main content" : "Kogi prism sus, viral la croix dreamcatcher next level marfa organic offal cardigan crucifix. Mukbang poke coloring book neutral milk hotel tumeric. Authentic copper mug viral pok pok retro. La croix aesthetic VHS shaman etsy helvetica cray fam tbh brunch. Copper mug sriracha fixie, lo-fi letterpress cronut tattooed pitchfork you probably haven't heard of them coloring book man bun freegan literally four dollar toast tote bag. Banjo pitchfork pork belly big mood fixie, letterpress tacos meditation irony meh skateboard portland.",
        Excerpt : "Mumblecore subway tile wayfarers gorpcore.",
        //slug : Slug("Learn how easy it is to make dumplings at home", 1),
        author : "admin",
        "blog title" : "These simple style tips will leave a lasting impression",
        "meta keywords" : ["fashion", "travel", "beauty"],
        "meta description" : "this is an article about fashion",
        status : "Published",
        visibility : "public",
        date : "12th nov 2025",
        category : "lifestyle",
        tags : ["fashion", "beauty"]

    },

    {
        id: 6,
        img: {
            src: postImg1,
            alt: "Learn how easy it is to make dumplings at home"
        },
        title: "Learn how easy it is to make dumplings at home",
        author: "By storied themes",
        date: "sept 28, 2025",
        //content: "Lorem ipsum dosectetur adipisicing elit, sed do.Lorem ipsum dolor sit amet, consectetur Nulla fringilla purus at leo dignissim congue. Mauris elementum accumsan leo vel tempor. Sit amet cursus nisl aliquam. …",
        fullContent: "Kogi prism sus, viral la croix dreamcatcher next level marfa organic offal cardigan crucifix. Mukbang poke coloring book neutral milk hotel tumeric. Authentic copper mug viral pok pok retro. La croix aesthetic VHS shaman etsy helvetica cray fam tbh brunch. Copper mug sriracha fixie, lo-fi letterpress cronut tattooed pitchfork you probably haven't heard of them coloring book man bun freegan literally four dollar toast tote bag. Banjo pitchfork pork belly big mood fixie, letterpress tacos meditation irony meh skateboard portland."

    }
]

export const posts = postsData.map((post) => ({
  ...post,
  slug: createSlug(post.title, post.id),
  content: trimContents(post.fullContent),
  shortTitle: trimTitle(post.title),
}));

/*export const trimmedContents = postsData.map((post) => ({
    ...post,
    content: {Trimmed}
}))


const me = postsData[4].title
console.log (me.length)*/