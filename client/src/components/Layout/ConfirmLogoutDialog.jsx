import React from 'react';

const ConfirmLogoutDialog = ({ onConfirm, onCancel }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#f9f9f9',
      padding: '30px',
      border: '2px solid #ccc',
      borderRadius: '10px',
      zIndex: 1000,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      maxWidth: '400px',
      width: '100%',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Confirm Logout</h3>
      <p style={{ marginBottom: '30px', color: '#555' }}>Are you sure you want to logout?</p>
      <div>
        <button onClick={onConfirm} style={{
          backgroundColor: '#d9534f',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginRight: '10px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c9302c'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#d9534f'}
        >Yes</button>
        <button onClick={onCancel} style={{
          backgroundColor: '#5bc0de',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#31b0d5'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#5bc0de'}
        >No</button>
      </div>
    </div>
  );
};

export default ConfirmLogoutDialog;
