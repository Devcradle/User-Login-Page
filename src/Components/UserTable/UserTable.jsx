import { useNavigate } from 'react-router-dom';
import icon from './../../image.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserTable.scss';
import { getAllUsers } from '../../utils/Api';
import { getUserlist } from '../../utils/Store/UserSlice';

const UserTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = useSelector((store) => store.user.userList) || [];
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!userData.length) {
        const response = await getAllUsers('all');
        const fetchedData = response?.data?.data;
        dispatch(getUserlist(fetchedData));
        setUserData(fetchedData);
      }
    };
    setUserData(getData);
    fetchData();
  }, [userData.length, dispatch]);

  return (
    <>
      <div className="userTable-maindiv-cnt">
        <div className="userTable-subdiv-cnt">
          <button
            className="userTable-button1-cnt"
            onClick={() => navigate('/home/create')}
          >
            Add User
          </button>
        </div>
        <div className="userTable-div1-cnt">
          <table className="userTable-table-cnt">
            <thead className="userTable-thead-cnt">
              <tr className="userTable-tr1-cnt">
                <th className=" userTable-th1-cnt">Image</th>
                <th className=" userTable-th1-cnt">Name</th>
                <th className=" userTable-th1-cnt">Profession</th>
                <th className=" userTable-th1-cnt">Department</th>
                <th className=" userTable-th1-cnt">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item) => (
                <tr key={item._id} className="userTable-tr2-cnt">
                  <td className="userTable-td1-cnt ">
                    <img
                      src={item.image.path}
                      alt="icon"
                      className="userTable-img1-cnt"
                      onError={(e) => {
                        e.target.src = icon;
                      }}
                    />
                  </td>
                  <td className=" userTable-td2-cnt  ">{item.name}</td>
                  <td className=" userTable-td2-cnt  ">{item.designation}</td>
                  <td className=" userTable-td2-cnt  ">{item.department}</td>
                  <td
                    className=" userTable-td3-cnt "
                    onClick={() => navigate('/home/edit', { state: item })}
                  >
                    edit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!userData.length && (
            <div className="userTable-div2-cnt">
              Click on the AddUser Button for adding Users
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserTable;
