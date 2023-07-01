import { useState } from "react";
import "./newProduct.css";

const NewProduct = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState();
  const [trail, setTrail] = useState();
  const [vid, setVid] = useState();

  var openFile = function (file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById("output");
      output.src = dataURL;
      setImage(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e) => openFile(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Image Small </label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Title" />
        </div>
        <div className="addProductItem">
          <label>Image Title</label>
          <input type="text" placeholder="Image Title" />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="enter desc" />
        </div>
        <div className="addProductItem">
          <label>Trailer </label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Video </label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>IsSeries</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="2023" />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="number" placeholder="20" />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Action" />
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
};

export default NewProduct;
