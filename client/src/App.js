// here we are importing our react with components, our axios package and our requirements from react like modal footer and buttons
import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
// we are creating our components with a state that is having books and new book data as object and using title and rating as our key values
class App extends Component {
  state = {
    books: [],
    newBookData: {
      title: '',
      rating: ''
    },
    editBookData: {
      id: '',
      title: '',
      rating: ''
    },
    newBookModal: false,
    editBookModal: false
  }
  // this function will render our books
  componentWillMount() {
    // this is ensuring that the books are updated
    this._refreshBooks();
  }
  // this function is toggling a modal
  toggleNewBookModal() {
    // this is ensuring that books is not rendered twice and isntead set to new book modal
    this.setState({
      newBookModal: ! this.state.newBookModal
    });
  }
  // this is rendering our edit book modal
  toggleEditBookModal() {
    this.setState({
      // this is ensuring the original book state is not rendered and instead rendering edit book modal
      editBookModal: ! this.state.editBookModal
    });
  }
  // this is a function to add a book
  addBook() {
    // through a post method we are going to link our local host and our new book that is given to us by the user
    axios.post('http://localhost:3000/books', this.state.newBookData).then((response) => {
      let { books } = this.state;
// via the arrow function we are making a variable of books and setting it to our state and pushing it
      books.push(response.data);

      this.setState({ books, newBookModal: false, newBookData: {
        title: '',
        rating: ''
      }});
    });
  }
  updateBook() {
    let { title, rating } = this.state.editBookData;

    axios.put('http://localhost:3306/books/' + this.state.editBookData.id, {
      title, rating
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { id: '', title: '', rating: '' }
      })
    });
  }
  editBook(id, title, rating) {
    this.setState({
      editBookData: { id, title, rating }, editBookModal: ! this.state.editBookModal
    });
  }
  deleteBook(id) {
    axios.delete('http://localhost:3000/books/' + id).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:3000/books').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
//  this render function ensures that are book is documented with the help of .map to render it into an
  render() {
    let books = this.state.books.map((book) => {
      return (
        // we are returning a table with a <tr> tag
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            {/* our bind method creates a bounded function out of a regular function */}
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.title, book.rating)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      // here we are returning our div with our modals
      <div className="App container">

      <h1>Books App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>

      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
              let { newBookData } = this.state;
// here we are targeting our event with e.target and whatever the value we are given us
              newBookData.title = e.target.value;

              this.setState({ newBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input id="rating" value={this.state.newBookData.rating} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.rating = e.target.value;

              this.setState({ newBookData });
            }} />
          </FormGroup>
{/* here we are setting up our buttons in our modal footer */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
{/* this is our modal for our edit book and we are declaring it open and referencing the state of edit book modal */}
      <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        {/* we are decalring the header of the modal here */}
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
        <ModalBody>
          {/* we are inserting a form group inside of our body and saying via a targeting event change, set editbookData to a variable make it equal to our state */}
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.title = e.target.value;
// we are ensuring our new data is rendered with this.setState here
              this.setState({ editBookData });
             }} />
          </FormGroup>
          <FormGroup>
            {/* we are doing the same for our rating, setting our input id, putting a value of our state of the book with our rating with targeted event */}
            <Label for="rating">Rating</Label>
            <Input id="rating" value={this.state.editBookData.rating} onChange={(e) => {
              let { editBookData } = this.state;
// here we are setting our rating to put inside of editBookData and putting it equal to e.target.value
              editBookData.rating = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
{/* here we have our modal body for updating our book and setting a color, creating a new function with .bind */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter> 
      </Modal>

{/* we are creating our table here */}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books}
          </tbody>
        </Table>
      </div>
    );
  }
}
// here we make our app accessible to other files
export default App;
