import { useState, useEffect, useContext } from "react";
import "../styles/message.css";
import { useAxios } from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";

function MessageDetails(props) {

    const api = "http://127.0.0.1:8000/api"

    const [allMessages, setAllMessages] = useState([])
    const [recentMessages, setRecentMessages] = useState([])

    const [newMessage, setNewMessage] = useState("")
    const [search, setSearch] = useState("");

    const axios = useAxios();

    const token = localStorage.getItem("tokens");
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;

    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const nav = useNavigate()

    useEffect(() => {
        async function getMessages() {
          try {
            const res = await axios.get(`${api}/my-messages/${user_id}/`);
            console.log(res.data);
            setRecentMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        }
        if(!user) nav("/")
        getMessages();
      }, [id]);

    useEffect(()=>{
        const getMessages = async () => {
            try{
                const res = await axios.get(`${api}/get-messages/${user_id}/${id}/`)
                setAllMessages(res.data)

            } catch(err){
                console.log(err)
            }
        }
        getMessages()
        let interval = setInterval(getMessages, 1000)
        return () => clearInterval(interval)
    }, [id])

    const sendMessage = async () => {
        const form = new FormData()
        form.append("user", user_id)
        form.append("sender", user_id)
        form.append("receiver", id)
        form.append("message", newMessage)

        try {
            const res = await axios.post(`${api}/send-messages/`, form)
            console.log(res)
            setNewMessage("")

        } catch(err){
            console.log(err)
        }
    }

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
                {recentMessages.map((message) => (
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
                <hr className="d-block d-lg-none mt-1 mb-0" />
              </div>

              <div className="col-12 col-lg-7 col-xl-9">
                <div className="position-relative">
                  <div className="chat-messages p-4">

                    {allMessages.map(message => (
                        <div key={Math.random() * Math.random()}>

                            {message.sender.id === user_id ?
                            <div className="chat-message-right pb-4">
                                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div className="font-weight-bold mb-1">You</div>
                                    {message.message}
                                </div>
                            </div>
                            :
                            <div className="chat-message-left pb-4">
                                <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">

                                    <div className="font-weight-bold mb-1">
                                    {message.sender_profile.full_name}
                                    </div>

                                    {message.message}
                                </div>
                            </div>
                            }

                        </div>
                    ))}

                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                      onChange={(e)=>setNewMessage(e.target.value)}
                    />
                    <button onClick={sendMessage} className="btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default MessageDetails;