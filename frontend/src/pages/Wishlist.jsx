import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import ListingCard from "../components/listingCard";
import { useLoading } from "../context/LoadingContext";
import "./Wishlist.css";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist();
    }, []);

    // Fetch wishlist from API
    const fetchWishlist = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/wishlist");
            setWishlist(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Remove item from wishlist
    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
    };

    // Handle navigation to home page
    const handleBrowseListings = () => {
        navigate("/");
    };

    // Empty State Component - Show when wishlist is empty
    if (wishlist.length === 0) {
        return (
            <div className="wishlist-container empty-wishlist">
                {/* Empty State Content */}
                <div className="empty-state-wrapper">
                    {/* Heart Icon */}
                    <div className="heart-icon-container">
                        <FontAwesomeIcon
                            icon={faHeartBroken}
                            className="heart-icon"
                        />
                    </div>

                    {/* Heading */}
                    <h1 className="empty-state-heading">Your Wishlist is Empty</h1>

                    {/* Subheading */}
                    <p className="empty-state-subheading">
                        Save your favorite stays and plan your next adventure
                    </p>

                    {/* Browse Listings Button */}
                    <button
                        className="browse-btn"
                        onClick={handleBrowseListings}
                        aria-label="Browse listings"
                    >
                        Browse Listings
                    </button>
                </div>
            </div>
        );
    }

    // Wishlist with items - Display existing wishlist cards
    return (
        <div className="wishlist-container">
            <div className="wishlist-content">
                <h1 className="wishlist-title">My Wishlist</h1>
                <div className="row">
                    {wishlist.map((listing) => (
                        <div
                            key={listing._id}
                            className="col-lg-3 col-md-4 col-sm-6 mb-4"
                        >
                            <ListingCard
                                listing={listing}
                                onRemove={removeFromWishlist}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;