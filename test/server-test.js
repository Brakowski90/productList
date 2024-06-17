// frontend/test/server-test.js

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../server');
// const { Product } = require('../models/product');
// const { Review } = require('../models/review');

// const should = chai.should();
// chai.use(chaiHttp);

// describe('Product API', () => {
//   // Before each test, clear the database
//   beforeEach(async () => {
//     await Product.deleteMany({});
//     await Review.deleteMany({});
//   });

//   // Test the /GET products route
//   describe('/GET products', () => {
//     it('it should GET all the products', (done) => {
//       chai.request(app)
//         .get('/products')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.products.should.be.a('array');
//           res.body.products.length.should.be.eql(0);
//           done();
//         });
//     });
//   });

//   // Test the /POST products route
//   describe('/POST products', () => {
//     it('it should not POST a product without required fields', (done) => {
//       let product = {};
//       chai.request(app)
//         .post('/products')
//         .send(product)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('All fields are required');
//           done();
//         });
//     });

//     it('it should POST a product', (done) => {
//       let product = {
//         category: 'Electronics',
//         name: 'Test Product',
//         price: 99.99,
//         image: 'https://via.placeholder.com/250?text=Product+Image'
//       };
//       chai.request(app)
//         .post('/products')
//         .send(product)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           res.body.should.have.property('category');
//           res.body.should.have.property('name');
//           res.body.should.have.property('price');
//           res.body.should.have.property('image');
//           done();
//         });
//     });
//   });

//   // Test the /GET/:id products route
//   describe('/GET/:id product', () => {
//     it('it should GET a product by the given id', (done) => {
//       let product = new Product({
//         category: 'Electronics',
//         name: 'Test Product',
//         price: 99.99,
//         image: 'https://via.placeholder.com/250?text=Product+Image'
//       });
//       product.save((err, product) => {
//         chai.request(app)
//           .get('/products/' + product.id)
//           .send(product)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('category');
//             res.body.should.have.property('name');
//             res.body.should.have.property('price');
//             res.body.should.have.property('image');
//             res.body.should.have.property('_id').eql(product.id);
//             done();
//           });
//       });
//     });
//   });

//   // Test the /DELETE/:id products route
//   describe('/DELETE/:id product', () => {
//     it('it should DELETE a product given the id', (done) => {
//       let product = new Product({
//         category: 'Electronics',
//         name: 'Test Product',
//         price: 99.99,
//         image: 'https://via.placeholder.com/250?text=Product+Image'
//       });
//       product.save((err, product) => {
//         chai.request(app)
//           .delete('/products/' + product.id)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message').eql('Product and associated reviews deleted successfully');
//             done();
//           });
//       });
//     });
//   });

//   // Test the /POST/:id/reviews route
//   describe('/POST/:id/reviews', () => {
//     it('it should not POST a review without required fields', (done) => {
//       let product = new Product({
//         category: 'Electronics',
//         name: 'Test Product',
//         price: 99.99,
//         image: 'https://via.placeholder.com/250?text=Product+Image'
//       });
//       product.save((err, product) => {
//         let review = {};
//         chai.request(app)
//           .post('/products/' + product.id + '/reviews')
//           .send(review)
//           .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message').eql('All fields are required');
//             done();
//           });
//       });
//     });

//     it('it should POST a review', (done) => {
//       let product = new Product({
//         category: 'Electronics',
//         name: 'Test Product',
//         price: 99.99,
//         image: 'https://via.placeholder.com/250?text=Product+Image'
//       });
//       product.save((err, product) => {
//         let review = {
//           userName: 'Test User',
//           text: 'Great product!'
//         };
//         chai.request(app)
//           .post('/products/' + product.id + '/reviews')
//           .send(review)
//           .end((err, res) => {
//             res.should.have.status(201);
//             res.body.should.be.a('object');
//             res.body.should.have.property('userName');
//             res.body.should.have.property('text');
//             done();
//           });
//       });
//     });
//   });
// });
