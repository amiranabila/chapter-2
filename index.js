const { defaultMaxListeners } = require('events')
const express = require ('express')
const req = require("express/lib/request");
const res = require("express/lib/response");
const path = require('path')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const {QueryTypes} = require('sequelize');
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(config.development)


app.set("view engine", "hbs")
app.set("views", path.join(__dirname,'src/views'))
app.use(express.static('src/asset')) 
app.use(express.urlencoded({ extended: false }));

app.get('/', home )
app.get('/contact', contact)
app.post('/add-myproject', addmyproject)
app.get('/add-myproject', addmyprojectView)
app.post('/delete-myproject/:id', deleteProject)

app.get('/update-project/:id', updateProjectview)
app.post('/update-project', updateProject)

app.get('/detail-project/:id', detailproject)
// app.get('/detail', detail)


const data=[]
async function home(req, res) {
  const query = 'SELECT * FROM projects'
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
  console.log ("ini database", obj)
    res.render('index',{data:obj})
}
function contact (req, res) {
    res.render('contact-me')
}
function addmyprojectView (req, res) {
  
    res.render('add-myproject', {data})
}
async function addmyproject(req, res) {

    const { name, startDate, endDate, description } = req.body;
    const image = "dumbways.png"
  
    // console.log("Nama Project :", name);
    // console.log("Tanggal Mulai : ", startDate);
    // console.log("Tanggal Selesai : ", endDate);
    // console.log("Deskripsi : ", description);
  
    // const dataProject = { name, startDate, endDate, description };
  
    // data.unshift(dataProject);
    const query = `INSERT INTO projects (name, start_date, end_date, image, description) VALUES ('${name}', '${startDate}', '${endDate}', '${image}', '${description}')`
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })

    console.log("data berhasil di insert", obj)
    res.redirect("/");
  }
  
 async function deleteProject(req, res) {
    const { id } = req.params;
    const query = `DELETE FROM projects WHERE id=${id} `
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })
    console.log("data berhasil di hapus", obj)

    // data.splice(id, 1);
  
    res.redirect("/");
  }
  
  async function updateProjectview(req, res) {
    const { id } = req.params
    // const dataFilter = data[parseInt(id)]
    // dataFilter.id = parseInt(id)
    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, {type:QueryTypes.SELECT})
    
    res.render("update-project", { data: obj[0] })
  }
  
  async function updateProject(req, res) {
    const { id, name, startDate, endDate, description } = req.body;
  
    
    // data[parseInt(id)] = {
    //   name,
    //   startDate,
    //   endDate,
    //   description,
    // };
    const query = `UPDATE projects SET name='${name}', start_date='${startDate}', end_date='${endDate}', description='${description}' WHERE id=${id}`
    const obj = await sequelize.query(query, {type:QueryTypes.UPDATE})
    console.log("blog berhasil diupdate", obj)
  
    res.redirect("/");
  }
  
 async function detailproject(req, res) {
    const { id } = req.params;
    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, {type:QueryTypes.SELECT})
    res.render('detail-project', { data: obj[0] })
    // const dataFilter = data[parseInt(id)];
    // dataFilter.id = parseInt(id);
    // res.render("detail-project", { data: dataFilter });
  }
// function detail (req, res) {
//     res.render('detail')
// }
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
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Lakukan penanganan kesalahan sesuai kebutuhan Anda
});
