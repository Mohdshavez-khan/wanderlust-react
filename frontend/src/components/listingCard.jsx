import { useState, useEffect } from "react";
import "./listingCard.css";
import { Link } from "react-router-dom";
import axios from "axios"


function ListingCard({ listing, onRemove }) {
    const [like, setLike] = useState(listing.isWishlisted);

    useEffect(() => {
        setLike(listing.isWishlisted)
    }, [listing.isWishlisted])


    const handleToggle = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`${import.meta.env.VITE_API_URL}/wishlist/${listing._id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
          
           setLike(res.data.wishlisted)
            if (!res.data.Wishlisted && onRemove) {
                onRemove(listing._id);
            }
        } catch (err) {
            console.log(err)
        }

    };


    const imageUrl = listing.image?.url?.startsWith("http") ? listing.image.url : `${import.meta.env.VITE_API_URL}/${listing.image.url.replace(/\\/g, "/")}`


    return (
        <Link to={`/listings/${listing._id}`} className="listing-link">
            <div className="card listingCard" >

                <img src={imageUrl || "http://images.unsplash.com/photo-1781367659962-f406f128717a"} className="card-img-top" alt={listing.title} />
                {like ? (<i className="fa-solid fa-heart wishlist-icon-solid" onClick={handleToggle}>
                </i>) : (<i className="fa-regular fa-heart wishlist-icon" onClick={handleToggle}></i>)}

                <div className="card-body">
                    <p className="card-text">{listing.title}</p>
                    <p className="card-text">  &#8377;{listing.price.toLocaleString('en-IN')}/night</p>
                </div>
            </div>
        </Link>
    )
}
export default ListingCard;
