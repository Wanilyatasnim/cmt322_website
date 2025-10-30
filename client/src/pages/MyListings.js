import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersAPI, listingsAPI } from '../services/api';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await usersAPI.getMyListings();
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching my listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingsAPI.delete(id);
        setListings(listings.filter(listing => listing.id !== id));
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Error deleting listing. Please try again.');
      }
    }
  };

  const handleMarkAsSold = async (id) => {
    if (window.confirm('Mark this listing as sold?')) {
      try {
        await listingsAPI.markAsSold(id);
        setListings(listings.map(listing =>
          listing.id === id ? { ...listing, status: 'sold' } : listing
        ));
      } catch (error) {
        console.error('Error marking as sold:', error);
        alert('Error updating listing. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="page-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex-between">
          <h1>My Listings</h1>
          <Link to="/create-listing" className="btn btn-primary">
            + Create New Listing
          </Link>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="empty-listing-message">
          <p>You haven't created any listings yet.</p>
          <Link to="/create-listing" className="btn btn-primary mt-20">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: '20px' }}>
            You have {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
          </p>
          <div className="grid">
            {listings.map(listing => (
              <div key={listing.id} className="product-card" style={{ position: 'relative' }}>
                {listing.status === 'sold' && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#2e7d32',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    zIndex: 1
                  }}>
                    <FaCheckCircle /> SOLD
                  </div>
                )}
                <ProductCard listing={listing} />
                <div style={{ padding: '15px', paddingTop: '0' }}>
                  <div className="flex gap-10">
                    <Link
                      to={`/edit-listing/${listing.id}`}
                      className="btn btn-secondary"
                      style={{ flex: 1, textAlign: 'center', fontSize: '14px' }}
                    >
                      <FaEdit /> Edit
                    </Link>
                    {listing.status === 'active' && (
                      <button
                        onClick={() => handleMarkAsSold(listing.id)}
                        className="btn btn-success"
                        style={{ flex: 1, fontSize: '14px' }}
                      >
                        <FaCheckCircle /> Mark Sold
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="btn btn-danger"
                      style={{ fontSize: '14px' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;

