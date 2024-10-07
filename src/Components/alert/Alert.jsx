import React from 'react'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

export default function Alert({ type, message }) {

    const getAlertStyle = () => {
        switch (type) {
            case 'success':
                return { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' };
            case 'error':
                return { backgroundColor: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' };
            case 'info':
            default:
                return { backgroundColor: '#e2e3e5', color: '#383d41', borderColor: '#d6d8db' };
        }
    };


    const getIcon = () => {
        switch (type) {
        case 'success':
            return <FaCheckCircle />;
        case 'error':
            return <FaExclamationCircle />;
        case 'info':
        default:
            return <FaInfoCircle />;
        }
    };
    return (
        <div style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            ...getAlertStyle()
          }}>
            <span style={{ marginRight: '10px' }}>{getIcon()}</span>
            {message}
          </div>
    )
}
