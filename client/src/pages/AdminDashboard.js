import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getListings();
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'stats') fetchStats();
    else if (activeTab === 'users') fetchUsers();
    else if (activeTab === 'listings') fetchListings();
  }, [activeTab]);

  const handleBanUser = async (userId, currentStatus) => {
    const action = currentStatus === 'banned' ? 'unban' : 'ban';
    const confirmMsg = action === 'ban' 
      ? 'Are you sure you want to ban this user?'
      : 'Are you sure you want to unban this user?';

    if (window.confirm(confirmMsg)) {
      try {
        if (action === 'ban') {
          await adminAPI.banUser(userId);
        } else {
          await adminAPI.unbanUser(userId);
        }
        setUsers(users.map(user =>
          user.id === userId
            ? { ...user, status: action === 'ban' ? 'banned' : 'active' }
            : user
        ));
      } catch (error) {
        console.error('Error banning user:', error);
        alert('Error updating user status');
      }
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await adminAPI.deleteListing(listingId);
        setListings(listings.filter(listing => listing.id !== listingId));
        alert('Listing deleted successfully');
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Error deleting listing');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="flex gap-10" style={{ marginBottom: '30px', borderBottom: '2px solid #eee' }}>
        <button
          className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button
          className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`btn ${activeTab === 'listings' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('listings')}
        >
          All Listings
        </button>
      </div>

      {activeTab === 'stats' && stats && (
        <div className="grid" style={{ marginTop: '20px' }}>
          <div className="card text-center">
            <h2 style={{ fontSize: '48px', marginBottom: '10px' }}>{stats.totalUsers}</h2>
            <p style={{ color: '#666' }}>Total Users</p>
          </div>
          <div className="card text-center">
            <h2 style={{ fontSize: '48px', marginBottom: '10px' }}>{stats.totalListings}</h2>
            <p style={{ color: '#666' }}>Total Listings</p>
          </div>
          <div className="card text-center">
            <h2 style={{ fontSize: '48px', marginBottom: '10px', color: '#2e7d32' }}>
              {stats.activeListings}
            </h2>
            <p style={{ color: '#666' }}>Active Listings</p>
          </div>
          <div className="card text-center">
            <h2 style={{ fontSize: '48px', marginBottom: '10px', color: '#d32f2f' }}>
              {stats.soldListings}
            </h2>
            <p style={{ color: '#666' }}>Sold Items</p>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="card">
              <h2>All Users ({users.length})</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Phone</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px' }}>{user.id}</td>
                        <td style={{ padding: '10px' }}>{user.name}</td>
                        <td style={{ padding: '10px' }}>{user.email}</td>
                        <td style={{ padding: '10px' }}>{user.phone || '-'}</td>
                        <td style={{ padding: '10px' }}>{user.role}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            background: user.status === 'active' ? '#e8f5e9' : '#ffebee',
                            color: user.status === 'active' ? '#2e7d32' : '#c62828'
                          }}>
                            {user.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <button
                            onClick={() => handleBanUser(user.id, user.status)}
                            className="btn btn-secondary"
                            style={{ fontSize: '12px', padding: '5px 10px' }}
                          >
                            <FaBan /> {user.status === 'banned' ? 'Unban' : 'Ban'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'listings' && (
        <>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="card">
              <h2>All Listings ({listings.length})</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>User ID</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map(listing => (
                      <tr key={listing.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px' }}>{listing.id}</td>
                        <td style={{ padding: '10px' }}>{listing.title}</td>
                        <td style={{ padding: '10px' }}>{listing.category}</td>
                        <td style={{ padding: '10px' }}>RM {parseFloat(listing.price).toFixed(2)}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            background: listing.status === 'active' ? '#e8f5e9' : '#ffebee',
                            color: listing.status === 'active' ? '#2e7d32' : '#c62828'
                          }}>
                            {listing.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px' }}>{listing.user_id}</td>
                        <td style={{ padding: '10px' }}>
                          <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="btn btn-danger"
                            style={{ fontSize: '12px', padding: '5px 10px' }}
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

