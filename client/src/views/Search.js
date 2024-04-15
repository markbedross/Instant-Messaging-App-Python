import {useState, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAxios } from "../utils/useAxios";

function Search() {

    const api = "http://127.0.0.1:8000/api"
    const {username} = useParams()
    const axios = useAxios()
    const nav = useNavigate()

    const [users, setUsers] = useState([])
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    useEffect(()=>{
        async function getUsers(){
            try {
                const res = await axios.get(`${api}/search/${username}/`)
                setUsers(res.data)
            } catch (error) {
                setError(error.response.data.detail)
            }
        }
        setError("")
        getUsers()
    }, [username])

  return (
    <div>
      <div>
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
                          onChange={(e)=>setSearch(e.target.value)}
                          name="username"
                        />
                <div className="ml-1 p-1" onClick={()=>nav(`/search/${search}`)} style={{cursor: 'pointer', borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgrey', borderStyle: 'solid'}}>Search</div>
                      </div>
                    </div>
                  </div>

                  {users.map((user) => (
                    <Link
                      to={"/inbox/" + user.id}
                      className="list-group-item list-group-item-action border-0"
                    >
                        <div className="flex-grow-1 ml-3">
                            {user.full_name}

                            <div className="small">
                            <div>
                                Send Message
                            </div>
                            </div>
                        </div>
                    </Link>
                  ))}
                  {error && <div className="ml-4 mb-2 p-2" style={{backgroundColor: 'pink', width: 150, textAlign: 'center', borderRadius: 5}}>
                    {error}
                  </div>}
                  <hr className="d-block d-lg-none mt-1 mb-0" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Search;
