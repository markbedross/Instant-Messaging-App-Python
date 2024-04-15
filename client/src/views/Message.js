import { useState, useEffect, useContext } from "react";
import "../styles/message.css";
import { useAxios } from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "../context/Auth/AuthContext";

function Message(props) {
  const api = "http://127.0.0.1:8000/api";

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("")

  const axios = useAxios();

  const token = localStorage.getItem("tokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const {user} = useContext(AuthContext)
  const nav = useNavigate()

  useEffect(() => {
    async function getMessages() {
      try {
        const res = await axios.get(`${api}/my-messages/${user_id}/`);
        console.log(res.data);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if(!user) nav("/")
    getMessages();
  }, []);

  return (
    <main className="content" style={{ marginTop: "150px" }}>
    <div className="container p-0">
      <h1 className="h3 mb-3">Messages</h1>
      <div className="card">
        <div className="row g-0">
          <div className="col-12 col-lg-5 col-xl-3 border-right">
            <div className="px-4 ">
              <div className="d-flfex align-itemfs-center">
                <div className="flex-grow-1 d-flex align-items-center mt-2">
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Search..."
                    onChange={e=>setSearch(e.target.value)}
                  />
                <div className="ml-1 p-1" onClick={()=>nav(`/search/${search}`)} style={{cursor: 'pointer', borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgrey', borderStyle: 'solid'}}>Search</div>
                </div>
              </div>
            </div>
              {messages.map((message) => (
                <Link
                  key={message.id}
                  to={`/inbox/${message.sender.id === user_id ? message.receiver.id : message.sender.id}`}
                  className="list-group-item list-group-item-action border-0"
                >
                  <div className="d-flex align-items-start">
                    <div className="flex-grow-1 ml-3">
                        {message.sender.id === user_id ? 
                            message.receiver_profile.full_name
                          :
                          message.sender_profile.full_name}
                      <div className="small">
                        {message.message}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Message;
