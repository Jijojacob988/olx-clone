import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {useHistory} from 'react-router-dom'
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history= useHistory()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }
    
    const storageRef = firebase.storage().ref(`/images/${image.name}`);
    const uploadTask = storageRef.put(image);
    
    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload error:', error);
      },
      () => {
        // Handle successful uploads on complete
        storageRef.getDownloadURL().then((url) => {
          console.log('File available at', url);
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid, 
            createdAt:date.toDateString()
          })
          history.push('/')
        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              name="Price"
            />
            <br />
            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
            <br />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
            <br />
            <button type="submit" className="uploadBtn">Upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
