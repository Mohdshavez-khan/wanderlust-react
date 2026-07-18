import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css"

export default function SearchBar({mobile , closeSearch}) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/?q=${search}`)
        } else {
            navigate("/")
        }
        setSearch("")

        if(mobile) {
            closeSearch()
        }
    }

    return (
        <div className={ mobile ? "mobile-search" : "SearchBar"}>
            {
                mobile && <button type="button" className="btn btn-close mb-3" onClick={closeSearch}></button>
            }
            <form onSubmit={handleSearch} className="form-seacrhBar">
                <input type="text" placeholder="Search destination"
                    className="form-control me-2 search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="Search-btn"><i className="fa-solid fa-magnifying-glass"></i>Search</button>
            </form>
        </div>
    )
}