const { defaultMaxListeners } = require('events')
const express = require ('express')
const path = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname,'views'))
app.use(express.static('asset'))

app.get('/',home )
app.get('/contact', contact)
app.get('/add-myproject', addmyproject)
app.get('/detail', detail)


  
function home(req, res) {
    res.render('index')
}
function contact (req, res) {
    res.render('contact-me')
}
function addmyproject (req, res) {
    res.render('add-myproject')
}
function detail (req, res) {
    res.render('detail')
}
// function testimonials(req, res){
//     res.json(
//         [
//             {
//                 author: "Zakiyyah",
//                 content: "Keren sekalihh",
//                 image: "img/dumbways.png",
//                 rating: 5
//             },
//             {
//                 author: "Nabila",
//                 content: "Keren ",
//                 image: "img/dumbways.png",
//                 rating: 4
//             },
//             {
//                 author: "Amira",
//                 content: "biasa aja",
//                 image: "img/dumbways.png",
//                 rating: 3
//             },
//             {
//                 author: "Jihan",
//                 content: "Kurang memuaskan",
//                 image: "img/dumbways.png",
//                 rating: 2
//             },
//             {
//                 author: "Zayd",
//                 content: "Apa sih ini",
//                 image: "img/dumbways.png",
//                 rating: 1
//             }
           
//         ]
//     )
// }
app.listen(port, () =>{
    console.log(`server berjalan diport ${port}`)
})