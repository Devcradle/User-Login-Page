import { useState } from 'react';
import { createUser } from '../../utils/Api';
import './CreateUser.scss';

const CreateUser = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append('image', image);

      await createUser('', formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-createUser-cnt">
      <div className="user-createUserSub-cnt">
        <span className="user-main-cnt">Create User</span>
        <div className="user-maindiv-cnt">
          <form
            className="user-form-cnt"
            onSubmit={handleSubmit}
            name="createUser"
          >
            <div className="user-div1-cnt">
              <label htmlFor="nameUser">Enter your name:</label>
              <input
                type="text"
                id="nameUser"
                name="name"
                className="user-input1-cnt"
                placeholder="name"
              />
            </div>
            <div className="user-div2-cnt">
              <label htmlFor="deptUser">Enter your department:</label>
              <input
                type="text"
                id="deptUser"
                name="department"
                className="user-input2-cnt"
                placeholder="department"
              />
            </div>
            <div className="user-div6-cnt">
              <label htmlFor="desgnUser">Enter your designation:</label>
              <input
                type="text"
                id="desgnUser"
                name="designation"
                className="user-input3-cnt"
                placeholder="designation"
              />
            </div>
            <div className="user-div4-cnt">
              <label htmlFor="imageUser">Upload your image:</label>
              <div className="user-div5-cnt">
                <label className="user-label-cnt" htmlFor="imageUser">
                  Choose Image
                  <input
                    type="file"
                    id="imageUser"
                    className="sr-only"
                    accept=".jpg, .jpeg, .png, .jfif"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <button className="user-button-cnt" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
