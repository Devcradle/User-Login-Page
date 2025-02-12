import { useLocation, useNavigate } from 'react-router-dom';
import icon from '../../image.png';
import { useEffect, useState } from 'react';
import { editUser } from '../../utils/Api';
import './EditUser.scss';
import { useDispatch } from 'react-redux';
import { updateUserlist } from '../../utils/Store/UserSlice';

const EditUser = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [dept, setDept] = useState('');
  const [designation, setDesignation] = useState('');
  const location = useLocation();
  const data = location?.state;
  const id = data?._id;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await editUser('', {
        name,
        department: dept,
        designation,
        id
      });
      dispatch(updateUserlist(data?.data?.data));
      navigate('/home/table');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleData = () => {
      setName(data?.name);
      setDept(data?.department);
      setDesignation(data?.designation);
    };
    handleData();
  }, [data]);

  return (
    <>
      <div className="editUser-maindiv-cnt">
        <form onSubmit={(e) => handleSubmit(e)} name="editUser">
          <div className="editUser-subdiv-cnt">
            <div className="editUser-div1-cnt ">
              <span className="editUser-span1-cnt">Edit User</span>
              <hr className="editUser-hr-cnt" />
            </div>
            <div className="editUser-div2-cnt">
              <div className="editUser-imgdiv-cnt">
                <img
                  src={data.image.path}
                  alt="icon"
                  onError={(e) => (e.target.src = icon)}
                  className="editUser-img-cnt"
                />
              </div>
              <div className="editUser-div3-cnt">
                <div className="editUser-div4-cnt">
                  <div className="editUser-div5-cnt">
                    <label>Your Name</label>
                    <input
                      type="text"
                      className="editUser-input1-cnt"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="editUser-div6-cnt">
                    <label>Your department</label>
                    <input
                      type="text"
                      className="editUser-input2-cnt"
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                    />
                  </div>
                  <div className="editUser-div7-cnt">
                    <label>Your Profession</label>
                    <input
                      type="text"
                      className="editUser-input3-cnt"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </div>
                </div>
                <button className="editUser-button-cnt">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
